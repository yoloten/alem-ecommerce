import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { v4 } from "uuid"

import { User } from "./User"

@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public address: string

    @Column({ nullable: true })
    public phone: string

    @Column()
    public city: string

    @Column()
    public postalcode: string

    @Column({ default: false })
    public selected: boolean

    @ManyToOne((type) => User, (user) => user.addresses)
    public user: User

    @Column({ type: "timestamp with time zone", default: new Date()})
    public createdAt: Date

    @Column({ type: "timestamp with time zone", default: new Date()})
    public updatedAt: Date
}
