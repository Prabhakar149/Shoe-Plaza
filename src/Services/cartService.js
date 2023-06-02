export const addToCart = async (product,token,dispatch) => {
  const data = {
    product: product,
  };
  try {
    const response = await fetch("/api/user/cart", {
      method: "POST",
      headers: {
        authorization: token,
      },
      body: JSON.stringify(data),
    });

    const {cart} = await response.json();
    dispatch({
        type: "ADD_TO_CART",
        payload: cart
    })
  } catch (err) {
    console.error(err);
  }
};

export const removeFromCart = async (token,id,dispatch) =>{
  try{
    const response = await fetch(`api/user/cart/${id}`,{
      method: 'DELETE',
      headers: {
        authorization: token,
      },
    })
    const {cart} = await response.json()
    
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: cart
    })
  }catch(err){
    console.error(err);
  }
}


export const updateCartQuantity = async (type,id,dispatch,token) =>{
  
  const data = {
    action: {
      type: type === "Increase" ? "increment" : "decrement",
    },
  }

  try{
    const response = await fetch(`api/user/cart/${id}`,{
      method: 'POST',
      headers: {
        authorization: token,
      },
      body: JSON.stringify(data)
    })
    const {cart} = await response.json();
    dispatch({
      type:"UPDATE_CART_PRODUCT_QTY",
      payload: cart
    })
  }catch(err){
    console.error(err);
  }
}
