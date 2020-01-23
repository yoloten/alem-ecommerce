import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

export enum OrderStatus {
    NewOrder = "New Order",
    Pending = "Pending",
    Sent = "Sent",
}

@Entity()
export class Status {

    @PrimaryGeneratedColumn()
    public primaryKey: number

    @Column({ type: "enum", enum: OrderStatus })
    public status: OrderStatus

    @Column()
    public comment: string
}
