import { mongooseConnect } from "@/lib/mongoose";
import { Review } from "@/modals/Review";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handle(req, res) {
    await mongooseConnect();
    const { user } = await getServerSession(req, res, authOptions);
    const userData = user?.email;

    
    if (req.method === 'POST') { 
        const {title, review, rating, productId} = req.body;
        console.log(title, review, rating, productId)
        
            const test = await Review.create({
                productId, 
                user: userData,
                rating,
                title,
                review
            })
            console.log(test)
            res.json({message: "Review created successfully"})        
    }

    if (req.method === 'GET') {
        const {productId} = req.query;
        try {
            const reviews = await Review.find({productId}).sort({createdAt: -1});
            res.json(reviews)
        } catch {
            res.status(500).json({error: "Something went wrong"})
        }
    }

 }