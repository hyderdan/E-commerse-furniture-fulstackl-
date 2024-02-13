const multer=require("multer")

const MIME_TYPE={
    "image/jpg":"jpg",
    "image/jpeg":"jpg",
    "image/png":"png",
    "image/gif":"gif",
    "image/pdf":"pdf",
};
const dir="profile/upload"
const fs=require("fs").promises;
const storage=multer.diskStorage({
    destination:async(req,file,CB)=>{
        try{
            await fs.mkdir(dir,{recursive:true})
            CB(null,dir);
        }catch(err){
            CB(err,dir);
        }
    },
    filename:(req,file,CB)=>{
            const name=file.originalname.split("").join("_");
            const extension=MIME_TYPE[file.mimetype];
            CB(null,Date.now()+"."+extension)

    }

});
const filefilter=(req,file,cb)=>{
    if(!MIME_TYPE[file.mimetype]){
        cb("file must be an image",false);
    }else{
        cb(null,true);
    }
};
    module.exports=multer({
        storage:storage,
        limit:{
            fileSize:2000000,
        },
        filefilter
    }).single("image");