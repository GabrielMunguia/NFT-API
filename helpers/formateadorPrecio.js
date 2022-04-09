   const formatPriceAsset = (decimal, price) => {

    let resp = price.substr(0, price.length - decimal);
    if (price == 0 || price == "") {
      return 0;
    }

    const decimals = price.substr(
      price.length - decimal,
      price.length - decimal
    );

    if (decimals[0] > "0") {
      if (decimals.substr(-1) === "0") {
        return (resp +=
          "." +
          price.substr(price.length - decimal, price.length - decimal - 1));
      }

      resp +=
        "." + price.substr(price.length - decimal, price.length - decimal);
    }
    
    if(resp.trim()===""){
      return "-"
    }

    return resp;
  };
  module.exports={
    formatPriceAsset
  }