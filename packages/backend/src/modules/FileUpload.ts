import { Module } from '@nestjs/common';
import { FileUploadController } from '../controllers/FileUpload';
import { TusService } from '../services/Tus';

@Module({
  controllers: [FileUploadController],
  providers: [
    TusService,
  ],
})
export class FileUploadModule {}