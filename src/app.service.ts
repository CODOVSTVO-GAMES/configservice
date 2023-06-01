import { Injectable } from '@nestjs/common';
import { ResponseDTO } from './DTO/ResponseDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { RequestDTO } from './DTO/RequestDTO';
import { ResponceConfigDTO } from './DTO/ResponceConfigDTO';
import { Level } from './models/Level';
import { ConfigDTO } from './DTO/ConfigDTO';


@Injectable()
export class AppService {

    constructor(
        @InjectRepository(Level) private levelRepo: Repository<Level>,
    ) { }

    async configGetResponser(data: any) {
        const responseDTO = new ResponseDTO()
        let status = 200

        try {
            const config = await this.configGetHandler(data)
            responseDTO.data = config
        }
        catch (e) {
            if (e == 'sessions not found' || e == 'session expired') {
                status = 403//перезапуск клиента
            }
            else if (e == 'too many requests') {
                status = 429//повторить запрос позже
            } else if (e == 'parsing data error') {
                status = 400 //сервер не знает что делать
            } else {
                status = 400
            }
            console.log("Ошибка " + e)
        }
        responseDTO.status = status

        return responseDTO
    }


    private async configGetHandler(data: any): Promise<ResponceConfigDTO> {
        let configDTO
        try {
            configDTO = new RequestDTO(data.level)
        } catch (e) {
            throw "parsing data error"
        }
        return await this.configGetLogic(configDTO)
    }

    async configGetLogic(reqestDTO: RequestDTO): Promise<ResponceConfigDTO> {
        const levelConfig = await this.findStartLevelConfig()
        return new ResponceConfigDTO([levelConfig])
    }

    //----------------------------------------------------------

    async findStartLevelConfig(): Promise<ConfigDTO> {
        const levels = await this.levelRepo.find(
            {
                select: {
                    experience: true,
                    level: true,
                    id: false
                },
            }
        )
        const arr = []
        for (let l = 0; l < levels.length; l++) {
            arr.push({ experience: levels[l].experience, level: levels[l].level })
        }
        return new ConfigDTO('levels', arr)
    }

}


