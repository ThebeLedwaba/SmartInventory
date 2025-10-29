import React, { useState, useEffect } from 'react'

interface InventoryStats {
  total: number
  inStock: number
  outOfStock: number
  lowStock: number
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<InventoryStats>({
    total: 0,
    inStock: 0,
    outOfStock: 0,
    lowStock: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setError(null)
      const response = await fetch('/api/inventory')
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      
      const items = await response.json()
      
      const stats = {
        total: items.length,
        inStock: items.filter((item: any) => item.status === 'in-stock').length,
        outOfStock: items.filter((item: any) => item.status === 'out-of-stock').length,
        lowStock: items.filter((item: any) => item.quantity <= 5 && item.quantity > 0).length // Low stock if quantity <= 5 but not zero
      }
      
      setStats(stats)
    } catch (error) {
      console.error('Error fetching stats:', error)
      setError('Unable to connect to backend API. Make sure the backend server is running on port 5000.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 animate-fade-in">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <div className="text-lg text-gray-600">Loading dashboard...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 animate-fade-in">
        <div className="card p-6 border-l-4 border-red-500 bg-red-50">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">‚ö†Ô∏è</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-red-800">Connection Error</h3>
              <p className="text-red-700 mt-2">{error}</p>
              <button 
                onClick={fetchStats}
                className="mt-4 btn btn-secondary"
              >
                Retry Connection
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Inventory <span className="text-gradient">Dashboard</span>
        </h1>
        <p className="text-gray-600">Welcome to your smart inventory management system</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">Ì≥¶</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-700">Total Items</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">‚úÖ</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-700">In Stock</h3>
              <p className="text-3xl font-bold text-green-600">{stats.inStock}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">‚ùå</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-700">Out of Stock</h3>
              <p className="text-3xl font-bold text-red-600">{stats.outOfStock}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">‚ö†Ô∏è</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-700">Low Stock</h3>
              <p className="text-3xl font-bold text-yellow-600">{stats.lowStock}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full btn btn-primary transform hover:scale-105 transition-transform duration-200">
              <span className="mr-2">‚ûï</span>
              Add New Item
            </button>
            <button className="w-full btn btn-secondary transform hover:scale-105 transition-transform duration-200">
              <span className="mr-2">Ì≥ã</span>
              View Low Stock Items
            </button>
            <button className="w-full btn btn-secondary transform hover:scale-105 transition-transform duration-200">
              <span className="mr-2">Ì≥ä</span>
              Generate Report
            </button>
          </div>
        </div>

        <div className="card p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">System Status</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-700 font-medium">Backend API</span>
              </div>
              <span className="text-green-600 font-semibold">Online</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-700 font-medium">Database</span>
              </div>
              <span className="text-green-600 font-semibold">Connected</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-gray-700 font-medium">Last Updated</span>
              </div>
              <span className="text-blue-600 font-medium">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
