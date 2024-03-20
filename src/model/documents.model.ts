import {
    Column,
    Table,
    DataType,
    AllowNull,
    PrimaryKey,
    Default,
    ForeignKey,
} from 'sequelize-typescript';
import { Base } from './base.model';
import { Collections } from './collections.model';

@Table({ tableName: 'documents' })
export class Documents extends Base<Documents> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @AllowNull(false)
    @ForeignKey(() => Collections)
    @Column(DataType.UUID)
    collection_id: string;

    @AllowNull(false)
    @Column
    text: string;

    @AllowNull(false)
    @Column(DataType.ARRAY(DataType.FLOAT))
    embedding: number[];
}