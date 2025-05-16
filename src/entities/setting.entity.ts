import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from 'typeorm';
  import { EntityModel } from './entity.model';
  
  @Entity('settings')
  export class Setting extends EntityModel {
    @PrimaryGeneratedColumn()
    setting_id: number;
  
    @Column({ unique: true })
    key: string;
  
    @Column({ type: 'text' })
    value: string;
  
    @Column({ type: 'text', nullable: true })
    description: string;
  }