import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"

import { CartItem } from "./CartItem"

@Entity()
export class OrderDetails {

    @PrimaryGeneratedColumn()
    public primaryKey: number

    @Column()
    public id: string

    @Column({ type: "decimal", nullable: true })
    public totalPrice: number

    @Column({ nullable: true })
    public currency: string 

    @OneToMany((type) => CartItem, (cartItem) => cartItem.orderDetails, { nullable: true })
    public cartItems: CartItem[]
}
