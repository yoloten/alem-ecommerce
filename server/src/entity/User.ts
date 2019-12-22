import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Order } from './Order'
import { v4 } from "uuid"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    public primaryKey: number

    @Column({ type: "uuid", nullable: true })
    public id: string

    @Column()
    public name: string

    @Column()
    public email: string

    @Column({ type: "varchar", length: 30 })
    public password: string

    @Column({ nullable: true })
    public phone: string

    @Column({ type: "timestamp with time zone", default: new Date()})
    public createdAt: Date

    @OneToMany((type) => Order, (order) => order.user)
    public orders: Order[]

    constructor() {
        this.id = v4()
    }
}
