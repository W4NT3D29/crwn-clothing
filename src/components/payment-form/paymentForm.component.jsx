import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./paymentForm.styles.scss";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useState } from "react";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isProccesingPayment, setIsProccesingPayment] = useState(false);

    const paymentHandler = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setIsProccesingPayment(true)
        const response = await fetch("/.netlify/functions/create-payment-intent", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: amount * 100 }),
        }).then((res) => res.json());

        const {
            paymentIntent: { client_secret },
        } = response;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : "Guest",
                },
            },
        });
        setIsProccesingPayment(false)
        if (paymentResult.error) {
            alert(paymentResult.error);
        } else {
            if (paymentResult.paymentIntent.status === "succeeded") {
                alert("Payment Succesful");
            }
        }
    };
    return (
        <div className="payment-form-container">
            <form className="form-container" onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <Button
                    isLoading={isProccesingPayment}
                    buttonType={BUTTON_TYPE_CLASSES.payment}
                >
                    Pay Now
                </Button>
            </form>
        </div>
    );
};

export default PaymentForm;
