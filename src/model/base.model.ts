import { CreatedAt, Model, UpdatedAt } from "sequelize-typescript";

export class Base<T> extends Model<T> {
    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updated_at: Date;
}