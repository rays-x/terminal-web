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
import {PageService} from "../services/Page";

@ApiTags('web')
@Controller('/api/rest')
export class PageController {
  constructor(
    private readonly pageService: PageService
  ) {
  }

  @ApiOperation({summary: 'get page by slug'})
  @Get('page/:slug')
  @HttpCode(200)
  @ApiParam({
    name: 'slug',
    required: true,
    type: String
  })
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: Languages
  })
  async web(
    @Param('slug') slug,
    @Language() lang: Languages = Languages.EN,
    @Query('lang') _lang?: Languages,
  ) {
    const __lang = Object.values(Languages).includes(_lang || lang) ? _lang || lang : lang
    return this.pageService.get(slug, __lang);
  }
}
