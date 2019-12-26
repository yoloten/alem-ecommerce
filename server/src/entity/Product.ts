import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, OneToOne } from "typeorm"
import { Category } from "./Category"
import { Price } from "./Price"
import { Photo } from "./Photo"
import { Brand } from "./Brand"
import { v4 } from "uuid"

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    public primaryKey: number

    @Column({ type: "uuid", nullable: true, default: v4() })
    public id: string

    @Column()
    public name: string

    @Column({ type: "varchar", length: 200 })
    public description: string

    @Column("simple-array")
    public material: string[]
    
    @Column("simple-array")
    public care: string[] 

    @Column("simple-array")
    public colors: [string]

    @Column("simple-array")
    public size: [string]

    @Column("int")
    public quantity: number

    @Column({ type: "timestamp with time zone", default: new Date()})
    public createdAt: Date

    @Column({ type: "timestamp with time zone", default: new Date()})
    public updateddAt: Date
    
    @ManyToOne((type) => Category, (category) => category.products)
    public category: Category

    @ManyToOne((type) => Brand, (brand) => brand.products)
    public brand: Brand

    @OneToOne((type) => Price, { nullable: false })
    @JoinColumn()
    public price: Price
    
    @OneToMany((type) => Photo, (photo) => photo.product, { nullable: true })
    public photos: Photo[]
}
