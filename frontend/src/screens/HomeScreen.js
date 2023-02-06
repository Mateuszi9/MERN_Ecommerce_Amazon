import { Link } from 'react-router-dom';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';

//define reducer function (current state, action)
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }; //keep previus state using ... and change loading to true
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false }; //data in action is payload
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  //define useReducer [objects, dispatch(to call action)](reducer, default state)
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });

  //state to save products from backend
  //const [products, setProducts] = useState([]);

  //useEffect (function, array), run after rendering component
  useEffect(() => {
    //define fetchData async function
    const fetchData = async () => {
      //right befor fetch data i want to show loading message with reducer
      //dispatch({type: ___, payload: ___})
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products'); //send ajax request to address and put result in 'result'
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      //setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div> {error}</div>
        ) : (
          products.map((product) => (
            <div className="product" key={product.slug}>
              <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="product-info">
                <Link to={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </Link>
                <p>{product.price}</p>
                <button>Add to card</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
