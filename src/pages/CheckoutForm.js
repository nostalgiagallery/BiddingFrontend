import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectedregister } from "../features/register/registerSlice";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const registeris = useSelector(selectedregister);

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      console.log("no stripe");
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      console.log("no clientSecret");
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `https://biddingapp-5c495b9e8cc1.herokuapp.com/Product-register/${registeris?.product.id}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      {!registeris && <Navigate to="/" replace={true}></Navigate>}
      <div className="grid grid-cols-1 gap-x-10 lg:grid-cols-8 p-10 bg-[#1D2430] w-full">
        {registeris && (
          <span className="lg:col-span-5 sm:px-6">
            <div className="px-4 py-6 sm:px-6">
              <div className="text-left m-2">
                <p className="agbalumo text-2xl text-gray-300">Pay</p>
                <p className="text-2xl md:text-3xl font-bold tracking-tight text-gray-200 ">
                  ₹ {Math.round(registeris?.product?.baseprice * 0.3)}.00
                </p>
                <h3 >
                  <p className="agbalumo text-2xl  text-gray-300">{registeris?.product?.name}</p>
                </h3>
              </div>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  <li className="flex py-6">
                    <img
                      src={registeris?.product?.imagesrc}
                      alt={registeris?.product?.imagesrc}
                      className=" h-36 w-36 rounded-lg"
                    />

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3 className="invisible">
                            <p>{registeris?.product?.name}</p>
                          </h3>
                          <p className="ml-4  text-2xl text-gray-300">
                            ₹ {Math.round(registeris?.product?.baseprice * 0.3)}
                            
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </span>
        )}
        <span className="lg:col-span-3 ml-2">
          <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement
              id="payment-element"
              options={paymentElementOptions}
            />
            <button disabled={isLoading || !stripe || !elements} id="submit">
              <span id="button-text">
                {isLoading ? (
                  <div className="spinner" id="spinner"></div>
                ) : (
                  `Pay   ₹ ${Math.round(registeris?.product?.baseprice * 0.3)}`
                )}
              </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
          </form>
        </span>
      </div>
    </>
  );
}
