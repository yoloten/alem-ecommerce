import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Product } from "./Product"
import { v4 } from "uuid"

@Entity()
export class Discount {

    @PrimaryGeneratedColumn()
    public primaryKey: number

    @Column({ type: "uuid", nullable: true, default: v4() })
    public id: string

    @Column("float")
    public discount: number

    @Column({ type: "timestamp with time zone", default: new Date()})
    public createdAt: Date

    @Column({ type: "timestamp with time zone", default: new Date()})
    public updatedAt: Date

    @Column({ type: "timestamp with time zone", nullable: true })
    public expiredAt: Date

    @OneToMany((type) => Product, (product) => product.discount)
    public products: Product[]
}
