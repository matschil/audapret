import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { UserType } from "@audapret/administrator";
import { StudyUserDto } from "@audapret/administrator";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: "created_at", nullable: false })
  createdAt?: Date;

  @Column({ unique: true })
  name: string;

  @Column()
  studyDataManagerAddress: string;

  @Column("enum", { name: "user_type", enum: UserType })
  userType: UserType;
  toDto(): StudyUserDto {
    return {
      studyDataManagerAddress: this.studyDataManagerAddress,
      name: this.name,
      userType: this.userType,
    };
  }
}
