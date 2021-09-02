import React from 'react';

import {connect} from "react-redux";
import { selectCartItems, selectCartItemTotal } from '../../redux/cart/cart.selector';
import { createStructuredSelector } from 'reselect';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeButton from '../../components/stripe-button/stripe-button.component';

import './checkout.styles.scss';
import CartItem from '../../components/cart-item/cart-item.component';

const CheckoutPage = ({cartItems, cartItemsTotal}) => (
    <div className="checkout-page">
        <div className="checkout-header">
            <div className="checkout-block">
                <span>Product</span>
            </div>
            <div className="checkout-block">
                <span>Description</span>
            </div>
            <div className="checkout-block">
                <span>Quantity</span>
            </div>
            <div className="checkout-block">
                <span>Price</span>
            </div>
            <div className="checkout-block">
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(item => 
            <CheckoutItem key={item.id} cartItem={item}/>
            )
        }
        <div className="total">
            <span>TOTAL : ${cartItemsTotal}</span>
        </div>
        <div className="test-warning">
            *Please use the following test credit card*
            <br/>
            4242 4242 4242 4242 - Exp: 01/25 - CVV: 123
        </div>
        <StripeButton price={cartItemsTotal}/>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartItemsTotal: selectCartItemTotal
});



export default connect(mapStateToProps)(CheckoutPage);