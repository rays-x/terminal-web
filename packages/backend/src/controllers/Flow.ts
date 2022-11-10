import {
  Controller,
  Get,
  HttpCode, Param, Query
} from '@nestjs/common';
import {ApiOperation, ApiParam, ApiQuery, ApiTags} from '@nestjs/swagger';
import {FlowService} from '../services/Flow';
import {Language} from '../decorators/user';
import {Languages} from '../entities/User';
import {FlowDtoType} from "../dto/Flow";

@ApiTags('web', 'ios')
@Controller('/api/rest')
export class FlowController {
  constructor(
    private readonly flowService: FlowService
  ) {
  }

  @ApiOperation({summary: 'get flow by type'})
  @Get('flow/:type')
  @HttpCode(200)
  @ApiParam({
    name: 'type',
    required: true,
    enum: FlowDtoType
  })
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: Languages
  })
  async web(
    @Param('type') type: string = 'web',
    @Language() lang: Languages = Languages.EN,
    @Query('lang') _lang?: Languages,
  ) {
    const __lang = Object.values(Languages).includes(_lang || lang) ? _lang || lang : lang
    return this.flowService.get(type, __lang);
  }
}
