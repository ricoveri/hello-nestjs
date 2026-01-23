import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

/* Main controller class for /items */
@Controller('items')
export class ItemsController {
    // The ItemsService (the one actually running the business logic for this resource)
    // gets injected here (see: items.service.ts)
    constructor(private readonly itemsService: ItemsService) { }

    // GET /items
    @Get()
    findAll(@Query() paginationQuery) {
        return this.itemsService.findAll();
    }

    // GET /items/:id
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.itemsService.findOne(id);
    }

    // POST /items
    @Post()
    create(@Body() createItemDto: CreateItemDto) {
        return this.itemsService.create(createItemDto);
    }

    // DELETE /items/:id
    @Delete(':id')
    delete(@Param('id') id: string) {
        this.itemsService.delete(id);
    }

    // PATCH /items/:id
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
        this.itemsService.update(id, updateItemDto);
    }
}
