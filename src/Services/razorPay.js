export const razorPay = (totalAmount,cartItemsId,removeFromCart,dispatch,token,navigate) =>{
    var options = {
        key: "rzp_test_3kwuxJbyriB8la",
        key_secret: "X1IRN4Q9EkD6e551QsikyfFB",
        amount: totalAmount * 100,
        currency: "INR",
        name: "Shoe Plaza",
        description: "for testing purpose",
        handler: function (response) {
          localStorage.setItem("payment_key", response.razorpay_payment_id);
          cartItemsId?.forEach((_id) => removeFromCart(token,_id, dispatch));
        //   orderDispatch({ type: "ORDER_PLACED_ITEMS", payload: cart });
          navigate("/");
        },
        prefill: {
          name: "Prabhakar",
          email: "prabhakarsingh10798@gmail.com",
          contact: "9131436281",
        },
        notes: {
          address: "Razorpay Corporate office",
        },
        theme: {
          color: "#213555",
        },
      };
      var pay = new window.Razorpay(options);
      pay.open();
    
}