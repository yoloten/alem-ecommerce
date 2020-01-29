import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm"

import { Order } from "./Order"

@Entity()
export class Delivery {

    @PrimaryGeneratedColumn()
    public primaryKey: number

    @Column()
    public value: string

    @Column()
    public label: string

    @Column("decimal")
    public price: number

    @Column()
    public currency: string

    @Column({type: "json", nullable: true})
    public meta: object

    @OneToMany((type) => Order, (order) => order.delivery)
    public orders: Order[]
}
