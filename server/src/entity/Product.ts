import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { SubCategory } from "./SubCategory"
import { Comment } from "./Comment"
import { Photo } from "./Photo"
import { Brand } from "./Brand"
import { User } from "./User"
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
    
    @ManyToOne((type) => SubCategory, (subCategory) => subCategory.products)
    public subCategory: SubCategory

    @ManyToOne((type) => Brand, (brand) => brand.products)
    public brand: Brand

    @ManyToOne((type) => User, (user) => user.cart, { nullable: true })
    public customer: User

    @OneToMany((type) => Photo, (photo) => photo.product, { nullable: true })
    public photos: Photo[]

    @OneToMany((type) => Comment, (comment) => comment.product, { nullable: true })
    public comments: Comment[]

    constructor() {
        this.id = v4()
    }
}
