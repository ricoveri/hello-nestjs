import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./item.entity";

@Entity('tags') // sql table == tags
export class Tag {
    @PrimaryGeneratedColumn() // primary key with auto-increment
    id: number;

    @Column()
    name: string;

    // Bi-directional Many-to-Many relationship with Item entity
    @ManyToMany(
        () => Item,
        (item) => item.tags // what is a "tag" within Item entity?
    )
    items: Item[];
}
