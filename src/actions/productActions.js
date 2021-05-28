import { FETCH_PRODUCTS } from "../types";

export const fetchProducts = ()=> async(dispatch)=>{
    try {
        const res = await fetch('http://localhost:27017/api/products');
        console.log(res);
        const data= await res.json() 
        dispatch({
            type:FETCH_PRODUCTS,
            payload:data
        })
    } catch (error) {
        console.log(error);
    }
}