import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/modals/Product";

export default async function handle(req, res) {
    await mongooseConnect();
    const {categories, ...filters} = req.query;
    const productsQuery = {
        category:categories.split(',')    
    }
    if (Object.keys(filters).length > 0) {
        Object.keys(filters).forEach(fName => {
           productsQuery['properties.' + fName] = filters[fName]; 
        });
        productsQuery.properties = filters;
    }
    res.json( await Product.find(productsQuery) );


}
