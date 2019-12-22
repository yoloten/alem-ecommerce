import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn , ManyToOne } from "typeorm"
import { Address } from "./Address"
import { User } from "./User"
import { v4 } from "uuid"

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    public primaryKey: number

    @Column({ type: "uuid", nullable: true })
    public id: string

    @Column({ nullable: true })
    public totalPrice: number

    @Column({ type: "timestamp with time zone", default: new Date()})
    public createdAt: Date

    @ManyToOne((type) => User, (user) => user.orders)
    public user: User

    @OneToOne((type) => Address)
    @JoinColumn()
    public address: Address

    constructor() {
        this.id = v4()
    }
}
