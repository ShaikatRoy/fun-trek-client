import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import useCart from "../../../hooks/useCart";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
console.log(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {
    const [cart] = useCart();
    // const total = cart.reduce((sum, item) => sum + item.price, 0);
    // const price = parseFloat(total.toFixed(2))
    const price = 100

    return (
        <div className="w-96">
             <h2 className="text-3xl">Money is Money</h2>
        <Elements stripe={stripePromise}>
             <CheckoutForm cart={cart} price={price} ></CheckoutForm>
        </Elements>
        
        </div>
    );
};

export default Payment;
