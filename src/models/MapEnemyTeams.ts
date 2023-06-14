import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MapEnemyTeams {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    territoryNumber: number

    //волна 1
    @Column()
    level1: number
    @Column()
    num1: number

    @Column()
    level2: number
    @Column()
    num2: number

    @Column()
    level3: number
    @Column()
    num3: number

    @Column()
    level4: number
    @Column()
    num4: number

    @Column()
    level5: number
    @Column()
    num5: number

    @Column()
    level6: number
    @Column()
    num6: number

    @Column()
    level7: number
    @Column()
    num7: number

    @Column()
    level8: number
    @Column()
    num8: number

    @Column()
    level9: number
    @Column()
    num9: number

    //волна 2
    @Column()
    level10: number
    @Column()
    num10: number

    @Column()
    level11: number
    @Column()
    num11: number

    @Column()
    level12: number
    @Column()
    num12: number

    @Column()
    level13: number
    @Column()
    num13: number

    @Column()
    level14: number
    @Column()
    num14: number

    @Column()
    level15: number
    @Column()
    num15: number

    @Column()
    level16: number
    @Column()
    num16: number

    @Column()
    level17: number
    @Column()
    num17: number

    @Column()
    level18: number
    @Column()
    num18: number

    //волна 3
    @Column()
    level19: number
    @Column()
    num19: number

    @Column()
    level20: number
    @Column()
    num20: number

    @Column()
    level21: number
    @Column()
    num21: number

    @Column()
    level22: number
    @Column()
    num22: number

    @Column()
    level23: number
    @Column()
    num23: number

    @Column()
    level24: number
    @Column()
    num24: number

    @Column()
    level25: number
    @Column()
    num25: number

    @Column()
    level26: number
    @Column()
    num26: number

    @Column()
    level27: number
    @Column()
    num27: number
}