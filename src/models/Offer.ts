import mongoose, { Document, Schema, model } from 'mongoose';

interface IOffer extends Document {
    title: string;
    description: string;
    price: number;
    imageId: string;
}

const offerSchema = new Schema<IOffer>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageId: {type: String}
});

const Offer: mongoose.Model<IOffer> = model<IOffer>("Offer", offerSchema)

export {Offer, IOffer}