type Product = {
    id: number;
    imageUrl: string;
    badgeText?: string;
    name: string;
    description: string;
    originalPrice?: string;
    discountedPrice: string;
  };
  
  const products: Product[] = [
    {
      id: 1,
      imageUrl: "/sample1.jfif",
      badgeText: "할인 이벤트!",
      name: "헬스인들을 위한 오리지널 닭가슴살!",
      description: "뉴트리핏 오리지널",
      discountedPrice: "개당 2,100원",
    },
    {
      id: 2,
      imageUrl: "/sample2.jfif",
      badgeText: "첫 판매 이벤트!",
      name: "닭가슴살 적응을 위한 마라맛 닭가슴살",
      originalPrice: "3,200원",
      discountedPrice: "2,800원",
      description: "뉴트리핏 마라",
    },
    {
      id: 3,
      imageUrl: "/sample3.jfif",
      badgeText: "신상품!",
      name: "자메이카 닭가슴살",
      discountedPrice: "2,700원",
      description: "뉴트리핏 자메이카",
    },
];

export default function ProductList() {
    return (
        <div className="flex justify-center space-x-4 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-md rounded-lg overflow-hidden w-80 flex flex-col"
        >
          <div className="relative">
            {product.badgeText && (
              <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold rounded-full px-2 py-1 z-10">
                {product.badgeText}
              </span>
            )}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-60 object-cover"
            />
          </div>
          <div className="flex flex-col justify-between flex-grow p-4">
            <div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-700 mt-2">
                {product.originalPrice && (
                  <span className="line-through mr-2">{product.originalPrice}</span>
                )}
                <span className="text-pink-600 font-bold">
                  {product.discountedPrice}
                </span>
              </p>
            </div>
            <div className="mt-4">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700 transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    );
}