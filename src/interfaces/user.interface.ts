import { UserRole } from 'src/enums/user-role.enum';
import { Complaint } from '../entities/complaint.entity';
import { AgencyStaff } from '../entities/agency-staff.entity';
import { ComplaintUpdate } from '../entities/complaint-update.entity';
import { Response } from '../entities/response.entity';
import { Attachment } from '../entities/attachment.entity';
import { Notification } from '../entities/notification.entity';

export interface UserData {
  user_id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  address?: string;
  role: UserRole;
  complaints?: Complaint[];
  agency_roles?: AgencyStaff[];
  complaint_updates?: ComplaintUpdate[];
  responses?: Response[];
  attachments?: Attachment[];
  notifications?: Notification[];
}
