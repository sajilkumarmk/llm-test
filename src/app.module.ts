import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config.module';
import { SequelizeConfigModule } from './dbmodule/sequelize.module';

@Module({
  imports: [AppConfigModule, SequelizeConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
