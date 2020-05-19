import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { v4 } from "uuid"

export enum Currency {
    Dollar = "RUB",
    Ruble = "USD",
}

@Entity()
export class Price {

    @PrimaryGeneratedColumn()
    public primaryKey: number

    @Column({ type: "uuid", nullable: true, default: v4() })
    public id: string

    @Column("decimal")
    public price: number

    @Column({ type: "decimal", default: 1, nullable: true })
    public discount: number

    @Column({ type: "enum", enum: Currency })
    public currency: Currency

    @Column({ type: "timestamp with time zone", default: new Date()})
    public createdAt: Date
}
