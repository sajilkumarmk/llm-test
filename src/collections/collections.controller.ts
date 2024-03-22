import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { CollectionsService } from "./collections.service";
import { Collections } from "src/model/collections.model";
import { CollectionCreateDto } from "./input/collection.dto";

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) { }

  @Post('/create')
  async createCollection(@Body() body: CollectionCreateDto): Promise<Collections> {
    try {
      return await this.collectionsService.createCollection(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  async getCollection(@Param('id') id: string,): Promise<string> {
    return await this.collectionsService.getCollection(id);
  }

  @Patch('update/:id')
  async updateCollection(
    @Param('id') id: string,
    @Body() name: any,
  ): Promise<Collections> {
    return await this.collectionsService.updateCollection(id, name);
  }

  @Delete('delete/:id')
  async deleteCollection(
    @Param('id') id: string
  ): Promise<string> {
    return await this.collectionsService.deleteCollection(id);
  }
}