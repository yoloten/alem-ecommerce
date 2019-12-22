import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Product } from "./Product"
import { Category } from "./Category"

@Entity()
export class SubCategory {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public name: string

    @OneToMany((type) => Product, (product) => product.subCategory)
    public products: Product[]

    @ManyToOne((type) => Category, (category) => category.subCategories)
    public category: Category

}
