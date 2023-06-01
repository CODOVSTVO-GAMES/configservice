import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MainBuilding {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    level: number

    @Column({ type: 'numeric' })
    experience: number

    @Column()
    power: number

    @Column({ type: 'numeric' })
    priceupdate: number

    @Column()
    resourceupdate: number

    @Column()
    bonusattack: number
}