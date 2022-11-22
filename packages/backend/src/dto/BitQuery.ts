import {IsArray, IsEnum, IsNumberString, IsOptional, IsString} from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export class QueryStatsTransferDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  btcAddress?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  ethAddress?: string;
}