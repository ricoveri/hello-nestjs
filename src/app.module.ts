import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';

// Main AppModule used by the nest instance created
// at main.ts
@Module({
  imports: [ItemsModule], // Include all resource modules
  controllers: [AppController], // FIXME: not sure if we're gonna need this controller
  providers: [AppService], // FIXME: not sure if we're gonna need this service
})
export class AppModule { }
