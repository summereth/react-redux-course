// import { useState } from 'react';

import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const formErrors = useActionData();

  return (
    <div>
      <h2>Ready to order? Let&apos;s go!</h2>

      <Form method="POST" action="/order/new">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          {/* form data only allows string type. Thus convert cart object to JSON string */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)}></input>
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Placing Order...' : 'Order now'}
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    // parse JSON string into object
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  };

  const error = {};
  if (!isValidPhone(order.phone)) {
    error.phone =
      'Please enter a valid phone number. We might use it to contact you.';
  }

  // if there's error, return the error object, which could be access in component with custom hook (useActionData)
  if (Object.keys(error).length > 0) return error;

  const createdOrder = await createOrder(order);
  return redirect(`/order/${createdOrder.id}`);
}

export default CreateOrder;
