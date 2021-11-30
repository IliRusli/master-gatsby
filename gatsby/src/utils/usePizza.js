import { useContext, useState } from "react";
import OrderContext from "../components/OrderContext";
import attachNamesAndPrices from "./attachNamesAndPrices";
import calculateOrderTotal from "./calculateOrderTotal";
import formatMoney from "./formatMoney";

export default function usePizza({ pizzas, values }) {
  // const [order, setOrder] = useState([]);
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }

  function removeFromOrder(index) {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  }

  async function submitOrder(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
      nasiLemak: values.nasiLemak,
    };

    // send this data to serverless function when user checkout
    // TODO move url to env
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const text = JSON.parse(await res.text());

    if (res.status >= 400 && res.status < 600) {
      setLoading(false);
      setError(text.message);
    } else {
      setLoading(false);
      setMessage("Success! Come on down for your pizza");
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    submitOrder,
    error,
    loading,
    message,
  };
}
