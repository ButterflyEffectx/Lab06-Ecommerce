import PropTypes from "prop-types";

const ProductList = ({ addToCart }) => {
  const products = [
    {
      id: 1,
      name: "เก้าอี้พลาสติกสำหรับทำงาน",
      price: 150,
      stock: 5,
      image:
        "https://s.isanook.com/ns/0/ui/1586/7930818/gal-7930818-20191022051922-d8a7e89.jpg",
    },
    {
      id: 2,
      name: "ฟลุ๊ค",
      price: 999999,
      stock: 0,
      image:
        "https://media.discordapp.net/attachments/649217874568675328/1286693965592006729/D1F04DA1-DA15-4C6A-8530-7F18939AD629.jpg?ex=66eed6a3&is=66ed8523&hm=48506d5410f3af439e8a17643b8cce4b7d0315d76ceeeefa1583be76adeddf8a&=&format=webp&width=296&height=526",
    },
    {
      id: 3,
      name: "ยาหม่อง",
      price: 50,
      stock: 2,
      image:
        "https://welovesabuyjai.com/cdn/shop/products/302100600-Herbal-Balm-Formula1-HongThai-1_1024x.JPG?v=1579882059",
    },
    {
      id: 4,
      name: "ไม้ตบยุง",
      price: 3000,
      stock: 7,
      image:
        "https://www.technologychaoban.com/wp-content/uploads/2019/01/666.jpg",
    },
    {
      id: 5,
      name: "ปูไทยอร่อยถึงใจเด็กไทยทุกคน",
      price: 5,
      stock: 56,
      image:
        "https://www.bhankanomthai.com/media/catalog/product/cache/1/image/378x378/9df78eab33525d08d6e5fb8d27136e95/p/h/ph001.jpg",
    },
    {
      id: 6,
      name: "ซอยจุ๊",
      price: 390,
      stock: 23,
      image:
        "https://www.unileverfoodsolutions.co.th/dam/global-ufs/mcos/SEA/calcmenu/recipes/TH-recipes/fish-&-other-seafood-dishes/%E0%B8%A3%E0%B8%B4%E0%B8%9A%E0%B8%AD%E0%B8%B2%E0%B8%A2%E0%B8%AA%E0%B9%80%E0%B8%95%E0%B9%8A%E0%B8%81/main-header.jpg",
    },
    {
      id: 7,
      name: "จอคอม 240hz",
      price: 4500,
      stock: 30,
      image:
        "https://i.ytimg.com/vi/raJv1oe1MuQ/hqdefault.jpg",
    },
    {
      id: 8,
      name: "ปลาดุก",
      price: 200,
      stock: 3,
      image:
        "https://cdn.readawrite.com/articles/9903/9902312/thumbnail/large.gif?1",
    },
    {
      id: 9,
      name: "ยาใจ",
      price: 1,
      stock: 0,
      image:
        "https://media.discordapp.net/attachments/649217874568675328/1286695754819440791/image.png?ex=66eed84d&is=66ed86cd&hm=d05348e2ac6dedb8173bee39b902642f83d4e7982badf5049e5332c4a3fc3349&=&format=webp&quality=lossless&width=843&height=527",
    },
    {
      id: 10,
      name: "หมูเด้ง",
      price: 20,
      stock: 1,
      image:
        "https://medias.thansettakij.com/uploads/images/md/2024/09/EdjJciUv9Fkm9gjkXeHh.webp?x-image-process=style/md-webp",
    },
    {
      id: 11,
      name: "รถหรู",
      price: 1,
      stock: 1,
      image:
        "https://inattt.com/wp-content/uploads/2011/09/nwy-racing-2_15.jpg",
    },
    {
      id: 12,
      name: "ข้าวเหนียว",
      price: 10,
      stock: 4,
      image:
        "https://s.isanook.com/he/0/ud/4/24185/sticky-rice.jpg",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4 flex flex-col">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover mb-2"
          />
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p>Price: {product.price} THB</p>
          <p>Stock: {product.stock > 0 ? product.stock : "Out of stock"}</p>
          <button
            onClick={() => addToCart(product)}
            className={`px-4 py-2 rounded text-white mt-auto w-1/2 md:w-full ${
              product.stock > 0
                ? "bg-blue-500"
                : "bg-gray-500 cursor-not-allowed"
            }`}
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
