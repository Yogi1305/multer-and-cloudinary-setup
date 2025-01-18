import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"


cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_SECRET // Click 'View API Keys' above to copy your API secret
});

export const uploadoncloudinar= async(localpath)=>{

    try { 
        if(!localpath)return null;
        const response= await cloudinary.uploader.upload(localpath,{
          resource_type:"auto"  
        })
        fs.unlinkSync(localpath);
        console.log(response.url);
        return response
    } catch (error) {
        fs.unlinkSync(localpath); // remove the file 
        return null
    }
}

// (async function() {

//     // Configuration
    
    
//     // Upload an image
//      const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();