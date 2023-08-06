import {__dirname} from "../utils.js";
import path from "path";
import fs from "fs";

export class CartManager{
    constructor(filename){
        this.path=path.join(__dirname,`/files/${filename}`); //src/files/carts.json
        
    };

    fileExists(){
        return fs.existsSync(this.path);
    }
    async getAll(){
        try {
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const carts = JSON.parse(content);
                return carts;

            } else {
                throw new Error("no se puede actualizar el carrito")
            }
        } catch (error) {
            throw error;
        }


    };
    async save(){
        try {
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const carts = JSON.parse(content);
                let newId = 1;
                if(carts.length>0){
                    newId= carts[carts.length-1].id+1;
                }
                const newCart = {
                    id:newId,
                     products:[]
                };
                carts.push(newCart);
                await fs.promises.writeFile(this.path,JSON.stringify(carts,null,'\t'));
                return newCart;

            } else {
                throw new Error("No es posible ejecutar la siguiente operacion")
            }
        } catch (error) {
            throw error;
        }
    };
    async update(cid,updatedFields){
        try {
            let cart = await this.getCartById(cid);
            if (!cart) return;
            Object.keys(updatedFields).forEach((key) => {
                cart[key] = updatedFields[key];
            });
            const data = JSON.stringify(this.carts, null, 4);
            await fs.promises.writeFile(this.path, data);
            console.log("carrito actualizado",cart);
            return cart;
        } catch (error) {
            throw new Error(error.message);
        }
    }

}