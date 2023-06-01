import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Level {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    level: number

    @Column({ type: 'numeric' })
    experience: number
}