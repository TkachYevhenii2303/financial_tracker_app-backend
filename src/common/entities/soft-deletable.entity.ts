import { Column, DeleteDateColumn } from 'typeorm';
import { DateBaseEntity } from './date-base.entity';

export default class SoftDeletableEntity extends DateBaseEntity {
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}
