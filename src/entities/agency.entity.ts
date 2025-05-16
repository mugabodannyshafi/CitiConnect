import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from 'typeorm';
  import { EntityModel } from './entity.model';
  import { Category } from './category.entity';
  import { Complaint } from './complaint.entity';
  import { AgencyStaff } from './agency-staff.entity';
  
  @Entity('agencies')
  export class Agency extends EntityModel {
    @PrimaryGeneratedColumn()
    agency_id: number;
  
    @Column()
    name: string;
  
    @Column({ type: 'text', nullable: true })
    description: string;
  
    @Column()
    contact_email: string;
  
    @Column({ nullable: true })
    contact_phone: string;
  
    @Column({ nullable: true })
    jurisdiction: string;
  
    @OneToMany(() => Category, (category) => category.agency)
    categories: Category[];
  
    @OneToMany(() => Complaint, (complaint) => complaint.assigned_agency)
    complaints: Complaint[];
  
    @OneToMany(() => AgencyStaff, (staff) => staff.agency)
    staff_members: AgencyStaff[];
  }