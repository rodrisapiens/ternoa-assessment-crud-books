import { Schema,models,model } from "mongoose";
const bookSchema=new Schema({
    title:{
        type:String,
        required:[true,"title required"],
        trim:true,
        maxlength:[40,"max title length is 40 characters"]
    },
    image:{
        type:String,
        required:[true,"image required"],
        trim:true,
    },
    description:{
        type:String,
        required:[true,"description required"],
        trim:true,
        maxlength:[200,"max description length is 200 characters"]
    },
    
    
    
},{
    timestamps:true,
    versionKey:false
})
export default models.book||model("book",bookSchema);