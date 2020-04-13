import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { AdapterAuthEntity } from './entity/adapter-auth.entity';
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { CronModule } from './cron/cron.module';
import { DatabaseModule } from './database/database.module';
import { CronController } from './cron/cron.controller';
import { MetaDataEntity } from './entity/meta.entity';
import { TestingModule } from './testing/testing.module';
import { dropSchemaAtEveryStart } from '../assets/config';

@Module({
  imports: [
    AuthModule,
    CronModule,
    HttpModule,
    DatabaseModule,
    TestingModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        name: 'oura-adapter',
        type: 'postgres',
        host: `${process.env.OURA_ADAPTER_DB}`,
        port: 5432,
        username: 'audapret',
        password: 'audapret',
        database: 'oura_adapter',
        entities: [AdapterAuthEntity, MetaDataEntity],
        synchronize: true,
        dropSchema: dropSchemaAtEveryStart
      })
    })
  ],
  controllers: [CronController],
  providers: []
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
