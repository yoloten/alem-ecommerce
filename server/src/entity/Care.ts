import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Care {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public name: string
}
