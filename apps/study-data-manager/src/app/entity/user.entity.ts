import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { GrantEntity } from "./grant.entity";
import { UserType } from "@audapret/shared";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn({ name: "created_at", nullable: false })
  createdAt?: Date;

  @Column("enum", { name: "type", enum: UserType })
  type: UserType;

  @Column()
  password: string;

  @Column()
  username: string; // ToDO!

  @OneToOne((type) => GrantEntity, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  grant: GrantEntity;
}
