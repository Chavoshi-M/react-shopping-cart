import { CLEAR_CARD, CLEAR_ORDER, CREATE_ORDER } from "../types"

export const createOrder = (order)=>(dispatch)=>{ 
    console.log(order,'************');
    fetch('http://localhost:27017/api/orders',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    })
    .then(res=>res.json())
    .then(data=>{
        dispatch({
            type:CREATE_ORDER,
            payload:data
        })
        localStorage.clear('cartItems')
        dispatch({
            type:CLEAR_CARD
        })
    })
}
export const clearOrder = ()=>dispatch=>{
    dispatch({
        type:CLEAR_ORDER
    })
}