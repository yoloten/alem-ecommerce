import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Size {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public name: string
}