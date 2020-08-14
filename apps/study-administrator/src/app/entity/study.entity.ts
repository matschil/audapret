import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { StudyDto } from "@audapret/administrator";

@Entity()
export class StudyEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn({ name: "created_at", nullable: false })
  createdAt?: Date;

  @ManyToMany(() => UserEntity, { cascade: true })
  @JoinTable()
  users: UserEntity[];

  @Column({ unique: true })
  studyTitle: string;

  toDto(): StudyDto {
    return {
      studyTitle: this.studyTitle,
      users: this.users.map((user) => user.toDto()),
    };
  }
}
