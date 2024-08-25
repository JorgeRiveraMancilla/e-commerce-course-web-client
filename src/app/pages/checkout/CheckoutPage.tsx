import { Elements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import agent from "../../api/agent";
import { useAppDispatch } from "../../store/configureStore";
import { setBasket } from "../../store/slices/basketSlice";
import { Loading } from "../../components/Loading";
import { loadStripe } from "@stripe/stripe-js";
import { Checkout } from "./components/Checkout";

const stripePromise = loadStripe(
  "pk_test_51PrPxiH6vGETLfN35pfU32vue1Ir7VepGeuicC3BZBTshpjx4KprTjDwbG3ftjWdC5kgvL9wBG8QBTYn58tb0I7N00juOXGghn"
);

export const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Payment.create()
      .then((response) => dispatch(setBasket(response)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <Loading message="Cargando..." />;

  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
};
