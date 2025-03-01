import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    example: 150.5,
    description: 'The amount of the payment',
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: 'a1f5a3dc-1e7a-4a5c-9d6f-8b40168eb97b',
    description: 'The ID of the user making the payment',
  })
  @IsNotEmpty()
  userId: string;
}
