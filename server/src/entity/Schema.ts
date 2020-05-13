import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Schema {
    @PrimaryGeneratedColumn()
    public id: number

    @Column({ nullable: true })
    public table: string

    @Column("json")
    public schema: JSON
}
