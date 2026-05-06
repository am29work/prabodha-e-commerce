'use client';

import { useState, useRef } from 'react';
import { generations } from '../../../lib/data';

export default function AdminAddProduct() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: generations[0]?.id || '',
    subCategory: 'clothing',
    description: '',
    imageFile: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFormData({
        ...formData,
        imageFile: file,
      });

      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    if (!formData.imageFile) {
      alert('Please select an image');
      return;
    }

    // STEP 1 — Upload image to GCP bucket
    const uploadFormData = new FormData();

    uploadFormData.append('file', formData.imageFile);

    const uploadResponse = await fetch('/api/upload', {
      method: 'POST',
      body: uploadFormData,
    });

    if (!uploadResponse.ok) {
      throw new Error('Image upload failed');
    }

    const uploadData = await uploadResponse.json();

    const imageUrl = uploadData.imageUrl;

    // STEP 2 — Save product into PostgreSQL
    const response = await fetch('/api/products/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        price: Number(formData.price),
        category: formData.category,
        subCategory: formData.subCategory,
        description: formData.description,
        imageUrl,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create product');
    }

    const data = await response.json();

    console.log('Created Product:', data);

    alert(`${data.name} successfully added to the database.`);

  } catch (error) {
    console.error(error);

    alert('Something went wrong.');
  }
};

  return (
    <main className="min-h-screen bg-black text-white p-10 md:p-24 flex flex-col items-center">
      <h1 className="text-3xl font-serif uppercase tracking-[0.4em] mb-12">
        Stock Entry
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl space-y-8"
      >
        {/* Hidden File Input */}
        <input
          id="product-image-upload"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* Upload Area */}
        <label
          htmlFor="product-image-upload"
          className="relative border-2 border-dashed border-white/10 h-64 flex items-center justify-center text-center hover:border-white/30 transition-colors cursor-pointer overflow-hidden block"
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <p className="text-sm uppercase tracking-widest text-white/40">
              Upload Product Visual
            </p>
          )}
        </label>

        <div className="grid grid-cols-1 gap-6">
          <input
            type="text"
            placeholder="Product Name"
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="bg-transparent border-b border-white/20 py-4 focus:border-white outline-none transition-colors"
          />

          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Price (INR)"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: e.target.value,
                })
              }
              className="w-1/3 bg-transparent border-b border-white/20 py-4 focus:border-white outline-none transition-colors"
            />

            <select
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
              className="w-1/3 bg-black border-b border-white/20 py-4 focus:border-white outline-none uppercase text-[10px] tracking-widest"
            >
              {generations.map((gen) => (
                <option key={gen.id} value={gen.id}>
                  {gen.title}
                </option>
              ))}
            </select>

            <select
              onChange={(e) =>
                setFormData({
                  ...formData,
                  subCategory: e.target.value,
                })
              }
              className="w-1/3 bg-black border-b border-white/20 py-4 focus:border-white outline-none uppercase text-[10px] tracking-widest"
            >
              <option value="clothing">Clothing</option>
              <option value="accessories">Accessories</option>
              <option value="footwear">Footwear</option>
            </select>
          </div>

          <textarea
            placeholder="Material & Fit Description"
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            className="bg-transparent border-b border-white/20 py-4 focus:border-white outline-none h-32"
          />
        </div>

        <button
          type="submit"
          className="w-full py-6 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-zinc-200 transition-colors"
        >
          Publish to Storefront
        </button>
      </form>
    </main>
  );
}