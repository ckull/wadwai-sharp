import {
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import * as sharp from 'sharp';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, response } from 'express';
import { rgb2cmyk } from './utils';
import * as gm from 'gm';
import { buffer } from 'stream/consumers';
import { error } from 'console';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/metadata')
  @UseInterceptors(FileInterceptor('file'))
  public async metadata(@UploadedFile() file: Express.Multer.File) {
    try {
      console.log(file);

      const metadata = await sharp(file.buffer).metadata();

      return metadata;
    } catch (error) {
      console.error('Error extracting metadata:', error);
      throw new Error('Failed to extract metadata');
    }
  }

  //@ts-ignore
  @Post('/process')
  @UseInterceptors(FileInterceptor('file'))
  public async process(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const image = await sharp(file.buffer)
        .toFormat('jpg')
        .withMetadata({
          icc: './USWebCoatedSWOP.icc',
        })
        .toBuffer();

      res.setHeader('Content-Type', 'image/png');

      res.end(image);
    } catch (error) {
      throw new Error(error);
    }
  }
}
