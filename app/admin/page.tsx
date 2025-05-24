import { useUser } from '@clerk/nextjs';

export default function AdminPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (user?.publicMetadata.role !== 'admin') {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.firstName}!</p>
      <h2>Product Management</h2>
      <p>Manage products here.</p>
    </div>
  );
} 