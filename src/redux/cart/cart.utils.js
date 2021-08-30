export const addItemToCart = (cartItems, Item) => {
    const existingItem = cartItems.find(currentItem => currentItem.id === Item.id);
    if(existingItem) {
        return cartItems.map( currentItem => 
            currentItem.id === Item.id ?
            {...currentItem, quantity : currentItem.quantity + 1} :
            {...currentItem}
        );
    }

    return [...cartItems, {...Item, quantity: 1}];
}

export const removeItemToCart = (cartItems, cartItem) => {
    const existingItem = cartItems.find(currentItem => currentItem.id === cartItem.id);

    if(existingItem) {
        return existingItem.quantity === 1 ? 
        cartItems.filter(currentItem => currentItem.id !== cartItem.id)
        : cartItems.map( currentItem => 
            currentItem.id === cartItem.id ?
            {...currentItem, quantity : currentItem.quantity - 1} :
            {...currentItem}
        );
    }

    return [...cartItems];
}