import {Controller, Get, HttpCode} from '@nestjs/common';
import {ApiExcludeEndpoint, ApiTags} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('/api/rest')
export class PayloadController {
  constructor() {
  }

  @ApiExcludeEndpoint(process.env.ENV !== 'development')
  @Get('user/init')
  @HttpCode(200)
  async init() {
    return {
      initialized: true
    };
  }

}
