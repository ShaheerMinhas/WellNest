import React, { useState, useEffect } from 'react';
import AdminHeader from "../../../components/admin-components/header";
import AdminSidebar from "../../../components/admin-components/sidebar";
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  role?: string; // Optionally include role if available
}

const AdminUserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // Ensure users is always an array
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  const [selectedMenu, setSelectedMenu] = useState<string>('User Management'); // Track selected menu

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  // Fetch total users using the token
  const fetchTotalUsers = async () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (!token) {
      setError('No token found in localStorage.');
      return;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token to get payload
      const companyId = decodedToken.companyId; // Get companyId from the token payload

      if (!companyId) {
        setError('No company ID found in token.');
        return;
      }

      const response = await axios.post(
        'http://localhost:3000/api/admin/users/totalUsers',
        { companyId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setTotalUsers(response.data.totalUsers); // Store the total users count
    } catch (err) {
      setError('Failed to fetch total users');
    }
  };

  useEffect(() => {
    // Fetch users data and total user count
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found in localStorage.');
        return;
      }

      try { // Decode JWT token to get payload
        const companyId = localStorage.getItem('companyId') // Get companyId from the token payload

        if (!companyId) {
          setError('No company ID found in token.');
          return;
        }

        const usersResponse = await axios.post(
          `http://localhost:3000/api/admin/users/allEmployees`,
          { companyId }, // Send companyId in request body
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log(usersResponse.data); // Log response to verify the structure

        // Ensure the data is an array and the expected structure
        if (usersResponse.data && Array.isArray(usersResponse.data.employees)) {
          setUsers(usersResponse.data.employees); // Set users data if it's an array
        } else {
          setError('Invalid response format for users.');
        }

        // Fetch total users
        await fetchTotalUsers();
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar selectedMenu={selectedMenu} onMenuClick={handleMenuClick} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-[260px]">
        <AdminHeader />
        <main className="p-4">
          <h2 className="text-2xl font-semibold mb-4">User Management</h2>

          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Total Users: {totalUsers}</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border">ID</th>
                      <th className="px-4 py-2 border">Name</th>
                      <th className="px-4 py-2 border">Email</th>
                      <th className="px-4 py-2 border">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Ensure users is always an array */}
                    {(Array.isArray(users) && users.length > 0) ? (
                      users.map(user => (
                        <tr key={user.id}>
                          <td className="px-8 py-2 border">{user.id}</td>
                          <td className="px-4 py-2 border">{user.name}</td>
                          <td className="px-4 py-2 border">{user.email}</td>
                          <td className="px-4 py-2 border">{user.role ?? 'N/A'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-4 py-2 border-b">No users found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminUserManagement;
