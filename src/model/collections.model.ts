import {
  Column,
  Table,
  DataType,
  AllowNull,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';
import { Base } from './base.model';

@Table({ tableName: 'collections' })
export class Collections extends Base<Collections> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column
  name: string;
}
