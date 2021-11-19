import calculatePizzaPrice from "./calculatePizzaPrice";
import formatMoney from "./formatMoney";

export default function attachNamesAndPrices(order, pizzas) {
  return order.map((singleOrder) => {
    const pizza = pizzas.find((pizza) => pizza.id === singleOrder.id);
    return {
      ...singleOrder,
      name: pizza.name,
      thumbnail: pizza.image.asset.fluid.src,
      price: formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size)),
    };
  });
}
