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
import { RadarExperience } from './models/RadarExperience';
import { MapEnemyTeams } from './models/MapEnemyTeams';
import { QuestReward } from './models/QuestReward';


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
        @InjectRepository(RadarExperience) private radarExperienceRepo: Repository<RadarExperience>,
        @InjectRepository(MapEnemyTeams) private mapEnemyTeamsRepo: Repository<MapEnemyTeams>,
        @InjectRepository(QuestReward) private questRewardRepo: Repository<QuestReward>
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
        return await this.configGetLogic()
    }

    async configGetLogic(): Promise<ResponceConfigDTO> {
        const arr = new Array<object>

        arr.push(await this.findLevelConfig())
        arr.push(await this.findMainBuildingsConfig())
        arr.push(await this.findCreateBuildingsConfig())
        arr.push(await this.findMergeBarracksConfig())
        arr.push(await this.findMergeMiningConfig())
        arr.push(await this.findRepairBuildingsConfig())
        arr.push(await this.findUnitsConfig())
        arr.push(await this.findRadarExperienceConfig())
        arr.push(await this.findMapEnemyTeams())

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
            arr.push({ l: levels[l].level, e: levels[l].experience, p: levels[l].power, pu: levels[l].priceupdate, ru: levels[l].resourceupdate, m: levels[l].mining })
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
            arr.push({
                l: levels[l].level, e: levels[l].experience, p: levels[l].power, pu: levels[l].priceupdate, ru: levels[l].resourceupdate,
                h: levels[l].hp, d: levels[l].damage, ta: levels[l].typeattask, tc: levels[l].timecreate, pc: levels[l].pricecreate, es: levels[l].eperspawn
            })
        }
        return new ConfigDTO('units', arr)
    }

    async findRadarExperienceConfig(): Promise<ConfigDTO> {
        const radarExp = await this.radarExperienceRepo.find(
            {
                select: {
                    id: false
                },
            }
        )
        const arr = []
        for (let l = 0; l < radarExp.length; l++) {
            arr.push({ l: radarExp[l].level, e: radarExp[l].experience })
        }
        return new ConfigDTO('radarExpirience', arr)
    }

    async findQuestGoldConfig(): Promise<ConfigDTO> {
        const questReward = await this.questRewardRepo.find(
            {
                select: {
                    id: false
                },
            }
        )
        const arr = []
        for (let l = 0; l < questReward.length; l++) {
            arr.push({ l: questReward[l].level, g: questReward[l].gold })
        }
        return new ConfigDTO('questReward', arr)
    }

    async findMapEnemyTeams(): Promise<ConfigDTO> {
        const enemyTeams = await this.mapEnemyTeamsRepo.find(
            {
                select: {
                    id: false
                },
            }
        )
        const arr = []
        for (let l = 0; l < enemyTeams.length; l++) {

            if (this.isNullOrUndefind(enemyTeams[l].territoryNumber)) continue
            arr.push({
                n: enemyTeams[l].territoryNumber,

                l1: enemyTeams[l].level1, n1: enemyTeams[l].num1,
                l2: enemyTeams[l].level2, n2: enemyTeams[l].num2,
                l3: enemyTeams[l].level3, n3: enemyTeams[l].num3,
                l4: enemyTeams[l].level4, n4: enemyTeams[l].num4,
                l5: enemyTeams[l].level5, n5: enemyTeams[l].num5,
                l6: enemyTeams[l].level6, n6: enemyTeams[l].num6,
                l7: enemyTeams[l].level7, n7: enemyTeams[l].num7,
                l8: enemyTeams[l].level8, n8: enemyTeams[l].num8,
                l9: enemyTeams[l].level9, n9: enemyTeams[l].num9,
                l10: enemyTeams[l].level10, n10: enemyTeams[l].num10,

                l11: enemyTeams[l].level11, n11: enemyTeams[l].num11,
                l12: enemyTeams[l].level12, n12: enemyTeams[l].num12,
                l13: enemyTeams[l].level13, n13: enemyTeams[l].num13,
                l14: enemyTeams[l].level14, n14: enemyTeams[l].num14,
                l15: enemyTeams[l].level15, n15: enemyTeams[l].num15,
                l16: enemyTeams[l].level16, n16: enemyTeams[l].num16,
                l17: enemyTeams[l].level17, n17: enemyTeams[l].num17,
                l18: enemyTeams[l].level18, n18: enemyTeams[l].num18,
                l19: enemyTeams[l].level19, n19: enemyTeams[l].num19,
                l20: enemyTeams[l].level20, n20: enemyTeams[l].num20,

                l21: enemyTeams[l].level21, n21: enemyTeams[l].num21,
                l22: enemyTeams[l].level22, n22: enemyTeams[l].num22,
                l23: enemyTeams[l].level23, n23: enemyTeams[l].num23,
                l24: enemyTeams[l].level24, n24: enemyTeams[l].num24,
                l25: enemyTeams[l].level25, n25: enemyTeams[l].num25,
                l26: enemyTeams[l].level26, n26: enemyTeams[l].num26,
                l27: enemyTeams[l].level27, n27: enemyTeams[l].num27,

                p: enemyTeams[l].power,

                b: enemyTeams[l].bunker, t: enemyTeams[l].treasure, tr: enemyTeams[l].trash,

                mani: enemyTeams[l].manipylator, main: enemyTeams[l].main,

                msv: enemyTeams[l].mergesv, mvmf: enemyTeams[l].mergevmf, mvvs: enemyTeams[l].mergevvs,

                cob: enemyTeams[l].createbarrack, cvb: enemyTeams[l].createwarf, cab: enemyTeams[l].createairport, cm: enemyTeams[l].createmining,

                mob: enemyTeams[l].mergebarrack, mvb: enemyTeams[l].mergewharf, mab: enemyTeams[l].mergeairport, mm: enemyTeams[l].mergemining,

                bw: enemyTeams[l].bookwhite, bg: enemyTeams[l].bookgreen, bv: enemyTeams[l].bookviolet, bb: enemyTeams[l].bookblue,

                fb: enemyTeams[l].bluefragment,

                ph: enemyTeams[l].premiumhining, pe: enemyTeams[l].elitehining, rh: enemyTeams[l].regularhining,

                ct: enemyTeams[l].chesttech, cc: enemyTeams[l].chestcomponents,

                g: enemyTeams[l].gems
            })
        }
        return new ConfigDTO('enemyTeams', this.deleteNull(arr))
    }

    private deleteNull(array: object[]) {
        for (let l = 0; l < array.length; l++) {
            array[l] = this.removeNull(array[l])
        }
        return array
    }

    private removeNull<T>(obj: T | any): object {
        Object.keys(obj).forEach((key) => {
            if (obj[key] == null) delete obj[key]
        })
        return obj
    }

    isNullOrUndefind(value: any) {
        if (value == undefined) return true
        if (value == null) return true
        return false
    }

}


