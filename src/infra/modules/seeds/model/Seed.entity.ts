import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'seeds',
})
export class SeedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false, name: 'filename' })
  fileName: string;

  @Column('boolean', { default: false, name: 'is_processed' })
  isProcessed: boolean;

  @Column('datetime', { nullable: false, name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { nullable: false, name: 'updated_at' })
  updatedAt: Date;
}
