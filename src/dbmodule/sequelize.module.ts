import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

const sequelize: SequelizeModuleOptions = {
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  dialect: 'postgres',
  port: Number(process.env.POSTGRES_PORT),
  autoLoadModels: true,
  synchronize: true,
  dialectOptions: {
    useUTC: true,
  },
};

@Module({
  imports: [SequelizeModule.forRoot(sequelize)],
  controllers: [],
  providers: [],
})
export class SequelizeConfigModule {}
