import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

/* Main provider class for /items */
// in short, it does the actual CRUD operations for this resources and more
@Injectable()
export class ItemsService {
    // FIXME: mock database,
    // this is temporary, until we do provide a proper ORM integration
    // into all of this
    private items: Item[] = [{
        id: 1,
        task: "some task I'm supposed to do",
        tags: [
            "hello", "there"
        ]
    }];

    // get all items
    findAll(): Item[] {
        return this.items;
    }

    // find one item
    findOne(id: string): Item {
        const item = this.items.find((item) => item.id === +id);
        if (!item) {
            throw new NotFoundException(`Item ${id} not found`)
        }
        return item;
    }

    // create one item
    create(createItemDto: CreateItemDto): object {
        let new_item = {
            // FIXME: this is definitely going to change
            id: this.items.length + 1,
            task: createItemDto.task,
            tags: createItemDto.tags
        }
        this.items.push(new_item);
        return new_item;
    }

    // delete one item
    delete(id: string): void {
        let itemIdx = this.items.findIndex((item) => item.id === +id);
        if (itemIdx >= 0) {
            this.items.splice(itemIdx, 1);
        } else {
            throw new NotFoundException(`Item ${id} not found`)
        }
    }

    // update an item
    update(id: string, updateItemDto: UpdateItemDto): Item {
        let i: Item | undefined = this.items.find((item) => item.id === +id);
        if (!i) {
            throw new NotFoundException(`Item ${id} not found`)
        }
        // FIXME: this is definitely going to change
        if (updateItemDto.task !== undefined) {
            i.task = updateItemDto.task;
        }
        if (updateItemDto.tags !== undefined) {
            i.tags = updateItemDto.tags;
        }
        return i;
    }

}
