import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { NetatmoMetaDataDto } from '../../assets/meta-data.dto';

@Entity()
export class NetatmoMetaDataEntity {
  toDto(): NetatmoMetaDataDto {
    return {
      lastRetreivedUserDataId: this.lastRetreivedUserDataId
    };
  }
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt?: Date;

  @Column({ nullable: false })
  lastRetreivedUserDataId: string;
}
