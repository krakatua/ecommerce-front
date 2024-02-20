import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Order } from "@/modals/Order";

export default async function handle( req, res) {
    await mongooseConnect();
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        return res.status(401).send("Unauthorized");
    }

    res.json(
       await  Order.find({ email: session?.user?.email }).sort({ createdAt: -1 })
    )

}