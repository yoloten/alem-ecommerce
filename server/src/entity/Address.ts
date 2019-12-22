import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { v4 } from "uuid"

@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    public primaryKey: number

    @Column({ type: "uuid", nullable: true })
    public id: string

    @Column({ nullable: true })
    public address: string

    @Column({ nullable: true })
    public city: string

    @Column({ nullable: true })
    public postascode: number

    @Column({ nullable: true })
    public country: string

    @Column({ type: "timestamp with time zone", default: new Date()})
    public createdAt: Date

    constructor() {
        this.id = v4()
    }
}
