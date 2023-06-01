import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Units {
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
    hp: number

    @Column({ type: 'numeric' })
    damage: number

    @Column()
    typeattask: number

    @Column()
    timecreate: number

    @Column({ type: 'numeric' })
    pricecreate: number

    @Column({ type: 'numeric' })
    eperspawn: number
}