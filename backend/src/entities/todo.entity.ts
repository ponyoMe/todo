import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity('todos')
export class Todo{
    @PrimaryGeneratedColumn()
    id : number

    @Column({type: 'text' })
    description: string

    @Column({type: 'boolean', default: false })
    completed: boolean
}