import { useState } from "react";

const desserts = [
  {
    "image": {
      "thumbnail": "/images/image-waffle-thumbnail.jpg",
      "mobile": "/images/image-waffle-mobile.jpg",
      "tablet": "/images/image-waffle-tablet.jpg",
      "desktop": "/images/image-waffle-desktop.jpg"
    },
    "name": "Waffle with Berries",
    "category": "Waffle",
    "price": 6.50
  },
  {
    "image": {
      "thumbnail": "/images/image-creme-brulee-thumbnail.jpg",
      "mobile": "/images/image-creme-brulee-mobile.jpg",
      "tablet": "/images/image-creme-brulee-tablet.jpg",
      "desktop": "/images/image-creme-brulee-desktop.jpg"
    },
    "name": "Vanilla Bean Crème Brûlée",
    "category": "Crème Brûlée",
    "price": 7.00
  },
  {
    "image": {
      "thumbnail": "/images/image-macaron-thumbnail.jpg",
      "mobile": "/images/image-macaron-mobile.jpg",
      "tablet": "/images/image-macaron-tablet.jpg",
      "desktop": "/images/image-macaron-desktop.jpg"
    },
    "name": "Macaron Mix of Five",
    "category": "Macaron",
    "price": 8.00
  },
  {
    "image": {
      "thumbnail": "/images/image-tiramisu-thumbnail.jpg",
      "mobile": "/images/image-tiramisu-mobile.jpg",
      "tablet": "/images/image-tiramisu-tablet.jpg",
      "desktop": "/images/image-tiramisu-desktop.jpg"
    },
    "name": "Classic Tiramisu",
    "category": "Tiramisu",
    "price": 5.50
  },
  {
    "image": {
      "thumbnail": "/images/image-baklava-thumbnail.jpg",
      "mobile": "/images/image-baklava-mobile.jpg",
      "tablet": "/images/image-baklava-tablet.jpg",
      "desktop": "/images/image-baklava-desktop.jpg"
    },
    "name": "Pistachio Baklava",
    "category": "Baklava",
    "price": 4.00
  },
  {
    "image": {
      "thumbnail": "/images/image-meringue-thumbnail.jpg",
      "mobile": "/images/image-meringue-mobile.jpg",
      "tablet": "/images/image-meringue-tablet.jpg",
      "desktop": "/images/image-meringue-desktop.jpg"
    },
    "name": "Lemon Meringue Pie",
    "category": "Pie",
    "price": 5.00
  }
];
export default function App() {

  const [cart, setCart] = useState([]);
  const [checkedout, setCheckedout] = useState(false);
  checkedout ? document.body.classList.add("no-scroll") : document.body.classList.remove("no-scroll");
  function handleAddToCart(item) {

    if (!item.qty) return;

    const hasItem = cart.some(cartItem => item.name === cartItem.name);
    if (hasItem) {
      const editedCartItem = cart.find(cartItem => item.name === cartItem.name);
      if (editedCartItem.qty !== item.qty) {
        setCart(cart => cart.map(cartItem => cartItem.name === item.name ? item : cartItem));
      }
      return;
    }
    setCart(cart => [...cart, item]);
  }
  function handleDeleteItem(itemName) {
    setCart(cart => cart.filter(cartItem => cartItem.name !== itemName));
  }
  function handleConfirmOrder() {
    setCheckedout(false);
    setCart([]);
  }
  function handleCancelOrder() {
    setCheckedout(false);
  }

  return <>
    <div className="app">
      <Logo></Logo>
      <div className="container">
        <Menu onAddToCart={handleAddToCart}></Menu>
        <CartList cart={cart} onDeleteitem={handleDeleteItem} onCheckout={setCheckedout}></CartList>
      </div>
    </div>
    {checkedout && <Checkout cart={cart} onConfirm={handleConfirmOrder} onCancel={handleCancelOrder}></Checkout>}
  </>
}

function Logo() {
  return <div className="logo">Majed's Desserts</div>
}

function Menu({ onAddToCart }) {

  return <div className="menu">
    {desserts.map(item => <MenuItem item={item} onAddToCart={onAddToCart} key={item.name}>
    </MenuItem>)}
  </div>
}

function MenuItem({ item, onAddToCart }) {

  const [qty, setQty] = useState(0);

  function handleSub() {
    setQty(qty => qty === 0 ? 0 : qty - 1);
  }
  function handleAdd() {
    setQty(qty => qty + 1);
  }
  return <div className="menu-item">

    <img src={item.image.desktop} alt={item.name}></img>
    <div className="all-info"></div>

    <p className="name">{item.name}</p>
    <div className="info">
      <span className="category">{item.category}</span>
      <span className="price">${item.price.toFixed(2)}</span>
    </div>

    <button className="add-to-cart" onClick={() => {
      onAddToCart({ ...item, qty });
      setQty(0);
    }}>Add to cart</button>
    <div className="quantity">
      <button className="sub" onClick={handleSub}>-</button>
      <span>{qty}</span>
      <button className="add" onClick={handleAdd}>+</button>
    </div>
  </div>
}

function CartList({ cart, onDeleteitem, onCheckout }) {

  return <div className="cart-list">
    <h3>Cart</h3>
    {cart.length === 0 ? <p>Add items to your cart 🛒</p> : <>
      {cart.map(item => <CartItem item={item} key={item.name}>
        <button className="delete-item" onClick={() => onDeleteitem(item.name)}>X</button>
      </CartItem>)}
      <p className="cart-total-price">Total price💸: ${cart.reduce((acc, curr) => curr.qty * curr.price + acc, 0).toFixed(2)}</p>
      <button className="checkout-button" onClick={() => onCheckout(true)}>Checkout</button>
    </>}
  </div>
}

function CartItem({ item, children }) {
  return <div className="cart-item">
    <img src={item.image.thumbnail} alt={item.name}></img>
    <div className="all-info">
      <div className="name">{item.name}</div>
      <div className="info">
        <div className="price">${item.price.toFixed(2)}</div>
        <div className="quantity">@{item.qty}</div>
        <div className="total-price">${(item.price * item.qty).toFixed(2)}</div>
      </div>
    </div>
    {children}
  </div>
}
function Checkout({ cart, onConfirm, onCancel }) {
  return <div className="black-layer">
    <div className="checkout">
      <h3>Checkout</h3>
      <div className="checkout-items-menu">
        {cart.map(item => <CartItem item={item} key={item.name}>
        </CartItem>)}
      </div>
      <p className="cart-total-price">Total price💸: ${cart.reduce((acc, curr) => curr.qty * curr.price + acc, 0).toFixed(2)}</p>
      <div className="checkout-buttons">
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm}>Confirm</button>
      </div>
    </div>
  </div>
}