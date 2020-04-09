import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinTable,
  ManyToMany
} from 'typeorm';
import { UserEntity } from './user.entity';
import { StudyDto } from '@audapret/administrator';

@Entity()
export class StudyEntity {
  toDto(): StudyDto {
    return {
      studyTitle: this.studyTitle,
      users: this.users.map(user => user.toDto())
    };
  }
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt?: Date;

  @ManyToMany(type => UserEntity, { cascade: true })
  @JoinTable()
  users: UserEntity[];

  @Column({ unique: true })
  studyTitle: string;
}
