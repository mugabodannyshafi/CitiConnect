import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { EntityModel } from './entity.model';
  import { Complaint } from './complaint.entity';
  import { User } from './user.entity';
  
  @Entity('complaint_updates')
  export class ComplaintUpdate extends EntityModel {
    @PrimaryGeneratedColumn()
    update_id: number;
  
    @ManyToOne(() => Complaint, (complaint) => complaint.updates)
    @JoinColumn({ name: 'complaint_id' })
    complaint: Complaint;
  
    @Column()
    complaint_id: number;
  
    @Column()
    status_change: string;
  
    @Column({ type: 'text', nullable: true })
    comment: string;
  
    @ManyToOne(() => User, (user) => user.complaint_updates)
    @JoinColumn({ name: 'created_by' })
    created_by: User;
  
    @Column()
    created_by_id: number;
  }