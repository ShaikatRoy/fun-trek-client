import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import useCart from "../../../hooks/useCart";
import {  useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const [cart] = useCart();
    console.log(cart);
    // const payableCourse = useLoaderData();
    const { id } = useParams();
    const [payableCourse, setPayableCourse] = useState(null);
    // console.log(id);

    useEffect(() => {
        fetch(`https://fun-trek-server.vercel.app/carts/${id}`)
            .then(res => res.json())
            .then(data => setPayableCourse(data))
            .catch(error => console.error(error));
    }, [id]);

    if (!payableCourse) {
       
        return <div>Loading...</div>;
      }

    const price = parseFloat(payableCourse.price);

    return (
        <div className="w-96">
            <h2 className="text-3xl">Complete the payment for</h2>
            <Elements stripe={stripePromise}>
                <CheckoutForm
                    cart={cart}
                    price={price}
                     payableCourse={payableCourse}
                ></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;
