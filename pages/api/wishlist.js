import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { WishedProduct } from "@/modals/WishedProducts";

export default async function handle(req, res) {
  await mongooseConnect();
  const { user } = await getServerSession(req, res, authOptions);

  switch (req.method) {
    case "GET":
      res.json(
        await WishedProduct.find({
          userEmail: user.email,
        }).populate("product")
      )  

      break;
    case "POST":
      // Handle POST request

      const { product } = req.body;
      const wishedDoc = await WishedProduct.findOne({
        userEmail: user.email,
        product,
      });
      if (wishedDoc) {
        await WishedProduct.findByIdAndDelete(wishedDoc._id);
        res.json("deleted successfully");
      } else {
        await WishedProduct.create({
          userEmail: user.email,
          product,
        });
        res.json("Product Was wished successfully");
      }

      break;
    case "PUT":
      // Handle PUT request
      break;
    case "DELETE":
      // Handle DELETE request
      break;
    default:
      res.status(405).end(); // Method not allowed
      break;
  }
}
