import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';

// Main AppModule used by the nest instance created
// at main.ts
@Module({
  imports: [
    ItemsModule,
    // TypeOrm integration goes in here
    // ------------------------------------
    TypeOrmModule.forRoot({
      type: 'mysql', // type of our database
      host: 'localhost', // database host
      port: 3306, // database host
      username: 'todoapp-user', // username
      password: 'todoapp-passwd-user', // user password (same as the one set in docker-compose.yml)
      database: 'todoapp', // name of our database,
      autoLoadEntities: true, // models will be loaded automatically
      // WARNING: DO NOT USE THIS ONE IN A PRODUCTION ENVIRONMENT
      synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
    })], // Include all resource modules
  controllers: [AppController], // FIXME: not sure if we're gonna need this controller
  providers: [AppService], // FIXME: not sure if we're gonna need this service
})
export class AppModule { }
