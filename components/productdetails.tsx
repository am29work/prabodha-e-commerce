'use client';

import { useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  subCategory: string;
};

export default function ProductDetails({
  product,
}: {
  product: Product;
}) {
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] =
    useState('M');

  const [addedToCart, setAddedToCart] =
    useState(false);

  const sizes = ['S', 'M', 'L', 'XL'];

  function handleAddToCart() {
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      imageUrl: product.imageUrl,
      size: selectedSize,
      quantity: 1,
    });

    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 2500);
  }

  return (
    <div className="flex flex-col">

      {/* Category */}
      <p className="text-[10px] uppercase tracking-[0.5em] text-white/40 mb-6">
        {product.category}
      </p>

      {/* Product Name */}
      <h1 className="text-4xl md:text-6xl font-serif uppercase leading-[0.9] mb-8">
        {product.name}
      </h1>

      {/* Price */}
      <p className="text-xl tracking-[0.3em] uppercase text-white/90 mb-10">
        ₹ {product.price}
      </p>

      {/* Description */}
      <p className="text-white/70 leading-relaxed font-light text-base md:text-lg mb-12 max-w-xl">
        {product.description}
      </p>

      {/* Size Selection */}
      <div className="mb-12">

        <div className="flex items-center justify-between mb-5">

          <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/50">
            Select Size
          </h3>

          <button className="text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors">
            Size Guide
          </button>
        </div>

        <div className="flex gap-4 flex-wrap">

          {sizes.map((size) => {
            const isSelected =
              selectedSize === size;

            return (
              <button
                key={size}
                onClick={() =>
                  setSelectedSize(size)
                }
                className={`h-14 w-14 border text-sm tracking-[0.2em] uppercase transition-all ${
                  isSelected
                    ? 'bg-white text-black border-white'
                    : 'border-white/10 hover:border-white hover:bg-white hover:text-black'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">

        <button
          onClick={handleAddToCart}
          className="flex-1 bg-white text-black py-5 text-[10px] uppercase tracking-[0.35em] font-bold hover:bg-zinc-200 transition-colors"
        >
          Add To Cart
        </button>

        <button className="h-[60px] w-[60px] border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
          <FiHeart className="h-5 w-5" />
        </button>
      </div>

      {/* Added To Cart Feedback */}
      {addedToCart && (
        <div className="mb-10 border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-xl">

          <div className="flex items-center justify-between gap-6">

            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-2">
                Added To Cart
              </p>

              <p className="text-sm text-white">
                {product.name} ({selectedSize})
              </p>
            </div>

            <a
              href="/cart"
              className="text-[10px] uppercase tracking-[0.35em] text-white hover:text-zinc-300 transition-colors"
            >
              Go To Cart →
            </a>
          </div>
        </div>
      )}

      {/* Product Meta */}
      <div className="border-t border-white/10 pt-8 space-y-4 text-[11px] uppercase tracking-[0.25em] text-white/40">

        <div className="flex justify-between">
          <span>Category</span>
          <span>{product.category}</span>
        </div>

        <div className="flex justify-between">
          <span>Subcategory</span>
          <span>{product.subCategory}</span>
        </div>

        <div className="flex justify-between">
          <span>Archive ID</span>
          <span>{product.id.slice(0, 8)}</span>
        </div>
      </div>
    </div>
  );
}
