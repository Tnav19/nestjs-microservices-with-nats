import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { Payment } from './typeorm/entities/Payment';

@Module({
  imports: [
TypeOrmModule.forRoot({
  type: 'postgres',
  url: 'postgresql://postgres.vkchvpaztkdqtmjurvxz:mmW5G.h!_c7DfHq@aws-0-ap-south-1.pooler.supabase.com:6543/postgres',
  entities: [Payment, User],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,  // Use SSL with Supabase
  },
}),

    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
