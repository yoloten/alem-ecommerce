import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"

import {Macro} from "./Macro"

@Entity()
export class Options {

    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public label: string

    @Column()
    public value: string

    @Column("json", { nullable: true })
    public meta: JSON

    @ManyToOne((type) => Macro, (macro) => macro.options, {nullable: true})
    public macro: Macro
}
