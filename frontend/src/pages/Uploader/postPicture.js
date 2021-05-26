import axios from "axios";

export const postPicture = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const res = await axios.post(process.env.REACT_APP_API_URL_UPLOAD, formData)
        return "success"
        //console.log('Success!', res.data);
    } catch (err) {
        console.log(err)
        return "error"
    }
} 