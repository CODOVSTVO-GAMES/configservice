import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MapEnemyTeams {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    territoryNumber: number
    
    //волна 1
    level1: number
    num1: number

    level2: number
    num2: number

    level3: number
    num3: number

    level4: number
    num4: number

    level5: number
    num5: number

    level6: number
    num6: number

    level7: number
    num7: number

    level8: number
    num8: number

    level9: number
    num9: number

    //волна 2
    level10: number
    num10: number

    level11: number
    num11: number

    level12: number
    num12: number

    level13: number
    num13: number

    level14: number
    num14: number

    level15: number
    num15: number

    level16: number
    num16: number

    level17: number
    num17: number

    level18: number
    num18: number

    //волна 3
    level19: number
    num19: number

    level20: number
    num20: number

    level21: number
    num21: number

    level22: number
    num22: number

    level23: number
    num23: number

    level24: number
    num24: number

    level25: number
    num25: number

    level26: number
    num26: number

    level27: number
    num27: number
}