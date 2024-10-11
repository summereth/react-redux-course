import DeleteItem from './DeleteItem';
import UpdateItemQty from './UpdateItemQty';
import { formatCurrency } from '../../utils/helpers';

function CartItem({ item }) {
  const { id, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQty pizzaId={id} quantity={quantity} />
        <DeleteItem pizzaId={id} />
      </div>
    </li>
  );
}

export default CartItem;
