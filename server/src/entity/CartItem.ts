import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"

import { OrderDetails } from "./OrderDetails"

@Entity()
export class CartItem {

    @PrimaryGeneratedColumn()
    public primaryKey: number

    @Column()
    public id: string

    @Column()
    public productPrimaryKey: number

    @Column()
    public size: string

    @Column()
    public color: string

    @Column()
    public quantity: number

    @Column("decimal")
    public price: number

    @Column()
    public currency: string
    
    @ManyToOne((type) => OrderDetails, (orderDetails) => orderDetails.cartItems)
    public orderDetails: OrderDetails
}
