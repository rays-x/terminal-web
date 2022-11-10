import {
  All,
  Controller,
  Get,
  Head,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';

import {TusService} from '../services/Tus';

@ApiTags('web', 'ios')
@Controller('/api/rest/file')
export class FileUploadController {
  constructor(
    private tusService: TusService,
  ) {
  }

  @ApiBearerAuth('bearer-sid')
  @ApiOperation({summary: 'create empty file with provided name'})
  @Post('/')
  @ApiResponse({
    status: 201,
    description: '<a href="https://tus.io">tus.io</a>'
  })
  async tusPost(@Req() req, @Res() res) {
    res.header('cache-control', 'private')
    return this.tusService.handleTus(req, res);
  }

  @ApiBearerAuth('bearer-sid')
  @ApiOperation({summary: 'get file'})
  @Get('*')
  @ApiResponse({
    status: 200,
    description: '<a href="https://tus.io">tus.io</a>'
  })
  async tusGet(@Req() req, @Res() res) {
    res.header('cache-control', 'private')
    return this.tusService.handleTus(req, res);
  }

  @ApiBearerAuth('bearer-sid')
  @ApiOperation({summary: 'request if file exist'})
  @Head('*')
  @ApiResponse({
    status: 200,
    description: '<a href="https://tus.io">tus.io</a>'
  })
  async tusHead(@Req() req, @Res() res) {
    res.header('cache-control', 'private')
    return this.tusService.handleTus(req, res);
  }

  @ApiBearerAuth('bearer-sid')
  @ApiOperation({summary: 'upload chink of file'})
  @Patch('*')
  @ApiResponse({
    status: 200,
    description: '<a href="https://tus.io">tus.io</a>'
  })
  async tusPatch(@Req() req, @Res() res) {
    res.header('cache-control', 'private')
    return this.tusService.handleTus(req, res);
  }
}