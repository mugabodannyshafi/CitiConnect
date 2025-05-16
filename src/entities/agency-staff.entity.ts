import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EntityModel } from './entity.model';
import { User } from './user.entity';
import { Agency } from './agency.entity';
import { StaffRole } from 'src/enums/staff.enum';

@Entity('agency_staff')
export class AgencyStaff extends EntityModel {
  @PrimaryGeneratedColumn()
  staff_id: number;

  @ManyToOne(() => User, (user) => user.agency_roles)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: number;

  @ManyToOne(() => Agency, (agency) => agency.staff_members)
  @JoinColumn({ name: 'agency_id' })
  agency: Agency;

  @Column()
  agency_id: number;

  @Column({
    type: 'enum',
    enum: StaffRole,
    default: StaffRole.STAFF,
  })
  role: StaffRole;
}