import { dbConnect } from "../../../../utils/mongoose";
import book from "../../../../models/book";
dbConnect();
export default async function (req, res) {
    const { method, body, query: { id } } = req;
    switch (method) {
        case "GET":
            try{
                const bookk= await book.findById(id);
                if(!bookk) return res.status(400).json({msg:"task not found"})
                res.status(200).json({bookk});
            }catch(err){
                res.status(400).json({msg:err.message});
            }
            break;
        case "PUT":
            try{
                const bookk= await book.findByIdAndUpdate(id,body,{new:true});
                if(!bookk) return res.status(404).json({msg:"task not found"});
                return res.status(200).json(bookk); 
            }catch(err){
                res.status(400).json({smg:err.message})
            }
            break;
        case "DELETE":
            try{
                const bookk= await book.findByIdAndDelete(id);
                if(!bookk) return res.status(404).json({msg:"task not found"})
                res.status(204).json("ok");
            }catch(err){
                res.status(400).json({msg:err.message});
            }
            break;
            default:
                res.status(400).json({msg:"this method is not supported"});
                break;
    }
    return res.status(200).json("request recived");
}