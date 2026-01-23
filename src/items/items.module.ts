import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

// Instead of providing ItemsController and ItemsService into
// the main AppModule, we compact them into their own module, which
// is better in terms of organization. This module gets "imported" into
// the main AppModule (see: app.module.ts)
@Module({
    controllers: [ItemsController],
    providers: [ItemsService]
})
export class ItemsModule { }
