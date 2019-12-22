import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Product } from "./Product"
import { v4 } from "uuid"

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    public primaryKey: number

    @Column({ type: "uuid", nullable: true })
    public id: string

    @Column()
    public filename: string

    @Column()
    public extension: string

    @Column()
    public path: string

    @Column()
    public size: number

    @ManyToOne((type) => Product, (product) => product.photos, { nullable: true })
    public product: Product

    constructor() {
        this.id = v4()
    }
}
