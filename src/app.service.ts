import { Injectable } from '@nestjs/common';
import { ResponseDTO } from './DTO/ResponseDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { ConfigDTO } from './DTO/ConfigDTO';
import { ResponceConfigDTO } from './DTO/ResponceConfigDTO';
import { Level } from './models/Level';


@Injectable()
export class AppService {

    constructor(
        @InjectRepository(Level) private levelRepo: Repository<Level>,
    ) { }

    async configGetResponser(data: any) {
        const responseDTO = new ResponseDTO()
        let status = 200

        try {
            const r = await this.configGetHandler(data)
            responseDTO.data = r
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
            configDTO = new ConfigDTO(data.level)
        } catch (e) {
            throw "parsing data error"
        }

        return await this.configGetLogic(configDTO)
    }

    async configGetLogic(configDTO: ConfigDTO): Promise<ResponceConfigDTO> {
        console.log(configDTO.level)
        const levelConfig = await this.findStartLevelConfig(configDTO.level)
        return new ResponceConfigDTO([{ 'kek': 'lol' }, levelConfig])
    }

    //----------------------------------------------------------

    async findStartLevelConfig(level: number) {
        return await this.levelRepo.find(
            {
                where: {
                    level: Between(level - 10, level + 10)
                }
            }
        )
    }

}


