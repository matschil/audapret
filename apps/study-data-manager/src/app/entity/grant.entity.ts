import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
} from "typeorm";
import { DetailLevel, GrantedAction, GrantPayloadDto } from "@audapret/shared";
import { UserEntity } from "./user.entity";

@Entity()
export class GrantEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn({ name: "created_at", nullable: false })
  createdAt?: Date;

  @Column("enum", { name: "detail_level", enum: DetailLevel })
  detailLevel: DetailLevel;

  @Column("enum", { name: "granted_actions", enum: GrantedAction, array: true })
  grantedActions: GrantedAction[];

  @Column("boolean", { default: false })
  isOwner: boolean;

  @OneToOne("UserEntity", (user: UserEntity) => user.grant)
  user?: GrantEntity;
}
