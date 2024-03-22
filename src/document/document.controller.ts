import { Body, Controller, Post } from '@nestjs/common';
import { DocumentService } from './document.service';
import { Documents } from 'src/model/documents.model';

@Controller('document')
export class DocumentController {
    constructor(private readonly collectionsService: DocumentService) { }

    @Post('/create')
    async createDocument(@Body() documents: Documents): Promise<any> {
        return await this.collectionsService.createDocument(documents);
    }

    @Post('/query')
    async queryDocument(@Body() text: any): Promise<any> {
        return await this.collectionsService.queryDocument(text);
    }
}
