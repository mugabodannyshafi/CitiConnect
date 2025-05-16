import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { Agency } from '../entities/agency.entity';
import { Category } from '../entities/category.entity';
import { Complaint } from '../entities/complaint.entity';
import { ComplaintUpdate } from '../entities/complaint-update.entity';
import { Attachment } from '../entities/attachment.entity';
import { AgencyStaff } from '../entities/agency-staff.entity';
import { Response } from '../entities/response.entity';
import { Notification } from '../entities/notification.entity';
import { Setting } from '../entities/setting.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [
          User,
          Agency,
          Category,
          Complaint,
          ComplaintUpdate,
          Attachment,
          AgencyStaff,
          Response,
          Notification,
          Setting
        ],
        synchronize: configService.get('NODE_ENV') !== 'production',
      }),
    }),
    TypeOrmModule.forFeature([
      User,
      Agency,
      Category,
      Complaint,
      ComplaintUpdate,
      Attachment,
      AgencyStaff,
      Response,
      Notification,
      Setting
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}