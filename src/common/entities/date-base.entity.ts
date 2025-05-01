import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class DateBaseEntity {
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
