import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Product } from "./Product"
import { v4 } from "uuid"

@Entity()
export class Discount {

    @PrimaryGeneratedColumn()
    public primaryKey: number

    @Column({ type: "uuid", nullable: true })
    public id: string

    @Column("float")
    public discount: number

    @Column({ type: "timestamp with time zone", default: new Date()})
    public createdAt: Date

    @Column({ type: "timestamp with time zone"})
    public updatedAt: Date

    @Column({ type: "timestamp with time zone", default: new Date()})
    public expiredAt: Date

    @OneToMany((type) => Product, (product) => product.discount)
    public products: Product[]

    constructor() {
        this.id = v4()
    }
}
