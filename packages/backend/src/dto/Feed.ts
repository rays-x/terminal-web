import {
  IsEnum,
  IsMongoId,
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {Types} from "mongoose";

export enum FeedActionType {
  like = 'like',
  dislike = 'dislike',
}

export class FeedResponseDto {
  @ApiProperty({type: String})
  readonly id!: Types.ObjectId
  @ApiProperty()
  readonly name!: string
  @ApiProperty()
  readonly age!: number
  @ApiProperty()
  readonly matchPercentString!: string
  @ApiProperty()
  readonly imageUrl!: string
}

export class FeedActionDto {
  @IsMongoId()
  @ApiProperty({
    type: String,
  })
  readonly id!: Types.ObjectId
  @IsEnum(FeedActionType)
  @ApiProperty({
    enum: FeedActionType,
  })
  readonly type!: FeedActionType;
}
