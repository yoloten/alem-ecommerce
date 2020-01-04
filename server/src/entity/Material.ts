import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Material {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public name: string
}
