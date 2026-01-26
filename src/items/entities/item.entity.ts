import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./tag.entity";

/* Item entity */
@Entity('items') // sql table == items
export class Item {
    @PrimaryGeneratedColumn() // not only this will make it primary, but it will auto-increment as well
    id: number;

    @Column()
    task: string;

    // Implementation of Many-to-Many relationship with Tag entity
    // This will create a join table named "item_tags_tag" by default
    // and will link items and tags together appropriately
    @JoinTable() // The "owning" side of the relationship needs to have this decorator
    @ManyToMany( // define the relationship (both parties need to have it defined)
        () => Tag,
        (tag) => tag.items, // what is an "item" within Tag entity?
        {
            cascade: true // automatically create tags if they don't exist
        }
    )
    tags: Tag[];
}
