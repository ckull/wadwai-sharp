import { Controller, Get, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import * as sharp from 'sharp'
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, response } from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/metadata')
  @UseInterceptors(FileInterceptor('file'))
  public async metadata(
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      console.log(file);
  
      const metadata = await sharp(file.buffer).metadata();
  
      return metadata;
    } catch (error) {
      console.error('Error extracting metadata:', error);
      throw new Error('Failed to extract metadata');
    }
  }
}
