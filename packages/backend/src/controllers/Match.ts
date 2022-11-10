import {
  Body,
  Controller, Delete, Get, Param,
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

@ApiTags('ios-temp')
@Controller('/api/rest/matches')
export class MatchController {
  constructor(
    public service: FeedService
  ) {
  }

  @ApiOperation({summary: 'delete matches'})
  @ApiBearerAuth('bearer-sid')
  @Delete()
  @Authorized()
  async delete(
    @UserId() userId: Types.ObjectId,
  ) {
    return this.service.deleteMatches(userId);
  }
}
