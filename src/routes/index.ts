import {Request, Response, Router} from "express"
import { compile } from "morgan"
import {Image, IImage} from "../models/Image"
import {Offer, IOffer} from "../models/Offer"
import upload from "../middleware/multer-config"


const router: Router = Router()

router.post("/upload", upload.single("image"), async (req: Request, res: Response) => {
    try {
        const { title, description, price } = req.body;

        console.log("Title: ", title)
        console.log("Description: ", description)
        console.log("Price: ", price)
        console.log("File: ", req.file)

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

            const savedImage = await newImage.save();
            newOffer.imageId = savedImage._id.toString();
        }

        await newOffer.save();
        res.status(201).send({ message: 'Offer created successfully' });
    } catch(error: any) {
        console.error(`Error while uploading file: ${error}`)
        res.status(500).json({message: 'Internal server error'})
        return
    }
 })

router.get("/offers", async (req: Request, res: Response) => {
    try {
        const offers: IOffer[] | null = await Offer.find()
        if (!offers) {
            res.status(404).json({message: 'No offers found'})
            return
        }

        const results = await Promise.all(
            offers.map(async (offer) => {
                const image = offer.imageId
                    ? await Image.findById(offer.imageId)
                    : null;
                return {
                    title: offer.title,
                    description: offer.description,
                    price: offer.price,
                    imagePath: image ? image.path : null
                };
            })
        );

        res.json(results);
    } catch (error: any) {
        console.error(`Error while fetching a file: ${error}`)
        res.status(500).json({message: 'Internal server error'})
        return
    }
})

export default router