import multer, {StorageEngine, Multer} from "multer"
import path from 'path'
import fs from "fs"
import { v4 as uuidv4 } from 'uuid';

// Ensure the 'public/images' folder exists or create it
const dir = './public/images';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const storage: StorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("Dest function");
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        console.log("filename function");
        const originalFilename = path.parse(file.originalname).name;
        const extension = path.extname(file.originalname);
        const id = uuidv4()
        const filename = `${originalFilename}_${id}${extension}`;
        cb(null, filename);        
    }
  })
  
  const upload: Multer = multer({ storage: storage })

  export default upload