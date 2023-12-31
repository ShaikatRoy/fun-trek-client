import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const CheckoutForm = ({ price , cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('')

  useEffect(() => {
    console.log(price)
    axiosSecure.post('/create-payment-intent', { price })
     .then(res => {
       console.log(res.data.clientSecret);
       setClientSecret(res.data.clientSecret);
    })
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      setCardError(error.message);
    } 
    else {
      setCardError("");
    //   console.log("payment method", paymentMethod);
    }
    setProcessing(true);

    const { paymentIntent, error:confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.name || "anonymous",
          },
        },
      },
    );

    if (confirmError) {
      console.log(confirmError);
    }
    console.log("payment Intent", paymentIntent);
    setProcessing(false)
    if(paymentIntent?.status === 'succeeded'){
        setTransactionId(paymentIntent.id)
        
        // save payment info to the server
        const payment = {
            email: user?.email,
            transactionId: paymentIntent.id,
            price,
            items: cart.map(item => item._id),
            itemNames: cart.map(item => item.name)
        };
        axiosSecure.post("/payments", payment).then((res) => {
          if (res.data?.insertResult?.insertedId) {
            
            console.log("Payment saved successfully");
          }
        });
    }

  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-secondary btn-sm my-5"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-600">{cardError}</p>}
    {transactionId && <p className="text-green-600">Transaction complete with transactionId: {transactionId}</p>}
    </>
  );
};

export default CheckoutForm;
