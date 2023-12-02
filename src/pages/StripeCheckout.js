import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "../Stripe.css";
import { useSelector } from "react-redux";
import PageNotFound from "./404";
import { Audio } from "react-loader-spinner";
import { selectedregister } from "../features/register/registerSlice";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51OBA3FSIDQB38awG8xmu8ZeTeGSKymjHtRVYPanNDbtQHs3Ee9biofveEKISgEcmW49rpk7Xx7VNB8uSwxuX8WYS00DT1q5tEB"
);

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const registeris = useSelector(selectedregister);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        totalAmount: Math.round(registeris?.product?.baseprice * 0.3),
        OrderId: registeris?.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setLoading(false); // Set loading to false after fetching data
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe bg-[#1D2430] h-screen">
      {loading ? (
        <div className="flex items-center justify-center h-screen bg-transparent">
          <Audio
            height={100}
            width={100}
            radius={5}
            color="#600AFF"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
            ariaLabel="loading"
          />
        </div>
      ) : clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : (
        <PageNotFound />
      )}
    </div>
  );
}
