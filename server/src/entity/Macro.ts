import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

import { Options } from "./Options"

@Entity()
export class Macro {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public label: string

    @Column()
    public uuid: string

    @Column()
    public name: string

    @Column()
    public validatorsList: string

    @Column({ default: false })
    public selectable: boolean

    @Column()
    public type: string

    @Column({ nullable: true })
    public optionsType: string

    @Column("json", { nullable: true })
    public validators: JSON

    @OneToMany((type) => Options, (options) => options.macro, { nullable: true })
    public options: Options[]
}
