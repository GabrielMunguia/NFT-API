
function main(asset) {
 try {
  
  const orders = asset.sell_orders;
  const orders_length = orders.length;
  const orders_array = [];
  let current_price_base;
  for (let i = 0; i < orders_length; i++) {
    //validar que side sea > 0
    if (orders[i].side > 0) {
      orders_array.push(orders[i]);
    }
  }

  if (orders_array.length > 0) {
    //ordenar por created_date
    orders_array.sort(function (a, b) {
      return new Date(a.created_date) - new Date(b.created_date);
      //return a.created_date - b.created_date;
    });

    //validar si payment_token_contract simbol es ETH
    if (
      orders_array[orders_array.length - 1].payment_token_contract.symbol ==
      "ETH"
    ) {
      //obtener el ultimo
      const last_order = orders_array[orders_array.length - 1];
      //obtener el current_price
      const current_price = last_order.current_price;

      //obtener el decimals
      const decimals = last_order.payment_token_contract.decimals;

      //convertir current_price a number
      const current_price_number = parseFloat(current_price);

      //current price en base al decimals
      current_price_base = current_price_number / Math.pow(10, decimals);
    } else {

      return 0;
    }

  
    return current_price_base;
  } else {
  
    return 0;
  }
 } catch (error) {
   return 0;
  
 }
}

module.exports = main;