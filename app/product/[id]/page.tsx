import { prisma } from '../../../lib/prisma';
import Link from 'next/link';
import { FiHeart } from 'react-icons/fi';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-serif uppercase tracking-[0.4em]">
        Product Not Found
      </div>
    );
  }

  const sizes = ['S', 'M', 'L', 'XL'];

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-28 px-6 md:px-12 pb-24">

      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <div className="mb-10">
          <Link
            href={`/generations/${product.category}`}
            className="text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors"
          >
            ← Back To Archive
          </Link>
        </div>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Product Image */}
          <div className="relative overflow-hidden border border-white/10 bg-white/5">

            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
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
                {sizes.map((size) => (
                  <button
                    key={size}
                    className="h-14 w-14 border border-white/10 text-sm tracking-[0.2em] uppercase hover:border-white hover:bg-white hover:text-black transition-all"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">

              <button className="flex-1 bg-white text-black py-5 text-[10px] uppercase tracking-[0.35em] font-bold hover:bg-zinc-200 transition-colors">
                Add To Cart
              </button>

              <button className="h-[60px] w-[60px] border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <FiHeart className="h-5 w-5" />
              </button>
            </div>

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
        </div>
      </div>
    </main>
  );
}