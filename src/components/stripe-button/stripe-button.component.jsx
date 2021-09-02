import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

import './stripe-button.styles.scss';

const StripeButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishiableKey = "pk_test_51JV7CAGycMat513am3J1PKq0mWycr8A9QfhlFhhGdr8POYnbGVUY71MRKrB0NK4c7ESHzrW1fYTNQHa3X7tgpC7m00WPIvvYS1";
    
    const onToken = token => {
        console.log(token);
        alert("Successful");
    }

    return (
        <StripeCheckout
            label= "Pay now"
            name="CRWN Clothing Ltd"
            image= "https://svgshare.com/i/CUz.svg"
            shippingAddress
            billingAddress
            amount={priceForStripe}
            panelLabel="Pay now"
            description={`Your total is ${price}`}
            stripeKey={publishiableKey}
            token={onToken}
        />
    );
}

export default StripeButton;