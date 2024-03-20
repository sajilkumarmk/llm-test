import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel as InjectSequelizeModel } from '@nestjs/sequelize';
import { Collections } from "src/model/collections.model";

@Injectable()
export class CollectionsService {
    constructor(
        @InjectSequelizeModel(Collections)
        private readonly collectionModel: typeof Collections,
    ) { }

    async createCollection(
        collectionsData: Partial<Collections>,
    ): Promise<Collections> {
        const collection = await this.collectionModel.create(collectionsData);
        return collection;
    }

    async getCollection(
        id: string,
    ): Promise<string> {
        const collection = await this.collectionModel.findOne({
            where: { id: id },
        });
        if (!collection) {
            throw new NotFoundException('Collection does not exist');
          }
        return collection.name;
    }

    async updateCollection(
        id: string,
        name: any
    ): Promise<Collections> {
        const collection = await this.collectionModel.findOne({
            where: { id: id },
        });
        if (!collection) {
            throw new NotFoundException('Collection does not exist');
        }
        const updatedCollection = await collection.update({ name: name.name });
        return updatedCollection;
    }

    async deleteCollection(
        id: string
    ): Promise<string> {
        const collection = await this.collectionModel.findOne({
            where: { id: id },
        });
        if (!collection) {
            throw new NotFoundException('Collection does not exist');
        }
        await collection.destroy();
        return 'collection deleted';
    }
}