import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartTotalPrice, getCartTotalQuantity } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  const totalPrice = useSelector(getCartTotalPrice);
  const totalQuantity = useSelector(getCartTotalQuantity);

  if (totalQuantity === 0) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalQuantity} PIZZAS</span>
        {/* <span>${totalPrice.toFixed(2)}</span> */}
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
