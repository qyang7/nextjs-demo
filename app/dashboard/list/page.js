"use client";

import { useState, useEffect } from 'react';

export default function ListPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock data for the list
  const mockItems = [
    { id: 1, name: 'Project Alpha', description: 'A new project for client A', status: 'active', priority: 'high', createdAt: '2024-01-15' },
    { id: 2, name: 'Task Beta', description: 'Complete documentation', status: 'completed', priority: 'medium', createdAt: '2024-01-10' },
    { id: 3, name: 'Bug Fix #123', description: 'Fix login issue', status: 'in-progress', priority: 'high', createdAt: '2024-01-12' },
    { id: 4, name: 'Feature Request', description: 'Add export functionality', status: 'pending', priority: 'low', createdAt: '2024-01-05' },
    { id: 5, name: 'Meeting Notes', description: 'Weekly team meeting', status: 'active', priority: 'medium', createdAt: '2024-01-08' },
    { id: 6, name: 'API Integration', description: 'Connect to external API', status: 'in-progress', priority: 'high', createdAt: '2024-01-03' },
    { id: 7, name: 'UI Redesign', description: 'Update dashboard interface', status: 'pending', priority: 'medium', createdAt: '2024-01-01' },
    { id: 8, name: 'Database Migration', description: 'Migrate to new database', status: 'completed', priority: 'high', createdAt: '2023-12-28' },
    { id: 9, name: 'Security Audit', description: 'Review security protocols', status: 'active', priority: 'high', createdAt: '2023-12-25' },
    { id: 10, name: 'Documentation Update', description: 'Update user guides', status: 'completed', priority: 'low', createdAt: '2023-12-20' },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setItems(mockItems);
      setLoading(false);
    }, 800);
  }, []);

  // Filter items based on search and status
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Items List</h1>
          <p className="text-gray-600 mt-2">Manage and view all your items in one place</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search by name or description..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => {
                  // Add new item functionality
                  alert('Add new item functionality would go here');
                }}
              >
                + Add New Item
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500">Total Items</div>
            <div className="text-2xl font-bold">{items.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500">Active</div>
            <div className="text-2xl font-bold text-green-600">
              {items.filter(item => item.status === 'active').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500">In Progress</div>
            <div className="text-2xl font-bold text-yellow-600">
              {items.filter(item => item.status === 'in-progress').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500">Completed</div>
            <div className="text-2xl font-bold text-blue-600">
              {items.filter(item => item.status === 'completed').length}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No items found. Try adjusting your search or filters.
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{item.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-600 max-w-xs truncate">{item.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                            onClick={() => alert(`View details for ${item.name}`)}
                          >
                            View
                          </button>
                          <button
                            className="text-green-600 hover:text-green-900 text-sm font-medium"
                            onClick={() => alert(`Edit ${item.name}`)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900 text-sm font-medium"
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete ${item.name}?`)) {
                                setItems(items.filter(i => i.id !== item.id));
                              }
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(endIndex, filteredItems.length)}</span> of{' '}
                  <span className="font-medium">{filteredItems.length}</span> results
                </div>
                <div className="flex space-x-2">
                  <button
                    className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`px-3 py-1 border rounded text-sm ${
                        currentPage === page
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              className="bg-green-50 text-green-700 px-4 py-3 rounded-lg border border-green-200 hover:bg-green-100 transition-colors"
              onClick={() => alert('Export functionality would go here')}
            >
              Export to CSV
            </button>
            <button
              className="bg-blue-50 text-blue-700 px-4 py-3 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
              onClick={() => alert('Bulk edit functionality would go here')}
            >
              Bulk Edit
            </button>
            <button
              className="bg-purple-50 text-purple-700 px-4 py-3 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors"
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
                setCurrentPage(1);
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}