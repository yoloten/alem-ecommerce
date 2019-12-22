import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Comment } from "./Comment"
import { Product } from "./Product"
import { v4 } from "uuid"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    public primaryKey: number

    @Column({ type: "uuid", nullable: true })
    public id: string

    @Column()
    public name: string

    @Column()
    public email: string

    @Column({ type: "varchar", length: 30 })
    public password: string

    @Column({ nullable: true })
    public address: string

    @Column({ nullable: true })
    public city: string

    @Column({ nullable: true })
    public postascode: number

    @Column({ nullable: true })
    public country: string

    @Column({ nullable: true })
    public phone: string

    @Column({ type: "timestamp with time zone", default: new Date()})
    public createdAt: Date

    @OneToMany((type) => Comment, (comment) => comment.user, { nullable: true })
    public comments: Comment[]

    @OneToMany((type) => Product, (product) => product.customer, { nullable: true })
    public cart: Product[]

    constructor() {
        this.id = v4()
    }
}
