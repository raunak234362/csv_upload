// Import necessary modules and models
const csvFile=require('../models/csv');
const fs=require('fs');
const path=require('path');

// Controller function to render the home page
module.exports.home=async(req,res)=>{
   
    try{
        // Retrieve a list of uploaded CSV files from the database
        let file=await csvFile.find({});
        return res.render('home',{
            title:'Home',
            Files:file,
        });
} catch(error){
    console.log('Error in homeController',error);
}
};

// Controller function to handle file upload
module.exports.upload= async(req,res)=>{
    try{
        // Check if there is no file attached to the request
        if(!req.file){
            return  req.status(400).send("Please upload a file!");
        }
        // Check if the uploaded file is not of type 'text/csv'
        if(!req.file.mimetype.startsWith('text/csv')){
            return res.status(400).send('Please selcet CSV files only!');
        }
    } catch (error) {
        console.log('Error in uploading files', error);
    }
    
    // Destructure properties from the uploaded file
    const { originalname , path , filename } = req.file;

    const file = await csvFile.create({
        FileName: originalname,
        FilePath: path,
        File: filename
    });


    return res.redirect('/');
}

module.exports.delete = async (req ,res) => {
    try {

      // Find the file by it's ID
        let isFile = await csvFile.findById(req.params.id);

        console.log("isFile ", isFile);

        if (!isFile) {
            console.log("File not found");
            return res.redirect("/");
        }

        // Remove the file from the database
        await csvFile.findByIdAndDelete(req.params.id);

        // Remove the file from the file system
        const filePath = path.join(__dirname, "../uploadFiles", isFile.File);

        fs.unlink(filePath, function (err) {
            if (err) {
            console.error("Error deleting file:", err);
            return res.redirect("/");
            } else {
            console.log("File deleted successfully");
            return res.redirect("/");
            }
        });
    } catch (error) {
        console.log("Error in deleting file :",error);
        res.status(500).send('Internal server error');
    }
}