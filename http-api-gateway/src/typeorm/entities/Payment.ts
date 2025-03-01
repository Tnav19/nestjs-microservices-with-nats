import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity({ name: 'payments' })
export class Payment {
  @ApiProperty({
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    description: 'The unique identifier of the payment',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 150.5,
    description: 'The amount of the payment',
  })
  @Column('float')
  amount: number;

  @ApiProperty({
    description: 'The user who made the payment',
    type: () => User,  // Swagger will understand that this is a relationship to the User entity
  })
  @ManyToOne(() => User, (user) => user.payments)
  user: User;
}
