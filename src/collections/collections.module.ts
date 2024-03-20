import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Collections } from "src/model/collections.model";
import { CollectionsController } from "./collections.controller";
import { CollectionsService } from "./collections.service";

@Module({
    imports: [SequelizeModule.forFeature([Collections])],
    controllers: [CollectionsController],
    providers: [CollectionsService],
    exports: [],
})

export class CollectionsModule {}