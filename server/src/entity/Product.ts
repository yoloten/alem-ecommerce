import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Category } from "./Category"
import { Order } from "./Order"
import { Photo } from "./Photo"
import { Brand } from "./Brand"
import { v4 } from "uuid"

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    public primaryKey: number

    @Column({ type: "uuid", nullable: true })
    public id: string

    @Column()
    public name: string

    @Column({ type: "varchar", length: 200 })
    public description: string

    @Column("simple-json")
    public materialAndCare: { material: string[], care: string[] }

    @Column("float")
    public price: number

    @Column({ type: "float", nullable: true })
    public discount: number

    @Column("simple-array")
    public colors: [string]

    @Column("simple-array")
    public size: [string]

    @Column("int")
    public quantity: number

    @Column({ type: "timestamp with time zone", default: new Date()})
    public createdAt: Date
    
    @ManyToOne((type) => Category, (category) => category.products)
    public category: Category

    @ManyToOne((type) => Brand, (brand) => brand.products)
    public brand: Brand

    @ManyToOne((type) => Order, (order) => order.products, { nullable: true })
    public order: Order
    
    @OneToMany((type) => Photo, (photo) => photo.product, { nullable: true })
    public photos: Photo[]

    constructor() {
        this.id = v4()
    }
}
