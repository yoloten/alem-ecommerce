import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { v4 } from "uuid"

import { Address } from "./Address"
import { Order } from "./Order"

export enum Role {
    Superadmin = "superadmin",
    admin = "admin",
    customer = "customer",
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    public primaryKey: number

    @Column({ type: "uuid", nullable: true, default: v4() })
    public id: string

    @Column()
    public name: string

    @Column()
    public email: string

    @Column({ type: "enum", enum: Role, default: Role.customer })
    public role: Role

    @Column({ type: "json", nullable: true })
    public photo: JSON

    @Column()
    public password: string

    @Column({ nullable: true })
    public phone: string

    @Column({ type: "timestamp with time zone", default: new Date()})
    public createdAt: Date

    @Column({ type: "timestamp with time zone", default: new Date()})
    public updatedAt: Date

    @OneToMany((type) => Order, (order) => order.user)
    public orders: Order[]

    @OneToMany((type) => Address, (address) => address.user)
    public addresses: Address[]
}
