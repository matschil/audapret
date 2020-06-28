import { Module, Global, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdapterAuthEntity } from '../entity/adapter-auth.entity';
import { DatabaseModule } from '../database/database.module';
import { OuraAuthService } from './auth.service';
import { OuraAuthController } from './auth.controller';

@Global()
@Module({
  imports: [
    DatabaseModule,
    HttpModule,
    TypeOrmModule.forFeature([AdapterAuthEntity])
  ],
  controllers: [OuraAuthController],
  providers: [OuraAuthService],
  exports: [OuraAuthService]
})
export class AuthModule {}
