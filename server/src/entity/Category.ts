import { PrimaryGeneratedColumn, TreeChildren, TreeParent, Entity, Column, Tree } from "typeorm"
import { Product } from "./Product"

@Entity()
@Tree("closure-table")
export class Category {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public name: string

    @TreeChildren()
    public children: Category[]

    @TreeParent()
    public parent: Category
}
