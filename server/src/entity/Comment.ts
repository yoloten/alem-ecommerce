import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne} from "typeorm"
import { User } from "./User"
import { Product } from "./Product"
import { v4 } from "uuid"

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    public primaryKey: number

    @Column({ type: "uuid", nullable: true })
    public id: string

    @Column({ type: "varchar", length: 200 })
    public text: string

    @Column({ type: "timestamp with time zone", default: new Date()})
    public createdAt: Date

    @ManyToOne((type) => User, (user) => user.comments, { nullable: true })
    public user: User

    @ManyToOne((type) => Product, (product) => product.comments, { nullable: true })
    public product: Product

    constructor() {
        this.id = v4()
    }
}
