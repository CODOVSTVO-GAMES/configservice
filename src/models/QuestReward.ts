import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class QuestReward {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    level: number

    @Column({ type: 'numeric' })
    gold: number
}