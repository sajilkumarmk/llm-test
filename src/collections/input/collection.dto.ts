import { IsString } from "class-validator";

export class CollectionCreateDto {
  @IsString()
  name: string;
}