import axios from "axios";

export const postPicture = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        await axios.post(process.env.API_URL_UPLOAD, formData)
        return "success"
        //console.log('Success!', res.data);
    } catch (err) {
        console.log(err)
        return "error"
    }
} 