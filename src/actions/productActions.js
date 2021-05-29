import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE, ORDER_PRODUCTS_BY_PRICE } from "../types";

export const fetchProducts = ()=> async(dispatch)=>{
    try {
        const res = await fetch('http://localhost:27017/api/products'); 
        const data= await res.json() 
        dispatch({
            type:FETCH_PRODUCTS,
            payload:data
        })
    } catch (error) {
        console.log(error);
    }
}
export const filterProducts = (products,size)=>(dispatch)=>{
     dispatch({
        type:FILTER_PRODUCTS_BY_SIZE,
        payload:{ 
            size,
            items:size === ''?products:
            products.filter(itm=>itm.availableSizes.indexOf(size) >= 0)
        }
    })
}
export const orderProducts = (filteredProducts,sort)=>(dispatch)=>{ 
    const sortedProducts = filteredProducts.slice();
    if(sort === 'latest'){
        sortedProducts.sort((a,b)=>(a._id > b._id?1:-1))
    }else{
        sortedProducts.sort((a,b)=>(
            sort === 'lowest'?
            (a.price > b.price?1:-1): 
            (a.price > b.price?-1:1)

        ))
    }
    dispatch({
        type:ORDER_PRODUCTS_BY_PRICE,
        payload:{ 
            sort,
            items:sortedProducts
        }
    });
} 