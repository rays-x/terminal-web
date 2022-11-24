import {IsArray, IsEnum, IsNumberString, IsOptional, IsString} from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export class QueryStatsLiquidityDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  btcAddress?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  ethAddress?: string;
}