const mongoose=require('mongoose');

const csvSchema =new mongoose.Schema({
    FileName:{
        type:String,
    },
    FilePath:{
        type:String,
    },
    File:{
        type:String,
    }
},{
    timestamps : true,
});

const Files=mongoose.model('Files',csvSchema);

module.exports=Files;