import { dbConnect } from "../../../utils/mongoose"
import book from "../../../models/book";
dbConnect();
export default async function handler(req, res) {
  const {method,body}=req;
  switch(method)
  {
    case "GET":
      try{
        const books= await book.find();
        res.status(200).json({ books })
      }catch(error){
        res.status(500).json({error:error.message})
      }
      break;
      case "POST":
        try{
          const newBook= new book(body);
          const savedBook= await newBook.save();
          res.status(201).json(savedBook)
        }catch(error){
          res.status(500).json({error:error.message})
        }
      break;
      default :
      res.status(400).json("request type not suported");
      break;
  }
  
}