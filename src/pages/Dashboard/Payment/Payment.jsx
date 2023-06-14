import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import useCart from "../../../hooks/useCart";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const [cart] = useCart();
    const payableCourse = useLoaderData();

    const price = payableCourse.price;

    return (
        <div className="w-96">
             <h2 className="text-3xl">Money is Money</h2>
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
