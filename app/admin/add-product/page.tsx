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

  // This triggers the hidden Windows/Mobile file picker
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, imageFile: file });
      // Create a local URL to show the image preview immediately
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Ready for GCP:", formData);
    alert(`Success: ${formData.name} is ready for the archive.`);
  };

  return (
    <main className="min-h-screen bg-black text-white p-10 md:p-24 flex flex-col items-center">
      <h1 className="text-3xl font-serif uppercase tracking-[0.4em] mb-12">Stock Entry</h1>
      
      <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-8">
        
        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*" // This triggers Gallery/Camera options on Mobile
          className="hidden" 
        />

        {/* Clickable Upload Area */}
        <div 
          onClick={handleUploadClick}
          className="relative border-2 border-dashed border-white/10 h-64 flex items-center justify-center text-center hover:border-white/30 transition-colors cursor-pointer overflow-hidden"
        >
          {preview ? (
            <img src={preview} alt="Preview" className="h-full w-full object-cover" />
          ) : (
            <p className="text-sm uppercase tracking-widest text-white/40">Upload Product Visual</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6">
          <input 
            type="text" 
            placeholder="Product Name" 
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="bg-transparent border-b border-white/20 py-4 focus:border-white outline-none transition-colors"
          />
          
          <div className="flex gap-4">
            <input 
              type="number" 
              placeholder="Price (INR)" 
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="w-1/3 bg-transparent border-b border-white/20 py-4 focus:border-white outline-none transition-colors"
            />
            
            <select 
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-1/3 bg-black border-b border-white/20 py-4 focus:border-white outline-none uppercase text-[10px] tracking-widest"
            >
              {generations.map((gen) => (
                <option key={gen.id} value={gen.id}>{gen.title}</option>
              ))}
            </select>

            <select 
              onChange={(e) => setFormData({...formData, subCategory: e.target.value})}
              className="w-1/3 bg-black border-b border-white/20 py-4 focus:border-white outline-none uppercase text-[10px] tracking-widest"
            >
              <option value="clothing">Clothing</option>
              <option value="accessories">Accessories</option>
              <option value="footwear">Footwear</option>
            </select>
          </div>
          
          <textarea 
            placeholder="Material & Fit Description" 
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="bg-transparent border-b border-white/20 py-4 focus:border-white outline-none h-32"
          />
        </div>

        <button type="submit" className="w-full py-6 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-zinc-200 transition-colors">
          Publish to Storefront
        </button>
      </form>
    </main>
  );
}