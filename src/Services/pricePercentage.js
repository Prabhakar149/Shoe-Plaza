

const getPricePercentage = (price,original_price) => {
    const per =
      ((Number(original_price) - Number(price)) * 100) / Number(original_price);
    return Math.floor(per);
};

export {getPricePercentage}