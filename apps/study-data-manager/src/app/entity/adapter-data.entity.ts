import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { ContentSchemaEntity } from "./content-schema.entity";
import { AdapterDataDto } from "@audapret/shared";

@Entity()
export class AdapterDataEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn({ name: "created_at", nullable: false })
  createdAt?: Date;

  @ManyToOne(
    "ContentSchemaEntity",
    (schema: ContentSchemaEntity) => schema.adapterData,
    { cascade: true, onDelete: "CASCADE" }
  )
  contentSchema?: ContentSchemaEntity;

  @Column("jsonb")
  content: any;

  toDto(): AdapterDataDto {
    return { content: this.content };
  }
}
