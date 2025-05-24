import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, plainToInstance, Type } from 'class-transformer';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { CurrencyEntity } from 'src/modules/currency/entities/currency.entity';
import { GoalEntity } from 'src/modules/goal/entities/goal.entity';
import { BalanceEntity } from 'src/modules/transaction/entities/balance.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { WalletEntity } from 'src/modules/transaction/entities/wallet.entity';
import { UserEntity } from '../entities/user.entity';

export class UserResponseDto {
  @ApiProperty({ description: 'The unique identifier for the user' })
  id: string;
  
  @ApiProperty({ description: 'The email address of the user' })
  email: string;
  
  @ApiProperty({ description: 'The username of the user' })
  username: string | null;
  
  @Exclude()
  @ApiProperty({ description: 'The hashed password of the user' })
  passwordHash: string | null;
  
  @ApiProperty({ description: 'The budget of the user' })
  budget: number;
  
  @ApiProperty({ description: 'The balance of the user' })
  @Type(() => BalanceEntity)
  balance?: BalanceEntity;
  
  @ApiProperty({ description: 'The wallets of the user' })
  @Type(() => WalletEntity)
  wallets?: WalletEntity[];
  
  @ApiProperty({ description: 'The date and time the user was created' })
  createdAt: Date;
  
  @ApiProperty({ description: 'The date and time the user was updated' })
  updatedAt: Date;
  
  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  } 
  
  fromEntity(entity: UserEntity): UserResponseDto {
    return plainToInstance(UserResponseDto, entity, {
      excludeExtraneousValues: true,
    });
  }

} 