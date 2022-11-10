import {IsBoolean,IsEmail,IsOptional,IsString,Matches,MaxLength,MinLength} from 'class-validator';
import {ApiProperty,ApiPropertyOptional}                         from '@nestjs/swagger';

export class AuthSignInDto{
  @IsString()
  @MaxLength(256)
  @ApiProperty({required:true})
  readonly login!: string;
  @IsString()
  @ApiProperty({required:true})
  readonly password!: string;
}

export class PayloadSignInDto{
  @IsEmail()
  @MaxLength(256)
  @ApiProperty({required:true})
  readonly email!: string;
  @IsString()
  @ApiProperty({required:true})
  readonly password!: string;
}

export class AuthSignUpDto{
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly firstName?: string;
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly lastName?: string;
  @IsString()
  @MinLength(3)
  @MaxLength(24)
  @Matches(/^(?=.{3,24}$)[a-zA-Z0-9_.-]+$/)
  @ApiProperty({required:true})
  readonly username!: string;
  @IsEmail()
  @ApiProperty({required:true})
  readonly email!: string;
  @IsString()
  @MinLength(6)
  @ApiProperty({required:true})
  readonly password!: string;
  @IsOptional()
  @IsString()
  @MaxLength(256)
  @ApiPropertyOptional()
  readonly phone?: string;
  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  readonly consent?: boolean;
}

export class AuthRecoverDto{
  @IsString()
  @MaxLength(256)
  @ApiProperty({required:true})
  readonly login?: string;
}
