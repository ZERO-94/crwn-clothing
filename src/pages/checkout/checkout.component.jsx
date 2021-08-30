import React from 'react';

import {connect} from "react-redux";
import { selectCartItems, selectCartItemTotal } from '../../redux/cart/cart.selector';
import { createStructuredSelector } from 'reselect';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

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
            <CheckoutItem cartItem={item}/>
            )
        }
        <div className="total">
            <span>TOTAL : ${cartItemsTotal}</span>
        </div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartItemsTotal: selectCartItemTotal
});



export default connect(mapStateToProps)(CheckoutPage);