import React from "react";
import './button.styles.scss'

export const BUTTON_TYPE_CLASSES = {
    google: "google-sign-in",
    inverted: "inverted",
    payment: "payment"
};

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
    return (
        <button disabled={isLoading}
            className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
            {...otherProps}
        >
            {isLoading ? <div className="button-spinner" /> : children}
        </button>
    );
};

export default Button;
