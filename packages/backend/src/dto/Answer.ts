import {IsEnum, IsMongoId, IsOptional, IsString} from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {Types} from 'mongoose';

enum AnswerDtoType {
  quiz = 'quiz',
  breakdown = 'breakdown',
  quiz_user_data = 'quiz_user_data',
}

enum AnswerDtoKey {
  photo = 'photo',
  birthday = 'birthday',
  sex = 'sex',
  lookingForSex = 'lookingForSex',
  lookingForAge = 'lookingForAge',
  name = 'name',
  email = 'email',
  purpose = 'purpose',
}

export class AnswerDto {
  @IsEnum(AnswerDtoType)
  @ApiProperty({
    enum: AnswerDtoType
  })
  readonly type!: AnswerDtoType;
  @IsOptional()
  @IsEnum(AnswerDtoKey)
  @ApiPropertyOptional({
    enum: AnswerDtoKey
  })
  readonly key?: AnswerDtoKey;
  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({type: String})
  readonly identifier?: Types.ObjectId;
  @IsString()
  @ApiProperty()
  value: string;
}