import {Router} from "express";
//import { productManager } from "../dao/managers/fileSystem/productsFiles.js";

import { ProductsMongo } from "../dao/managers/mongo/productsMongo.js";


//const productService = new productManager('products.json');

const productService = new ProductsMongo(); 

//const //validateFields = (req,res,next)=>{
    //const productInfo = req.body;
    //if(!productInfo.name || !productInfo.category || !productInfo.price){
       // return res.json //({status:"error",messaje:"campos incompletos"})
    //} else {
    //    next();
  //  }
//}

const router = Router();

router.get("/",async (req,res)=>{
    try {
        const limit = req.query.limit;
        const products = await productService.get();
        
        if(limit){
            // devolver productos de acuerdo al limite
        } else {
            res.json({status:"succes", data:products});
        }
        
        
    } catch (error) {
        res.json({status:"error",messaje: error.messaje});
    }
});


router.get('/:pid',async(req,res)=>{
    try {
        let pid = req.params.pid;
        let result = await productService.getProductById(pid);
        res.json({status:"success",data:result});
    } catch (error) {
        res.json({ status: "error!", message: error.message });
        throw new Error(error.message);

    }

});




router.post("/",async(req,res)=>{
    
  
        //agregar el producto
        try {
            const productInfo = req.body;
            const productCreated = await productService.save(productInfo);
            res.json({status:"succes", data:productCreated, message:"Nuevo producto creado"});
        } catch (error) {
            res.json({status:"error",message: error.message});
        }
    
});

    // actualiza el producto
    router.put("/:pid",async (req,res)=>{
        try {
            let pid = req.params.pid;
            let product = req.body;
            let result = await productService.updateProduct(pid,product);
            result.id = pid;
            res.json({status:"success",data:result});
        } catch (error) {
            res.json({status:"error",message:error.message});
        }
    });



router.delete("/:pid",async(req,res)=>{ 
    try {
        const pid = req.params.pid;
        const result = await productService.deleteProduct(pid);
        res.json({status:"success",data:result, message:"Eliminaste un producto"});
    } catch (error) {
        res.json({status:"error",message:error.message});
    }
});

export {router as productsRouter};

