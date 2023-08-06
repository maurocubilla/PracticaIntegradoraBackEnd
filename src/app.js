// crear servidor 
import express from "express";
import {config} from "./config/config.js";
import {connectDB} from "./config/dbConnection.js";
import {engine} from 'express-handlebars';
import  path  from "path";
import {__dirname} from "./utils.js";
import { Server } from "socket.io";
import { chatModel } from "./dao/models/chat.model.js";

import { productsRouter } from "./routes/products.routes.js";
//import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";

const port = config.server.port;
const app = express();



// middlewaves
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));




const httpServer = app.listen(port,()=>console.log(`server listening on port ${port}`));

//servidor de websocket
const io = new Server(httpServer);


//socket server
io.on("connection",(socket)=>{
    console.log("nuevo cliente conectado");
    
 
    socket.on("authenticated", async(msg)=>{
        const messages = await chatModel.find();
        socket.emit("messageHistory", messages);
        socket.broadcast.emit("newUser", msg);
    });

    //recibir el mensaje del cliente
    socket.on("message",async(data)=>{
        console.log("data", data);
        const messageCreated = await chatModel.create(data);
        const messages = await chatModel.find();

        //cada vez que recivamos este mensaje , enviamos todos los mensjaes actualizados a los clientes
        io.emit("messageHistory", messages);
    })

});


//connecion a la base de datos
connectDB();


//conficuracion de handlebars
app.engine('.hbs', engine({extname:'.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));



//routes
app.use(viewsRouter);
app.use("/api/products", productsRouter);
//app.use("/api/carts", cartsRouter);

