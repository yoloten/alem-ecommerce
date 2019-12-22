import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { SubCategory } from "./SubCategory"

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public name: string

    @OneToMany((type) => SubCategory, (subCategory) => subCategory.category)
    public subCategories: SubCategory[]

}