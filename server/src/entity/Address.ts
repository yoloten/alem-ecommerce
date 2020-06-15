import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { v4 } from "uuid"

import { User } from "./User"

@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    public primaryKey: number

    @Column({ type: "uuid", default: v4() })
    public id: string

    @Column()
    public address: string

    @Column()
    public city: string

    @Column()
    public postalcode: number

    @ManyToOne((type) => User, (user) => user.addresses)
    public user: User

    @Column({ type: "timestamp with time zone", default: new Date()})
    public createdAt: Date
}
