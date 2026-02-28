import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"
import { CLOUDINARY_APIKEY,
    CLOUDINARY_CLOUDNAME,
    CLOUDINARY_APISECRET
 } from '../../pass.js';
cloudinary.config({
    cloud_name:CLOUDINARY_CLOUDNAME,
    api_key:CLOUDINARY_APIKEY,
    api_secret:CLOUDINARY_APISECRET
});
const uploadFileOnCloudinary = async (localPathFile) => {
    try {
        if (!localPathFile) return;
        const response = await cloudinary.uploader.upload(localPathFile, {
            resource_type: "auto"
        })
        fs.unlinkSync(localPathFile)
        return response
    }
catch (error) {
        fs.unlinkSync(localPathFile)
        return null
    }
}
export {uploadFileOnCloudinary}