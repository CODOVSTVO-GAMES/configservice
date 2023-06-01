import { Injectable } from '@nestjs/common';
import { ResponseDTO } from './DTO/ResponseDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestDTO } from './DTO/RequestDTO';
import { ResponceConfigDTO } from './DTO/ResponceConfigDTO';
import { Level } from './models/Level';
import { ConfigDTO } from './DTO/ConfigDTO';
import { MainBuilding } from './models/MainBuilding';
import { CreateBuildings } from './models/CreateBuildings';
import { MergeBarracks } from './models/MergeBarracks';
import { MergeMining } from './models/MergeMining';
import { RepairBuilding } from './models/RepairBuilding';
import { Units } from './models/Units';
import { response } from 'express';


@Injectable()
export class AppService {

    constructor(
        @InjectRepository(Level) private levelRepo: Repository<Level>,
        @InjectRepository(MainBuilding) private mainBuildingRepo: Repository<MainBuilding>,
        @InjectRepository(CreateBuildings) private createBuildingsRepo: Repository<CreateBuildings>,
        @InjectRepository(MergeBarracks) private mergeBarracksRepo: Repository<MergeBarracks>,
        @InjectRepository(MergeMining) private mergeMiningRepo: Repository<MergeMining>,
        @InjectRepository(RepairBuilding) private repairBuildingsRepo: Repository<RepairBuilding>,
        @InjectRepository(Units) private unitsRepo: Repository<Units>,
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
        const arr = new Array<object>

        arr.push(await this.findLevelConfig())
        arr.push(await this.findMainBuildingsConfig())
        arr.push(await this.findCreateBuildingsConfig())
        arr.push(await this.findMergeBarracksConfig())
        arr.push(await this.findMergeMiningConfig())
        arr.push(await this.findRepairBuildingsConfig())
        arr.push(await this.findUnitsConfig())

        return new ResponceConfigDTO(arr)
    }

    //----------------------------------------------------------

    async findLevelConfig(): Promise<ConfigDTO> {
        const levels = await this.levelRepo.find(
            {
                select: {
                    id: false
                },
            }
        )
        const arr = []
        for (let l = 0; l < levels.length; l++) {
            arr.push({ l: levels[l].level, e: levels[l].experience })
        }
        return new ConfigDTO('levels', arr)
    }

    async findMainBuildingsConfig(): Promise<ConfigDTO> {
        const levels = await this.mainBuildingRepo.find(
            {
                select: {
                    id: false,
                },
            }
        )
        const arr = []
        for (let l = 0; l < levels.length; l++) {
            arr.push({ l: levels[l].level, e: levels[l].experience, p: levels[l].power, pu: levels[l].priceupdate, ru: levels[l].resourceupdate, ba: levels[l].bonusattack })
        }
        return new ConfigDTO('mainBuildings', arr)
    }

    async findCreateBuildingsConfig(): Promise<ConfigDTO> {
        const levels = await this.createBuildingsRepo.find(
            {
                select: {
                    id: false,
                },
            }
        )
        const arr = []
        for (let l = 0; l < levels.length; l++) {
            arr.push({ l: levels[l].level, e: levels[l].experience, p: levels[l].power, pu: levels[l].priceupdate, ru: levels[l].resourceupdate, pc: levels[l].pricecreate, es: levels[l].eperspawn })
        }
        return new ConfigDTO('createBuildings', arr)
    }

    async findMergeBarracksConfig(): Promise<ConfigDTO> {
        const levels = await this.mergeBarracksRepo.find(
            {
                select: {
                    id: false,
                },
            }
        )
        const arr = []
        for (let l = 0; l < levels.length; l++) {
            arr.push({ l: levels[l].level, e: levels[l].experience, p: levels[l].power, pu: levels[l].priceupdate, ru: levels[l].resourceupdate })
        }
        return new ConfigDTO('mergeBarracks', arr)
    }

    async findMergeMiningConfig(): Promise<ConfigDTO> {
        const levels = await this.mergeMiningRepo.find(
            {
                select: {
                    id: false,
                },
            }
        )
        const arr = []
        for (let l = 0; l < levels.length; l++) {
            arr.push({ l: levels[l].level, e: levels[l].experience, p: levels[l].power, pu: levels[l].priceupdate, ru: levels[l].resourceupdate })
        }
        return new ConfigDTO('mergeMining', arr)
    }

    async findRepairBuildingsConfig(): Promise<ConfigDTO> {
        const levels = await this.repairBuildingsRepo.find(
            {
                select: {
                    id: false,
                },
            }
        )
        const arr = []
        for (let l = 0; l < levels.length; l++) {
            arr.push({ l: levels[l].level, e: levels[l].experience, p: levels[l].power, pu: levels[l].priceupdate, ru: levels[l].resourceupdate })
        }
        return new ConfigDTO('repairBuildings', arr)
    }

    async findUnitsConfig(): Promise<ConfigDTO> {
        const levels = await this.unitsRepo.find(
            {
                select: {
                    id: false,
                },
            }
        )
        const arr = []
        for (let l = 0; l < levels.length; l++) {
            arr.push({ l: levels[l].level, e: levels[l].experience, p: levels[l].power, pu: levels[l].priceupdate, ru: levels[l].resourceupdate, h: levels[l].hp, d: levels[l].damage, ta: levels[l].typeattask, tc: levels[l].timecreate, pc: levels[l].pricecreate, es: levels[l].eperspawn })
        }
        return new ConfigDTO('units', arr)
    }

}


