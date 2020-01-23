import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn , ManyToOne } from "typeorm"
import { v4 } from "uuid"

import { OrderDetails } from "./OrderDetails"
import { Address } from "./Address"
import { Status } from "./Status"
import { User } from "./User"

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    public primaryKey: number

    @Column({ type: "uuid", nullable: true, default: v4() })
    public id: string

    @Column({ type: "timestamp with time zone", default: new Date()})
    public createdAt: Date

    @Column({ type: "timestamp with time zone", default: new Date()})
    public updatedAt: Date

    @ManyToOne((type) => User, (user) => user.orders)
    public user: User

    @OneToOne((type) => Address)
    @JoinColumn()
    public address: Address

    @OneToOne((type) => OrderDetails)
    @JoinColumn()
    public orderDetails: OrderDetails

    @OneToOne((type) => Status)
    @JoinColumn()
    public status: Status
}
