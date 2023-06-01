import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MergeBarracks {
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

}