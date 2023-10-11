Sources:
1:1 with Tim
Cody Q&A



Questions/Notes:

coupon codes:
-lost on how to create the coupons route...

alternate currency support:
-how do i build handleToggleCurrency in header?
-how do i pass getPrice function to each file?
is my Form.Switch correct?



cart Session Persistence:
-are my returns correct for newly added cases?
set variable initSavedCart to action.payload (savedCart)
the destructure the cart and item count out of initSavedCart and return the state for each property except cartTotal?

-Why am i not destructuring cartTotal?
definitely have to destrucure cartTotal


-are my dispatches correct?
yes


-is deleteCart same as resetCart?
yes

-in the reducer do i use localStorage.setItem for all cases but resetCart and deleteCart?
for load_cart use localStorage.getItem("KenzieCart")

-do I alter the useEffect?
yes, need to add case for init_saved_cart





# se-mern-ecommerce-app

## Run Client/Server for Development

First, install all of the dependencies.  You should only need to do this once.

```
npm install
```

```
npm start
```

## Frontend

The client was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Backend

The server uses MongoDB, make sure you have it installed in your system.

Install MongoDB and start your server: [MongoDB instructions](https://docs.mongodb.com/manual/administration/install-community/)

Seed database with sample data:

```
npm run seed
```

---

## Student Challenges

### Implement Saved Cart on client

1. Update useCart hook to add cart state to localstorage.
2. Add actions for loading, updating, deleting
3. Update the reducer for each
4. Add useEffect to initialize saved cart on load

### Create Order on successful checkout

1. Update order post route on server to create new Order in db
2. Return Order ID
3. Display ID in successful order confirmation on client side

### Validate Form / Credit Card details before submitting order

1. Add handler to inputs [Consult React Payments README](https://github.com/medipass/react-payment-inputs#with-hooks)
2. Disable **Complete Order** button until valid
3. Validate before submitting in **handlePlaceOrder()**
