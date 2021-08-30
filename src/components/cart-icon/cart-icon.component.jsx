import React from 'react';

import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import { connect } from 'react-redux';
import { toggelCartHidden } from '../../redux/cart/cart.action';
import { selectCartItemsCount } from '../../redux/cart/cart.selector';

import './cart-icon.styles.scss';

const CartIcon = ({toggelCartHidden, CartItemCount}) => (
    <div className='cart-icon' onClick={toggelCartHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{CartItemCount}</span>
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggelCartHidden : () => dispatch(toggelCartHidden()),
});

const mapStateToProps = state => ({
    CartItemCount: selectCartItemsCount(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);