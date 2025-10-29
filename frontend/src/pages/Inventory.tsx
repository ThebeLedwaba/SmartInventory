import React, { useState, useEffect } from 'react'

interface InventoryItem {
  _id: string
  name: string
  description: string
  quantity: number
  status: string
}

const Inventory: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/inventory')
      const data = await response.json()
      setItems(data)
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'all' || item.status === statusFilter)
  )

  if (loading) {
    return (
      <div className="p-6 animate-fade-in">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <div className="text-lg text-gray-600">Loading inventory...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Inventory <span className="text-gradient">Management</span>
          </h1>
          <p className="text-gray-600">Manage your inventory items and stock levels</p>
        </div>
        <button className="btn btn-primary transform hover:scale-105 transition-transform duration-200">
          <span className="mr-2">‚ûï</span>
          Add New Item
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="card p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">Ì¥ç</span>
              </div>
              <input
                type="text"
                placeholder="Search items by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
            </div>
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-input md:w-48"
          >
            <option value="all">All Status</option>
            <option value="in-stock">In Stock</option>
            <option value="out-of-stock">Out of Stock</option>
            <option value="low-stock">Low Stock</option>
          </select>
        </div>
        
        {/* Results Count */}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Showing {filteredItems.length} of {items.length} items
          </span>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear search
            </button>
          )}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                <th className="table-header rounded-tl-xl">Name</th>
                <th className="table-header">Description</th>
                <th className="table-header">Quantity</th>
                <th className="table-header">Status</th>
                <th className="table-header rounded-tr-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="table-cell font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="table-cell text-gray-500">
                    {item.description || 'No description'}
                  </td>
                  <td className="table-cell">
                    <span className={`font-semibold ${
                      item.quantity === 0 ? 'text-red-600' : 
                      item.quantity <= 5 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {item.quantity}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className={`status-badge ${
                      item.status === 'in-stock' ? 'status-in-stock' :
                      item.status === 'out-of-stock' ? 'status-out-of-stock' :
                      'status-low-stock'
                    }`}>
                      {item.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors duration-200">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">Ì≥¶</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-500">
                {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first inventory item'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Inventory
