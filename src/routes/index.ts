import {Request, Response, Router} from "express"
import { compile } from "morgan"
import {Image, IImage} from "../models/Image"
import {Offer, IOffer} from "../models/Offer"
import upload from "../middleware/multer-config"


const router: Router = Router()

router.post("/upload", upload.single("image"), async (req: Request, res: Response) => {
    try {
        const { title, description, price } = req.body;

        console.log("Title: ", title);
        console.log("Description: ", description);
        console.log("Price: ", price);

        const newOffer: IOffer = new Offer({
            title,
            description,
            price
        });
    
        // Save the image if present
        if (req.file) {
            const newImage = new Image({
                filename: req.file.filename,
                path: `/images/${req.file.filename}`
            });

            await newImage.save();
            newOffer.imageId = newImage.id;
        }

        await newOffer.save();
        res.status(201).send({ message: 'Offer created successfully' });
    } catch(error: any) {
        console.error(`Error while uploading file: ${error}`)
        res.status(500).json({message: 'Internal server error'})
        return
    }
 })

export default router