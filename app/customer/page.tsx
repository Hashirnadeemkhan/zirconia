'use client';

import { useUser } from '@clerk/nextjs';

const mockOrders = [
  { id: 1, status: 'Shipped', date: '2023-01-01' },
  { id: 2, status: 'Delivered', date: '2023-01-02' },
  { id: 3, status: 'Processing', date: '2023-01-03' },
];

export default function CustomerPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (user?.publicMetadata.role !== 'customer') {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <h1>Customer Dashboard</h1>
      <p>Welcome, {user.firstName}!</p>
      <h2>Order Tracking</h2>
      <ul>
        {mockOrders.map((order) => (
          <li key={order.id}>
            Order #{order.id} - {order.status} ({order.date})
          </li>
        ))}
      </ul>
    </div>
  );
} 