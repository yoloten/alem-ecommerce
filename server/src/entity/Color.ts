import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Color {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public name: string
}
