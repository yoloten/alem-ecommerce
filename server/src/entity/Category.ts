import { Tree, TreeChildren, TreeParent, Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm"
import { Product } from "./Product"

@Entity()
@Tree("closure-table")
export class Category {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public name: string

    @OneToMany((type) => Product, (product) => product.category, { nullable: true })
    public products: Product[]

    @TreeChildren()
    public children: Category[]

    @TreeParent()
    public parent: Category
}
