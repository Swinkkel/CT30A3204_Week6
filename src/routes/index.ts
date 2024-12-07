import {Request, Response, Router} from "express"
import { compile } from "morgan"
import {Image, IImage} from "../models/Image"
import {Offer, IOffer} from "../models/Offer"
import upload from "../middleware/multer-config"


const router: Router = Router()

router.post("/upload", upload.single("image"), async (req: Request, res: Response) => {
    try {
        const { title, description, price } = req.body;

        const newOffer: IOffer = new Offer({
            title,
            description,
            price
        });
    
        await newOffer.save();
/*
        if (!req.file) {
            res.status(400).json({message: "No file uploaded"})
            return
        }

        const imgPath: string = req.file.path.replace("public", "")

        const image: IImage = new Image({
            filename: req.file.filename,
            description: req.body.description,
            path: imgPath
        })
        await image.save()
        console.log("File uploaded and saved in the database")
        res.status(201).json({message: "File uploaded and saved in the database"})
        return
*/
    } catch(error: any) {
        console.error(`Error while uploading file: ${error}`)
        res.status(500).json({message: 'Internal server error'})
        return
    }
 })

export default router