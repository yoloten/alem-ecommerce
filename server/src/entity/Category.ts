import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Product } from "./Product"

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public name: string

    @OneToMany((type) => Product, (product) => product.category, { nullable: true })
    public products: Product[]
}
