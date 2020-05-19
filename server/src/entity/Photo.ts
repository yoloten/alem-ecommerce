import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { v4 } from "uuid"

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    public primaryKey: number

    @Column({ type: "uuid", nullable: true, default: v4() })
    public id: string

    @Column()
    public filename: string

    @Column()
    public extension: string

    @Column()
    public path: string

    @Column()
    public size: number
}
