import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Address } from "@/modals/Address";

export default async function handle(req, res) {
  await mongooseConnect();
  const { user } = await getServerSession(req, res, authOptions);

  switch (req.method) {
    case "GET":
      // Handle GET request
      const getAddress = await Address.find({ userEmail: user.email });
      res.json(getAddress);
      break;
    case "POST":
      // Handle POST request
      console.log(req.body)
      await Address.create({
        userEmail: user.email,
        ...req.body
      })

      res.json("Address Saved")

      break;
    case "PUT":
      // Handle PUT request
      const address = await Address.findOne({ userEmail: user.email });

      if (address) {
        res.json(await Address.findByIdAndUpdate(address._id, req.body));
      } else {
        res.json(
          await Address.create({
            userEmail: user.email,
            ...req.body,
          })
        );
      }
      break;
    case "DELETE":
      // Handle DELETE request
      break;
    default:
      res.status(405).end(); // Method not allowed
      break;
  }
}
