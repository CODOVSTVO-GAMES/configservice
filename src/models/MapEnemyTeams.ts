import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MapEnemyTeams {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    territoryNumber: number

    //волна 1
    @Column({ nullable: true })
    level1: number
    @Column({ nullable: true })
    num1: number

    @Column({ nullable: true })
    level2: number
    @Column({ nullable: true })
    num2: number

    @Column({ nullable: true })
    level3: number
    @Column({ nullable: true })
    num3: number

    @Column({ nullable: true })
    level4: number
    @Column({ nullable: true })
    num4: number

    @Column({ nullable: true })
    level5: number
    @Column({ nullable: true })
    num5: number

    @Column({ nullable: true })
    level6: number
    @Column({ nullable: true })
    num6: number

    @Column({ nullable: true })
    level7: number
    @Column({ nullable: true })
    num7: number

    @Column({ nullable: true })
    level8: number
    @Column({ nullable: true })
    num8: number

    @Column({ nullable: true })
    level9: number
    @Column({ nullable: true })
    num9: number

    //волна 2
    @Column({ nullable: true })
    level10: number
    @Column({ nullable: true })
    num10: number

    @Column({ nullable: true })
    level11: number
    @Column({ nullable: true })
    num11: number

    @Column({ nullable: true })
    level12: number
    @Column({ nullable: true })
    num12: number

    @Column({ nullable: true })
    level13: number
    @Column({ nullable: true })
    num13: number

    @Column({ nullable: true })
    level14: number
    @Column({ nullable: true })
    num14: number

    @Column({ nullable: true })
    level15: number
    @Column({ nullable: true })
    num15: number

    @Column({ nullable: true })
    level16: number
    @Column({ nullable: true })
    num16: number

    @Column({ nullable: true })
    level17: number
    @Column({ nullable: true })
    num17: number

    @Column({ nullable: true })
    level18: number
    @Column({ nullable: true })
    num18: number

    //волна 3
    @Column({ nullable: true })
    level19: number
    @Column({ nullable: true })
    num19: number

    @Column({ nullable: true })
    level20: number
    @Column({ nullable: true })
    num20: number

    @Column({ nullable: true })
    level21: number
    @Column({ nullable: true })
    num21: number

    @Column({ nullable: true })
    level22: number
    @Column({ nullable: true })
    num22: number

    @Column({ nullable: true })
    level23: number
    @Column({ nullable: true })
    num23: number

    @Column({ nullable: true })
    level24: number
    @Column({ nullable: true })
    num24: number

    @Column({ nullable: true })
    level25: number
    @Column({ nullable: true })
    num25: number

    @Column({ nullable: true })
    level26: number
    @Column({ nullable: true })
    num26: number

    @Column({ nullable: true })
    level27: number
    @Column({ nullable: true })
    num27: number
}