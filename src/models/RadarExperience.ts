import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RadarExperience {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    level: number

    @Column({ type: 'numeric' })
    experience: number
}