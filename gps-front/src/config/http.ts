import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_API ;
const onUploadProgress =()=>{
    //TODO adicionar tratamento  primeiramente ver comportamento com console.log
}
const onDownloadProgress =()=>{
    //TODO adicionar tratamento  primeiramente ver comportamento com console.log
}
export const backEndHTTPClient = axios.create({baseURL: backendURL,  onUploadProgress, onDownloadProgress});
