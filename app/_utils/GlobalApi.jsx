import axios from "axios";

const axiosClient = axios.create({
    baseURL:'http://localhost:1337/api'
})

const getCategory=()=>axiosClient.get('/categories?populate=*');

const getCategoryList=()=>axiosClient.get('/categories?populate=*').then(resp=>{
    return resp.data.data;
})
const getAllProduct=()=>axiosClient.get('/products?populate=*').then(resp=>{
    return resp.data.data;
})

const getProductsByCategory=(category) => axiosClient.get('/products?filters[categories][Name][$in]='+category+"&populate=*").then(resp=>{
    return resp.data.data;
})

const registerUser=(username,email,password)=>axiosClient.post('/auth/local/register',{
    username:username,
    email:email,
    password:password
});

const SignIn=(email,password)=>axiosClient.post('/auth/local',{
    identifier:email,
    password:password
});

export default{
    getCategory,
    getCategoryList,
    getAllProduct,
    getProductsByCategory,
    registerUser,
    SignIn
}