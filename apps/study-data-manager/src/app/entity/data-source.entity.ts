import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { ContentSchemaEntity } from "./content-schema.entity";
import { DataSourceDto } from "@audapret/shared";

@Entity()
export class DataSourceEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn({ name: "created_at", nullable: false })
  createdAt?: Date;

  @Column()
  source: string;

  @OneToMany(
    "ContentSchemaEntity",
    (contentSchema: ContentSchemaEntity) => contentSchema.dataSource,
    { onDelete: "CASCADE" }
  )
  contentSchemas?: ContentSchemaEntity[];

  toDto(): DataSourceDto {
    return {
      source: this.source,
    };
  }
}
