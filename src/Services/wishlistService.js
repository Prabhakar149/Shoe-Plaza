
export const addToWishlist = async (product,token,dispatch) =>{
    const data = {
        product: product,
      };
    try{
        const response = await fetch("/api/user/wishlist",{
            method: 'POST',
            headers: {
                authorization: token,
            },
            body: JSON.stringify(data),
        })
        const { wishlist } = await response.json();
        dispatch({
            type:"ADD_TO_WISHLIST",
            payload: wishlist
        })
    }catch(err){
        console.error(err);
    }
}

export const removeFromWishlist = async (token,id,dispatch) =>{
    try{
      const response = await fetch(`api/user/wishlist/${id}`,{
        method: 'DELETE',
        headers: {
          authorization: token,
        },
      })
      const {wishlist} = await response.json()
      
      dispatch({
        type: "REMOVE_FROM_WISHLIST",
        payload: wishlist
      })
    }catch(err){
      console.error(err);
    }
  }