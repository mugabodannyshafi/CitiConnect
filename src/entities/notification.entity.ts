import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { EntityModel } from './entity.model';
  import { User } from './user.entity';
  import { Complaint } from './complaint.entity';
  
  @Entity('notifications')
  export class Notification extends EntityModel {
    @PrimaryGeneratedColumn()
    notification_id: number;
  
    @ManyToOne(() => User, (user) => user.notifications)
    @JoinColumn({ name: 'user_id' })
    user: User;
    
    @Column()
    user_id: number;
  
    @Column({ type: 'text' })
    message: string;
  
    @ManyToOne(() => Complaint, (complaint) => complaint.notifications, { nullable: true })
    @JoinColumn({ name: 'related_complaint_id' })
    related_complaint: Complaint;
  
    @Column({ nullable: true })
    related_complaint_id: number;
  
    @Column({ default: false })
    is_read: boolean;
  }