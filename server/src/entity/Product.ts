import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, OneToMany, OneToOne, JoinColumn, ManyToMany } from "typeorm"
import { Material } from "./Material"
import { Category } from "./Category"
import { Price } from "./Price"
import { Color } from "./Color"
import { Photo } from "./Photo"
import { Brand } from "./Brand"
import { Care } from "./Care"
import { Size } from "./Size"
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

    @ManyToMany(type => Material)
    @JoinTable()
    materials: Material[]

    @ManyToMany(type => Care)
    @JoinTable()
    care: Care[]

    @ManyToMany(type => Color)
    @JoinTable()
    colors: Color[]

    @ManyToMany(type => Size)
    @JoinTable()
    sizes: Size[]

    @Column("int")
    public quantity: number

    @Column({ type: "timestamp with time zone", default: new Date() })
    public createdAt: Date

    @Column({ type: "timestamp with time zone", default: new Date() })
    public updateddAt: Date

    @ManyToOne((type) => Category, (category) => category.products)
    public category: Category

    @ManyToOne((type) => Brand, (brand) => brand.products)
    public brand: Brand

    @OneToMany((type) => Photo, (photo) => photo.product, { nullable: true })
    public photos: Photo[]

    @OneToOne((type) => Price)
    @JoinColumn()
    public price: Price
}
