import axios from "axios";

export const postPicture = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const res = await axios.post(process.env.REACT_APP_API_URL_UPLOAD, formData)
        //console.log('Success!', res.data);
    } catch (err) {
        console.log(err)
    }
} 