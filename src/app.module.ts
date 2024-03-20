import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config.module';
import { SequelizeConfigModule } from './dbmodule/sequelize.module';
import { CollectionsModule } from './collections/collections.module';
import { DocumentService } from './document/document.service';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [
    AppConfigModule, 
    SequelizeConfigModule,
    CollectionsModule,
    DocumentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
