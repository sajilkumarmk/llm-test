import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CollectionsService } from "./collections.service";
import { Collections } from "src/model/collections.model";

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) { }

  @Post('/collection')
  async createCollection(@Body() collections: Collections): Promise<Collections> {
    return await this.collectionsService.createCollection(collections);
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