import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Documents } from 'src/model/documents.model';
import { DocumentService } from './document.service';

@Module({
  imports: [SequelizeModule.forFeature([Documents])],
  controllers: [DocumentController],
  providers: [DocumentService],
  exports: [],
})
export class DocumentModule { }
