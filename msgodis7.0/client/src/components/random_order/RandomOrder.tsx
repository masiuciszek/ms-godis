/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import * as React from 'react';
import { connect } from 'react-redux';
import { getAllProducts } from '../../redux/shop/shop.actions';
import { AppState } from '../../redux';
import { selectProducts } from '../../redux/shop/shop.selector';
import { IProduct } from '../../redux/shop/shop.types';
import { selectProducerIsLoading } from '../../redux/producer/producer.select';
import { addProduct } from '../../redux/cart/cart.actions';


interface Props {
  allProducts: IProduct[];
  getAllProducts: () => Promise<void>;
  isLoading: boolean;
  addProduct: (product: IProduct) => void;
}

const RandomOrder: React.FC<Props> = ({
  allProducts, getAllProducts, addProduct,
}) => {
  const [randomCart, setRandomCart] = React.useState<any>([]);

  React.useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);


  const handleClick = (): void => {
    const r: any = [];
    for (let i = 0; i <= allProducts.length / 2; i++) {
      const randomProduct = allProducts[Math.floor(Math.random() * allProducts.length)];
      r.push(randomProduct);
    }
    const set = new Set(r);
    const backToArray = Array.from(set);
    setRandomCart(backToArray);
    getRandomOrder();
  };


  function getRandomOrder() {
    const [a, b, c, d, e] = randomCart;
    if (a !== undefined) {
      addProduct(a);
    }
    if (b !== undefined) {
      addProduct(b);
    }
    if (c !== undefined) {
      addProduct(c);
    }
    if (d !== undefined) {
      addProduct(d);
    }
    if (e !== undefined) {
      addProduct(e);
    }
  }


  return (
    <div className="Confused-wrapper">
      <h4>Confused? </h4>
      <p>Let's make a order for you</p>
      <button type="button" onClick={handleClick} id="RandomOrderBtn">Get a random Order</button>
      {' '}
    </div>
  );
};


const mapStateToProps = (state: AppState) => ({
  allProducts: selectProducts(state),
  isLoading: selectProducerIsLoading(state),
});


export default connect(mapStateToProps, { getAllProducts, addProduct })(RandomOrder);
