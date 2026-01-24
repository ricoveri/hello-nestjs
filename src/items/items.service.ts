import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/* Main provider class for /items */
// in short, it does the actual CRUD operations for this resources and more
@Injectable()
export class ItemsService {
    constructor(

        // -----------------------------------------
        // NestJS follows the repository pattern, and we use a repository
        // per entity as an abstraction to the raw database table
        // in the order to get entity instances from it.
        // -----------------------------------------
        // The constructor defined here automatically
        // initialises a private member variable that will act as the repo
        // for the Item entity
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>
    ) { }

    // get all items
    findAll(): Promise<Item[]> {
        return this.itemRepository.find();
    }

    // find one item
    async findOne(id: string): Promise<Item> {
        const item = await this.itemRepository.findOne({ where: { id: +id } });

        if (!item) {
            throw new NotFoundException(`Item ${id} not found`)
        }

        return item;
    }

    // create one item
    async create(createItemDto: CreateItemDto): Promise<Item> {
        const new_item = this.itemRepository.create(createItemDto);
        return await this.itemRepository.save(new_item);
    }

    // delete one item
    async remove(id: string): Promise<void> {
        const item = await this.findOne(id); // DRY
        this.itemRepository.remove(item);
    }

    // update an item
    async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
        const item = await this.itemRepository.preload({
            id: +id,
            ...updateItemDto
        })

        if (!item) {
            throw new NotFoundException(`Item ${id} not found`)
        }

        return this.itemRepository.save(item);
    }

}
