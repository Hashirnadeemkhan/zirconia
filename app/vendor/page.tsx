"use client"
import { useUser } from '@clerk/nextjs';
import { useState, FormEvent, ChangeEvent, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function VendorPage() {
  const { user, isLoaded } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  if (!isLoaded) return <div>Loading...</div>;
  if (user?.publicMetadata.role !== 'vendor') {
    return <div>Access Denied</div>;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setProducts([...products, { id: products.length + 1, name: newProduct.name, price: Number(newProduct.price) }]);
    setNewProduct({ name: '', price: '' });
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div>
      <h1>Vendor Dashboard</h1>
      <p>Welcome, {user.firstName}!</p>
      <h2>Your Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
} 