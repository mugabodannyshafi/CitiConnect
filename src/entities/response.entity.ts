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
  
  @Entity('responses')
  export class Response extends EntityModel {
    @PrimaryGeneratedColumn()
    response_id: number;
    
    @ManyToOne(() => Complaint, (complaint) => complaint.responses)
    @JoinColumn({ name: 'complaint_id' })
    complaint: Complaint;
  
    @Column()
    complaint_id: number;
  
    @Column({ type: 'text' })
    response_text: string;
  
    @ManyToOne(() => User, (user) => user.responses)
    @JoinColumn({ name: 'responded_by' })
    responded_by: User;
  
    @Column()
    responded_by_id: number;
  }