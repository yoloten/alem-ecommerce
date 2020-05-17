import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Schema {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public table: string

    @Column("json")
    public attributes: JSON
}
