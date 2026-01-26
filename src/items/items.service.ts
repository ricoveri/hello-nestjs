import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';

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
        private readonly itemRepository: Repository<Item>,

        // initialises a private member variable that will act as the repo
        // for the Tag entity
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
    ) { }

    // helper method to preload a tag by name
    // used when creating or updating an item
    // essentially, if the tag already exists, we return it
    // otherwise we create a new tag instance
    private async preloadTagByName(name: string): Promise<Tag> {
        const existingTag = await this.tagRepository.findOne({ where: { name } }); // 👈 notice the "where"
        if (existingTag) {
            return existingTag;
        }
        return this.tagRepository.create({ name }); // we purposely do not save it yet
    }

    // get all items
    findAll(): Promise<Item[]> {
        return this.itemRepository.find({
            relations: {
                tags: true
            }
        });
    }

    // find one item
    async findOne(id: string): Promise<Item> {
        const item = await this.itemRepository.findOne({
            where: {
                id: +id
            },
            relations: {
                tags: true
            }
        });

        if (!item) {
            throw new NotFoundException(`Item ${id} not found`)
        }

        return item;
    }

    // create one item
    async create(createItemDto: CreateItemDto): Promise<Item> {
        // First, we get all existing tags or create new ones
        // specified in the DTO.
        // see: preloadTagByName() method above
        // We do this this asynchronously
        // so that we can await all of them to be resolved before
        // proceeding to create the item
        const tags = await Promise.all(
            createItemDto.tags.map(name => this.preloadTagByName(name)),
        );

        // then we create the item itself, including any tags
        // that come with it, new or existing
        const new_item = this.itemRepository.create({
            ...createItemDto,
            tags
        });

        // and finally save it to the db
        return await this.itemRepository.save(new_item);
    }

    // delete one item
    async remove(id: string): Promise<void> {
        const item = await this.findOne(id); // DRY
        this.itemRepository.remove(item);
    }

    // update an item
    async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
        // upon updating, tags are technically optional, therefore
        // preloading them will only be done if they are actually
        // part of the update DTO
        const tags =
            updateItemDto.tags &&
            // as per create() method above, we preload all tags asynchronously
            (await Promise.all(
                updateItemDto.tags.map(name => this.preloadTagByName(name)),
            ));

        // preload the item entity itself with the new values
        const item = await this.itemRepository.preload({
            id: +id,
            ...updateItemDto,
            tags
        })

        // no item, no update
        if (!item) {
            throw new NotFoundException(`Item ${id} not found`)
        }

        // finally, save the updated item entity into the database (repository)
        return this.itemRepository.save(item);
    }

}
