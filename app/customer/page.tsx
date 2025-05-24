'use client';

const mockOrders = [
  { id: 1, status: 'Shipped', date: '2023-01-01' },
  { id: 2, status: 'Delivered', date: '2023-01-02' },
  { id: 3, status: 'Processing', date: '2023-01-03' },
];

export default function CustomerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Order Tracking</h2>
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <span className="font-medium">Order #{order.id}</span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
              <p className="text-gray-600 mt-2">Date: {order.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 