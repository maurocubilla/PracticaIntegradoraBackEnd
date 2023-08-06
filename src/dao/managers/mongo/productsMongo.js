import { productsModel } from "../../models/products.model.js";

export class ProductsMongo {
    constructor() {
        this.model = productsModel;
    };

    //obtener los productos
    async get() {
        try {
            const products = await this.model.find();
            return products;
        } catch (error) {
            console.log(error.message);
            // throw error
            throw new Error("Hubo un error al obtener los productos");
        }
    };


    async getProductById(id){
        try {
            const product = await this.model.findById(id);
            return product;
        }catch (error) {
            console.log(error.message);
            
            throw new Error("hubo un error al obtener el producto");

        }
    };



    //save product
    async save(productInfo) {
        try {
            const productCreated = await this.model.create(productInfo)
            return productCreated;
        } catch (error) {
            console.log(error.message);
            // throw error
            throw new Error("Hubo un error al crear el producto");
        }
    };
}