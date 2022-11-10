import {
  Body,
  Controller, Delete,
  Get,
  HttpCode, Param,
  Post,
  Put,
  Request,
  Res,
  UnauthorizedException, UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import {Types} from 'mongoose';
import {get} from 'lodash';
import {UserService} from '../services/User';
import {UpdateProfileDto, UpdateProfilePhotoAddDto} from '../dto/Profile';
import {Authorized} from '../decorators/auth';
import {UserEmail, UserId} from '../decorators/user';
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiTags} from '@nestjs/swagger';
import {FileInterceptor} from "@nestjs/platform-express";

@ApiTags('web', 'ios')
@Controller('/api/rest/profile')
export class ProfileController {
  constructor(
    public service: UserService
  ) {
  }

  @ApiBearerAuth('bearer-sid')
  @ApiOperation({summary: 'get profile'})
  @Get()
  @HttpCode(200)
  async me(
    @Request() req: any,
    @Res() res: any,
    @UserId() id?: Types.ObjectId,
    @UserEmail() email?: string
  ) {
    const isAdminRequest = String(get(req, 'headers.referer', '')).match(/\/admin($|\/)/);
    if(!id && !isAdminRequest) {
      throw new UnauthorizedException();
    } else if(!id && isAdminRequest) {
      return res.send({user: null});
    }
    const user = await this.service.findByIdOrEmail(id, email);
    if(!user) {
      if(!isAdminRequest) {
        throw new UnauthorizedException();
      }
      try {
        await new Promise(resolve => {
          req.session.destroy(() => resolve(true));
        });
      } catch(err) {
        console.error(err.message);
        //
      }
    }
    return res.send(isAdminRequest && user ? {
      user: {
        ...(user as any),
        collection: 'user',
        _strategy: 'jwt',
      }
    } : user);
  }

  @ApiBearerAuth('bearer-sid')
  @ApiOperation({summary: 'update profile'})
  @Authorized()
  @Put()
  async update(
    @UserId() id: Types.ObjectId,
    @Body() args: UpdateProfileDto,
    @UploadedFile() photo) {
    return this.service.findByIdAndUpdate(id, args);
  }

  @ApiBearerAuth('bearer-sid')
  @ApiOperation({summary: 'add photo to profile'})
  @Authorized()
  @Post('photo/add')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fieldNameSize: 100,
        fieldSize: 1000000,
        fields: 20,
        fileSize: 5000000,
        files: 1,
        headerPairs: 2000
      }
    })
  )
  @ApiConsumes('multipart/form-data')
  async updatePhotoAdd(
    @Request() request: any,
    @UserId() id: Types.ObjectId,
    @Body() args: UpdateProfilePhotoAddDto,
    @UploadedFile('file') file) {
    return this.service.findByIdAndAddPhoto(id, {file});
  }

  @ApiBearerAuth('bearer-sid')
  @ApiOperation({summary: 'delete photo by id from profile'})
  @Authorized()
  @Delete('photo/delete/:id')
  @ApiParam({
    name: 'id',
    type: String
  })
  async updatePhotoDelete(
    @UserId() userId: Types.ObjectId,
    @Param('id') id: Types.ObjectId) {
    return this.service.findByIdAndDeletePhoto(userId, id);
  }

  @ApiBearerAuth('bearer-sid')
  @ApiOperation({summary: 'delete user profile'})
  @Authorized()
  @Delete('delete')
  async profileDelete(
    @Request() request: any,
    @UserId() userId: Types.ObjectId,
    @Param('id') id: Types.ObjectId) {
    return this.service.findByIdAndDelete(userId);
  }
}
