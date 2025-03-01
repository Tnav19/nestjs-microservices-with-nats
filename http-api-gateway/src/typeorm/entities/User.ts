import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Payment } from './Payment';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    description: 'The unique identifier of the User',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'john_doe',
    description: 'The username of the User',
  })
  @Column({ nullable: false })
  username: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the User',
  })
  @Column({ nullable: false })
  email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The display name of the User (optional)',
    required: false,
  })
  @Column({ nullable: true })
  displayName?: string;

  @ApiProperty({
    description: 'The list of payments made by the User',
    type: () => [Payment], // Define the type as an array of Payment entities
  })
  @OneToMany(() => Payment, (payment) => payment.user)
  @JoinColumn()
  payments: Payment[];
}
