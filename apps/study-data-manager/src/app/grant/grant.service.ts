import { Injectable } from "@nestjs/common";
import { GrantPayloadDto } from "@audapret/shared";
import { GrantEntity } from "../entity/grant.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export type User = any;

@Injectable()
export class GrantService {
  private readonly users: User[];

  constructor(
    @InjectRepository(GrantEntity)
    private readonly grantRepository: Repository<GrantEntity>
  ) {}

  /** @returns the GrantEntity of a requester @param requesterName*/
  async findGrantByRequester(requesterName: string): Promise<GrantEntity> {
    try {
      return await this.grantRepository.findOne({
        where: { requester: requesterName },
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  /** returns the owner grant */
  async getOwnerGrant(): Promise<GrantEntity> {
    try {
      return await this.grantRepository.findOne({ where: { isOwner: true } });
    } catch (error) {
      console.error(error.message);
    }
  }

  /** TypeOrm Delegation for saving a GrantEntity (create or update)
   *  The function checks if a grant for a requested action exists, updates it if yes and creates a new one if no
   *  @param grantEntity
   */
  async saveGrantEntity(grantEntity: GrantEntity): Promise<GrantEntity> {
    // Assumes that requester names are unique!
    /* const matchingGrant = await this.grantRepository.findOne({
      where: {
        requester: grantEntity.requester,
        detailLevel: grantEntity.detailLevel,
        grantedActions: grantEntity.grantedActions
      }
    });
    if (matchingGrant !== undefined) {
      grantEntity.id = matchingGrant.id;
    } */
    return this.grantRepository.save(grantEntity);
  }

  /** TypeOrm Delegation for creating a GrantEntity from a GrantPayloadDto
   *  @param dataSource
   */
  createGrant(grant: GrantPayloadDto) {
    return this.grantRepository.create(grant);
  }
}
