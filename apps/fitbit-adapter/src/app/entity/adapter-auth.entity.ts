import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class AdapterAuthEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt?: Date;

  @Column()
  access_token: string;

  @Column()
  expires_in: number;

  @Column()
  refresh_token: string;
}
