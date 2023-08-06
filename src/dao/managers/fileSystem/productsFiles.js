import { __dirname } from "../utils.js";
import path from "path";
import fs from "fs";


export class productManager {
    constructor(filename) {
        this.path = path.join(__dirname, `/files/${filename}`); // src/files/products.json

    };

    fileExists() {
        return fs.existsSync(this.path);
    }
    async get() {
        try {
            if (this.fileExists()) {
                const content = await fs.promises.readFile(this.path, "utf-8");
                const products = JSON.parse(content);
                return products;

            } else {
                throw new Error("No se encuentran los productos")
            }
        } catch (error) {
            throw error;
        }


    };


    async getProductById(id) {
        const product = await this.products.find((p) => p.id === id);
        if (!product) {
            console.error('Not found');
            return;
        }
        return product;
    };




    async save(product) {
        try {
            if (this.fileExists()) {
                const content = await fs.promises.readFile(this.path, "utf-8");
                const products = JSON.parse(content);
                let newId = 1;
                if (products.length > 0) {
                    newId = products[products.length - 1].id + 1;
                }
                const newProduct = {
                    id: newId,
                    ...product
                };
                products.push(newProduct);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                return newProduct;

            } else {
                throw new Error("No es posible ejecutar la siguiente operacion ")
            }
        } catch (error) {
            throw error;
        }
    };


    addProduct (product) {
        if(!product.title || product.title == "" || !product.description || product.description == "" || !product.price || product.price == 0 || !product.thumbnail || product.thumbnail == "" || !product.code || product.code == "" || !product.stock) {
            console.error("Todos los campos son obligatorios");
            return;
        }

        const existingProduct = this.products.find((p) => p.code === product.code);
        if (existingProduct) {
            console.error('Producto con el mismo código ya existe');
            return;
        }


        const newProduct = {
            id: this.generateId(),
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock,
        };



        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    getProducts() {
        return this.products;
        }

        updateProduct(id, updatedFields) {
            const productIndex = this.products.findIndex((p) => p.id === id);
            if (productIndex === -1) {
                console.error('Not found');
                return;
            } else {
                console.log("Producto para update encontrado!");
            }
    
            const updatedProduct = { ...this.products[productIndex], ...updatedFields };
            this.products[productIndex] = updatedProduct;
            this.saveProducts();
        }
    
        deleteProduct(id) {
            const productIndex = this.products.findIndex((p) => p.id === id);
            if (productIndex === -1) {
                console.error('Not found');
                return;
            }
    
            this.products.splice(productIndex, 1);
            this.saveProducts();
        }
    
}


