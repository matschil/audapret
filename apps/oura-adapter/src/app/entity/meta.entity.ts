import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { OuraCategory } from '../../assets/shared';
import { OuraMetaDataDto } from '../../assets/meta-data.dto';

@Entity()
export class MetaDataEntity {
  toDto(): OuraMetaDataDto {
    return {
      category: this.category,
      lastSuccessfulRetrieval: this.lastSuccessfulRetrieval
    };
  }
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt?: Date;

  @Column({ nullable: false })
  lastSuccessfulRetrieval: Date;

  @Column('enum', { name: 'category', enum: OuraCategory, nullable: false })
  category: OuraCategory;
}
