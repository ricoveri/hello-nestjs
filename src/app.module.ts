import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Main AppModule used by the nest instance created
// at main.ts
@Module({
  imports: [
    // Configuration module goes in here
    // ------------------------------------

    // Load environment variables and database configuration
    ConfigModule.forRoot(), // load .env variables
    ConfigModule.forFeature(databaseConfig), // load database configuration


    // TypeOrm integration goes in here
    // ------------------------------------
    TypeOrmModule.forRootAsync({ // async, since this depends on ConfigService
      imports: [ConfigModule], // explicitly import ConfigModule
      inject: [ConfigService], // so we can inject ConfigService upon initialization
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        autoLoadEntities: true,
        synchronize: true, // WARNING: DO NOT USE IN PRODUCTION
      }),

    }),

    // Resource modules go in here
    // ------------------------------------
    ItemsModule,
  ],

  // Include all resource modules
  // ------------------------------------
  controllers: [AppController], // FIXME: not sure if we're gonna need this controller
  providers: [AppService], // FIXME: not sure if we're gonna need this service
})
export class AppModule { }
