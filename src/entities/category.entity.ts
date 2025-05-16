import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
  } from 'typeorm';
  import { EntityModel } from './entity.model';
  import { Agency } from './agency.entity';
  import { Complaint } from './complaint.entity';
  
  @Entity('categories')
  export class Category extends EntityModel {
    @PrimaryGeneratedColumn()
    category_id: number;
  
    @Column()
    name: string;
  
    @Column({ type: 'text', nullable: true })
    description: string;
  
    @ManyToOne(() => Agency, (agency) => agency.categories, { nullable: true })
    @JoinColumn({ name: 'agency_id' })
    agency: Agency;
  
    @Column({ nullable: true })
    agency_id: number;
  
    @OneToMany(() => Complaint, (complaint) => complaint.category)
    complaints: Complaint[];
  }