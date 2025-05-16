import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
  } from 'typeorm';
  import { EntityModel } from './entity.model';
  import { User } from './user.entity';
  import { Category } from './category.entity';
  import { Agency } from './agency.entity';
  import { ComplaintUpdate } from './complaint-update.entity';
  import { Attachment } from './attachment.entity';
  import { Response } from './response.entity';
  import { Notification } from './notification.entity';
import { ComplaintStatus } from 'src/enums/complaint-status.enum';
import { ComplaintPriority } from 'src/enums/complaint-priority.enum';
  
  @Entity('complaints')
  export class Complaint extends EntityModel {
    @PrimaryGeneratedColumn()
    complaint_id: number;
  
    @Column()
    title: string;
  
    @Column({ type: 'text' })
    description: string;
  
    @Column({ nullable: true, type: 'text' })
    location: string;
  
    @ManyToOne(() => User, (user) => user.complaints)
    @JoinColumn({ name: 'submitted_by' })
    submitted_by: User;
  
    @Column()
    submitted_by_id: number;

    @ManyToOne(() => Category, (category) => category.complaints)
    @JoinColumn({ name: 'category_id' })
    category: Category;
  
    @Column()
    category_id: number;
  
    @ManyToOne(() => Agency, (agency) => agency.complaints, { nullable: true })
    @JoinColumn({ name: 'assigned_agency_id' })
    assigned_agency: Agency;
  
    @Column({ nullable: true })
    assigned_agency_id: number;
  
    @Column({
      type: 'enum',
      enum: ComplaintStatus,
      default: ComplaintStatus.NEW,
    })
    status: ComplaintStatus;
  
    @Column({
      type: 'enum',
      enum: ComplaintPriority,
      default: ComplaintPriority.MEDIUM,
    })
    priority: ComplaintPriority;
  
    @Column({ nullable: true, type: 'int' })
    resolved_at: number;
  
    @OneToMany(() => ComplaintUpdate, (update) => update.complaint)
    updates: ComplaintUpdate[];
  
    @OneToMany(() => Attachment, (attachment) => attachment.complaint)
    attachments: Attachment[];
  
    @OneToMany(() => Response, (response) => response.complaint)
    responses: Response[];
  
    @OneToMany(() => Notification, (notification) => notification.related_complaint)
    notifications: Notification[];
  }