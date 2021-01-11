import { Controller, Get, HttpStatus, Param, Post, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "./config";

//post file specific file
@Controller()
export class UploadController {
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', multerOptions))
    async uploadFile(@UploadedFiles() file) {
        console.log(file)

    }
    //get specific file
    // @Get(':filePath')
    // seeuploadedfile(@Param('filePath')file,
    // @Res() res) {
    //     return res.sendFile(file, {
    //         root:'./uploads'
    //     });
    // }
}