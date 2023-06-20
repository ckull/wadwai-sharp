import { Controller, Get, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import * as sharp from 'sharp'
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/upscale')
  @UseInterceptors(FileInterceptor('file'))
  public async upscaleImage(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response
  ) {
    console.log(file)
    const {width, height} = await sharp(file.buffer).metadata()
    console.log(width)
    console.log(height)
    const resizeImage = await sharp(file.buffer)
      .resize(width * 2, height * 2, {
        kernel: "cubic",
      })
      .toBuffer();
    console.log(resizeImage)
    res.setHeader('Content-Type', 'image/png'); // Replace 'image/jpeg' with the correct content type for your image

    // Send the buffer as the response
    res.end(resizeImage);
  }
}
