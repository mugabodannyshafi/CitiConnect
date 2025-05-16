import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { EntityModel } from './entity.model';
import { Complaint } from './complaint.entity';
import { AgencyStaff } from './agency-staff.entity';
import { ComplaintUpdate } from './complaint-update.entity';
import { Response } from './response.entity';
import { Attachment } from './attachment.entity';
import { Notification } from './notification.entity';
import { UserRole } from 'src/enums/user-role.enum';

@Entity('users')
export class User extends EntityModel {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true, type: 'text' })
  address: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CITIZEN,
  })
  role: UserRole;

  @OneToMany(() => Complaint, (complaint) => complaint.submitted_by)
  complaints: Complaint[];

  @OneToMany(() => AgencyStaff, (staff) => staff.user)
  agency_roles: AgencyStaff[];

  @OneToMany(() => ComplaintUpdate, (update) => update.created_by)
  complaint_updates: ComplaintUpdate[];

  @OneToMany(() => Response, (response) => response.responded_by)
  responses: Response[];

  @OneToMany(() => Attachment, (attachment) => attachment.uploaded_by)
  attachments: Attachment[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
}