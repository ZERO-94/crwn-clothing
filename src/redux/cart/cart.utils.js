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