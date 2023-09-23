import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/modals/Product";

export default async function handle(req, res) {
  await mongooseConnect();
  const { categories, sort, phrase, ...filters } = req.query;
  let [sortField, sortOrder] = (sort || "_id-desc").split("-");

  console.log(phrase);
  const productsQuery = {};
  if (categories) {
    productsQuery.category = categories.split(",");
  }

  if (phrase) {
    productsQuery["$or"] = [
      { title: { $regex: phrase, $options: "i" } },
      { description: { $regex: phrase, $options: "i" } },
    ];
  }

  if (Object.keys(filters).length > 0) {
    Object.keys(filters).forEach((fName) => {
      productsQuery["properties." + fName] = filters[fName];
    });
    productsQuery.properties = filters;
  }
  res.json(
    await Product.find(productsQuery, null, {
      sort: {
        [sortField]: sortOrder === "asc" ? 1 : -1,
      },
    })
  );
}
