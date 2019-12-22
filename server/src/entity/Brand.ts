import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Product } from "./Product"
// import { SubCategory } from "./SubCategory"

@Entity()
export class Brand {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public name: string

    @OneToMany((type) => Product, (product) => product.brand)
    public products: Product[]
}
