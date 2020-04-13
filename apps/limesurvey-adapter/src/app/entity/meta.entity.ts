import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class MetaDataEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt?: Date;

  @Column({ nullable: false })
  lastRetrievedResponseId: number;

  @Column({ nullable: false })
  surveyId: number;
}
