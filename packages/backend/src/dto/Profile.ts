import {
  ArrayMaxSize,
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  IsEnum, IsBoolean
} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {Languages} from '../entities/User';

export class UpdateProfileDto {
  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional()
  readonly email?: string;
  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    type: Boolean
  })
  readonly hasFinishedQuiz?: boolean;
  @IsOptional()
  @IsString()
  @MaxLength(256)
  @ApiPropertyOptional({required: true})
  readonly name?: string;
  @IsOptional()
  @IsEnum(Languages)
  @ApiPropertyOptional({
    enum: Languages
  })
  readonly language?: Languages.EN | Languages.RU;
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(120)
  @MaxLength(5, {
    each: true
  })
  @IsString({each: true})
  @ApiPropertyOptional({
    type: 'string',
    isArray: true,
    default: []
  })
  readonly providersSafe?: string[];
}

export class UpdateProfilePhotoAddDto {
  @IsOptional()
  @ApiPropertyOptional({
    type: 'file',
    format: 'binary'
  })
  readonly file?: any;
}
