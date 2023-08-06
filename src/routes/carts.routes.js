import { Router } from "express";
import { CartManager } from "../dao/cartManager.js";
import { productManager } from "../dao/productManager.js";

const cartService = new CartManager("carts.json");
const productService = new productManager("products.json");


const router = Router();

router.post("/", async (req, res) => {
    try {
        const cartCreated = await cartService.save();
        res.json({ status: "success", data: cartCreated });
    } catch (error) {
        res.json({ status: "error!", messaje: error.messaje });
    }
});

router.get('/:cid', async(req,res)=>{
    try {
        const cid = req.params.cid;
        let result = await cartCreated.getCartById(cid);
        res.send(result);
    } catch(error) {
        res.json({status:"error",message:error.message});
    }

});

router.post("/:cid/product/:pid",async(req,res)=>{
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const cart =await cartService.getCartById(cid);
        let products =cart.products;
        let ProductsCart = cart.products.find((p)=>p.id== pid)
        if (ProductsCart) {
            let index = products.findIndex((p)=>p.id == pid);
            cart.products[index].quantity++;
            cartService.saveCart();
            res.json({ status:"succes",data:cart});
        } else {
            const newProd ={
                id:pid,
                quantity:1
            }
            cart.products.push(newProd);
            cartService.saveCart()
            res.json({ status: "success", data: cart });
        }
    } catch (error) {
        console.error(error.message);
        res.json({ status: "error!!", message: error.message });
    }
});

router.put('/:cid',async(req,res)=>{
    try {
        let cid =req.params.cid;
        let cart =req.body;
        let result =await cartCreated.updateCart(cid,cart);
        result.id =cid;
        res.send(result);
    } catch(error){
        res.json({status:"error",message:error.message });
    }
});

// router.post("/:cid/product/:pid", async (req, res) => {
//     try {
//         // const cartId = req.params.cid;
//         // const productId= req.params.pid;
//         // const cart = await cartService.getByid(cartId);
//         // const product = await productService.getById(productId);
//         // const product = cart.products;
//         //verificar si el producto existe en el carrito
//         // si existe el producto en el carrito le sumamos 1
//         // si no existe el producto en el carrito se agrega el nuevo producto
//         const newProduct = {
//             product: productId,
//             quantity: 1
//         }
//         cartId.products.push(newProduct);

//         // actualizar el carrito 

//         await cartService.update(cartId, cart);

//         res.json({ status: "success", data: cartCreated });
//     } catch (error) {
//         res.json({ status: "error", messaje: error.messaje });

//     }

// });


export { router as cartsRouter }