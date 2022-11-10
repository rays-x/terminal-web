import {IsEmail,IsOptional,IsString} from 'class-validator';
import {ApiPropertyOptional}                  from '@nestjs/swagger';

export class CreateIssueDto{
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly name?: string;
  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional()
  readonly email?: string;
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly phone?: string;
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly message?: string;
}
