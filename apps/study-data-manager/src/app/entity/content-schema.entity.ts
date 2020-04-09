import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { AdapterDataEntity } from './adapter-data.entity';
import { DataSourceEntity } from './data-source.entity';
import { ContentSchemaDto } from '@audapret/shared';

@Entity()
export class ContentSchemaEntity {
  toDto(): ContentSchemaDto {
    return {
      source: this.dataSource.source,
      schema: this.schema
    };
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(
    'DataSourceEntity',
    (dataSource: DataSourceEntity) => dataSource.contentSchemas,
    { cascade: true, onDelete: 'CASCADE' }
  )
  dataSource?: DataSourceEntity;

  @Column('jsonb')
  schema: Object;

  @OneToMany(
    'AdapterDataEntity',
    (adapterData: AdapterDataEntity) => adapterData.contentSchema
  )
  adapterData?: AdapterDataEntity[];
}
