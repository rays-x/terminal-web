import {
  Body,
  Controller, Get, Param,
  Post, Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiProperty, ApiPropertyOptional,
  ApiQuery,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import {Authorized} from "../decorators/auth";
import {Language, UserId} from "../decorators/user";
import {Types} from "mongoose";
import {FeedService} from "../services/Feed";
import {Languages} from "../entities/User";
import {FeedActionDto, FeedResponseDto} from "../dto/Feed";
import {ChatDto} from "../dto/Chat";

class FeedActionResponseDto {
  @ApiProperty()
  readonly isMatched!: boolean
  @ApiPropertyOptional({nullable: true})
  readonly chat?: ChatDto
}


@ApiTags('ios')
@Controller('/api/rest/feed')
export class FeedController {
  constructor(
    public service: FeedService
  ) {
  }

  @ApiOperation({summary: 'get feed'})
  @ApiBearerAuth('bearer-sid')
  @Get()
  @Authorized()
  @ApiResponse({
    type: FeedResponseDto
  })
  async feed(
    @UserId() userId: Types.ObjectId,
  ) {
    return this.service.feed(userId);
  }

  @ApiOperation({summary: 'action of feed item'})
  @ApiBearerAuth('bearer-sid')
  @Post('action')
  @Authorized()
  @ApiResponse({
    type: FeedActionResponseDto
  })
  async feedAction(
    @UserId() userId: Types.ObjectId,
    @Body() {id: target, type}: FeedActionDto,
  ) {
    return this.service.feedAction(userId, target, type)
  }
}
