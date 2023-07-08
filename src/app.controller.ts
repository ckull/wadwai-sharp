import { Controller, Get, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import * as sharp from 'sharp'
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, response } from 'express';
import { rgb2cmyk } from './utils';
import * as gm from 'gm'
import { buffer } from 'stream/consumers';
import { error } from 'console';
import * as fs from 'fs'

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

      console.log('metadata: ', metadata)
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
      // .png()
      .toFormat('png')
      .withMetadata({
        icc: './USWebCoatedSWOP.icc'
      })
     
      .toBuffer()

      console.log('img: ', image)

      res.setHeader('Content-Type', 'image/png'); // Replace 'image/jpeg' with the correct content type for your image

      // Send the buffer as the response
      res.end(image);
 
      // const img = gm(file.buffer)
      // .profile(profilePath).toBuffer('png', (err, buffer) => {
      //   if(err) {
      //     console.error('err: ', err)
      //   }

      //   console.log('done: ', buffer)
      // })


      // console.log('img: ', img)
      // .toBuffer('png', (err, imageBuffer) => {
      //   if(err) {
      //     throw new Error(err)
      //   }

      //   console.log('imageBuffer: ', imageBuffer)
      //   const base64Image = imageBuffer.toString('base64')

      //   const dataURL = `data:image/png;base64,${base64Image}`;
      //    res.setHeader('Content-Type', 'application/json');
      //    res.end(JSON.stringify({dataURL}));
      // })

    
    } catch (error) {
      throw new Error(error);
    }
  }
}
