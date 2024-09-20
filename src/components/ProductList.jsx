import PropTypes from "prop-types";

const products = [
  { id: 1, name: "Product A", price: 100, stock: 5, image: "https://i5.walmartimages.com/asr/038cdd33-01c0-41f0-a1d1-9c63de622744_5.408267355efd544b5065827938323963.png" },
  { id: 2, name: "Product B", price: 150, stock: 2, image: "https://i5.walmartimages.com/asr/038cdd33-01c0-41f0-a1d1-9c63de622744_5.408267355efd544b5065827938323963.png" },
  { id: 3, name: "Product B", price: 150, stock: 2, image: "https://i5.walmartimages.com/asr/038cdd33-01c0-41f0-a1d1-9c63de622744_5.408267355efd544b5065827938323963.png" },
  { id: 4, name: "Product C", price: 200, stock: 7, image: "https://i5.walmartimages.com/asr/038cdd33-01c0-41f0-a1d1-9c63de622744_5.408267355efd544b5065827938323963.png" },
  { id: 5, name: "Product D", price: 200, stock: 12, image: "https://i5.walmartimages.com/asr/038cdd33-01c0-41f0-a1d1-9c63de622744_5.408267355efd544b5065827938323963.png" },
  { id: 6, name: "Product E", price: 200, stock: 23, image: "https://i5.walmartimages.com/asr/038cdd33-01c0-41f0-a1d1-9c63de622744_5.408267355efd544b5065827938323963.png" },
  { id: 7, name: "Product F", price: 200, stock: 6, image: "https://i5.walmartimages.com/asr/038cdd33-01c0-41f0-a1d1-9c63de622744_5.408267355efd544b5065827938323963.png" },
  { id: 8, name: "Product G", price: 200, stock: 3, image: "https://i5.walmartimages.com/asr/038cdd33-01c0-41f0-a1d1-9c63de622744_5.408267355efd544b5065827938323963.png" },
  { id: 9, name: "Product H", price: 200, stock: 1, image: "https://i5.walmartimages.com/asr/038cdd33-01c0-41f0-a1d1-9c63de622744_5.408267355efd544b5065827938323963.png" },
  { id: 10, name: "Product I", price: 200, stock: 10, image: "https://i5.walmartimages.com/asr/038cdd33-01c0-41f0-a1d1-9c63de622744_5.408267355efd544b5065827938323963.png" },
  { id: 11, name: "Product I", price: 200, stock: 10, image: "https://i5.walmartimages.com/asr/038cdd33-01c0-41f0-a1d1-9c63de622744_5.408267355efd544b5065827938323963.png" },
  { id: 12, name: "Product I", price: 200, stock: 10, image: "https://i5.walmartimages.com/asr/038cdd33-01c0-41f0-a1d1-9c63de622744_5.408267355efd544b5065827938323963.png" }
];

const ProductList = ({ addToCart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p>Price: ${product.price}</p>
          <p>Stock: {product.stock > 0 ? product.stock : 'Out of stock'}</p>
          <button
            onClick={() => addToCart(product)}
            className={`px-4 py-2 rounded text-white ${product.stock > 0 ? 'bg-blue-500' : 'bg-gray-500 cursor-not-allowed'}`}
            disabled={product.stock === 0}  
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

ProductList.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default ProductList;
