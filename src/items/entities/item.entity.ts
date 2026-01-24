import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

/* Item entity */
@Entity('items') // sql table == items
export class Item {
    @PrimaryGeneratedColumn() // not only this will make it primary, but it will auto-increment as well
    id: number;

    @Column()
    task: string;

    // though tags is an array, its values are stored
    // as plain JSON strings. Also, by setting nullable to
    // true, makes this column optional upon creation of a new
    // entity instance in the database.
    @Column('json', { nullable: true })
    tags: string[];
}
