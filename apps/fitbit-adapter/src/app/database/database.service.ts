import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdapterAuthEntity } from "../entity/adapter-auth.entity";
import * as _ from "lodash";
import { Repository, Connection } from "typeorm";
import { AxiosOauth2Response } from "../../assets/shared";
import { OuraCategory } from "../../assets/shared";
import { MetaDataEntity } from "../entity/meta.entity";
import { OuraMetaDataDto } from "../../assets/meta-data.dto";

@Injectable()
export class DatabaseService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(AdapterAuthEntity)
    private readonly adapterAuthRepository: Repository<AdapterAuthEntity>,
    @InjectRepository(MetaDataEntity)
    private readonly metaDataRepository: Repository<MetaDataEntity>
  ) {}

  async saveAdapterAuthEntity(
    authEntity: AdapterAuthEntity
  ): Promise<AdapterAuthEntity> {
    try {
      authEntity = this.adapterAuthRepository.create(authEntity);
      return this.adapterAuthRepository.manager.save(authEntity);
    } catch (error) {
      console.error(error.message);
    }
  }
  async createAdapterAuthEntity(authEntity: AdapterAuthEntity) {
    return this.adapterAuthRepository.create(authEntity);
  }

  async getLatestAuthEntity(): Promise<AdapterAuthEntity> {
    try {
      const authEntities = await this.adapterAuthRepository.find({
        order: { expires_in: "DESC" },
      });
      const latestAuthEntity = authEntities.pop();
      return latestAuthEntity;
    } catch (error) {
      console.error(error.message);
    }
  }
  getAuthEntityFromAccessObject(
    accessObject: AxiosOauth2Response
  ): AdapterAuthEntity {
    try {
      return this.adapterAuthRepository.create(accessObject);
    } catch (error) {
      console.error(error.message);
    }
  }

  async getMetaDataEntity(
    category:
      | OuraCategory.SLEEP
      | OuraCategory.ACTIVITY
      | OuraCategory.READINESS
  ) {
    return await this.metaDataRepository.findOne({
      where: { category: category },
    });
  }
  async saveMetaDataEntity(metaDataEntity: MetaDataEntity) {
    return await this.metaDataRepository.save(metaDataEntity);
  }
  createMetaDataEntity(OuraMetaDataDto: OuraMetaDataDto) {
    return this.metaDataRepository.create(OuraMetaDataDto);
  }
}
