import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
} from "typeorm";
import { GrantEntity } from "./grant.entity";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn({ name: "created_at", nullable: false })
  createdAt?: Date;

  @Column()
  password: string; // ToDO!

  @Column()
  username: string; // ToDO!

  @OneToOne("GrantEntity", (grant: GrantEntity) => grant.user, {
    cascade: true,
    onDelete: "CASCADE",
  })
  grant: GrantEntity;
}
