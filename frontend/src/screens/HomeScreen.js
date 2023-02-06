import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function HomeScreen() {
  //state to save products from backend
  const [products, setProducts] = useState([]);

  //useEffect (function, array), run after rendering component
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/products'); //send ajax request to address and put result in 'result'
      setProducts(result.data);
    };
    fetchData();
  }, []);
  //define fetchData async function

  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {products.map((product) => (
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
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
