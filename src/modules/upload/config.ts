import { HttpException, HttpStatus } from "@nestjs/common"
import { v4 as uuid } from 'uuid'
import { extname } from "path"
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from 'multer'
export const multerConfig = {
    dest: './uploads'
}

function uuidRandom(file) {
    const result = '${uuid()}${extname(file.originalname)}';
    return result;
}


export const multerOptions = {
    fileFilter: (req: any, file: any, cb: any) => {
        //to match the file type
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            cb(null, true) //allow storage file
            console.log(file, 'success')
        }
        else {
            cb(new HttpException('Unsupported file type ${extname(file.originalname)}', HttpStatus.BAD_REQUEST), false);
        }
    },
    //storage path details
    storage: diskStorage({
        destination: (req: any, file: any, cb: any) => {
            const uploadPath = multerConfig.dest
            if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath)
            }
            cb(null, uploadPath)
        },

        filename: (req: any, file: any, cb: any) => {
            cb(null, uuidRandom(file));
        }
    })
}
