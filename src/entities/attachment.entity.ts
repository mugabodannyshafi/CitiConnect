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
  
  @Entity('attachments')
  export class Attachment extends EntityModel {
    @PrimaryGeneratedColumn()
    attachment_id: number;
  
    @ManyToOne(() => Complaint, (complaint) => complaint.attachments)
    @JoinColumn({ name: 'complaint_id' })
    complaint: Complaint;
  
    @Column()
    complaint_id: number;
  
    @Column()
    file_name: string;
  
    @Column()
    file_path: string;
  
    @Column()
    file_type: string;
  
    @Column({ type: 'int' })
    file_size: number;

    @ManyToOne(() => User, (user) => user.attachments)
    @JoinColumn({ name: 'uploaded_by' })
    uploaded_by: User;
  
    @Column()
    uploaded_by_id: number;
  }