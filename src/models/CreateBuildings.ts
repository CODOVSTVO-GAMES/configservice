import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CreateBuildings {//казармы и рудники
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

    @Column({ type: 'numeric' })
    pricecreate: number

    @Column({ type: 'numeric' })
    eperspawn: number

}