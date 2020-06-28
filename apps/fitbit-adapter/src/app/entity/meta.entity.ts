import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { FitbitPath } from "../../assets/shared";
import { FitbitMetaDataDto } from "../../assets/meta-data.dto";

@Entity()
export class MetaDataEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn({ name: "created_at", nullable: false })
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at", nullable: false })
  updatedAt?: Date;

  @Column({ nullable: false })
  lastSuccessfulRetrieval: Date;

  @Column("enum", { name: "category", enum: FitbitPath, nullable: false })
  path: FitbitPath;

  toDto(): FitbitMetaDataDto {
    return {
      path: this.path,
      lastSuccessfulRetrieval: this.lastSuccessfulRetrieval,
    };
  }
}
