import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Product } from "./Product"

@Entity()
export class Sold {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public count: number

    @OneToMany((type) => Product, (product) => product.sold, { nullable: true })
    public soldProducts: Product[]
}
