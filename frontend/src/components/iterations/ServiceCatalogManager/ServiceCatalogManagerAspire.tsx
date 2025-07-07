import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Save, X, Package, Clock, DollarSign } from 'lucide-react';

interface ServiceCatalogItem {
  id: string;
  name: string;
  description: string;
  category: string;
  unit: string;
  baseCost: number;
  basePrice: number;
  defaultMarkupPercentage: number;
  estimatedHours: number;
  isActive: boolean;
  itemCount: number; // Number of items in this service
}

interface ServiceCatalogManagerAspireProps {
  services: ServiceCatalogItem[];
  categories: string[];
  onCreateService: (service: Omit<ServiceCatalogItem, 'id'>) => void;
  onUpdateService: (id: string, service: Partial<ServiceCatalogItem>) => void;
  onDeleteService: (id: string) => void;
  onManageItems: (serviceId: string) => void;
}

/**
 * Service Catalog Manager - Aspire professional pattern
 * Admin interface for managing standardized landscaping services
 * 
 * Design References:
 * - Aspire: professional B2B admin interfaces
 * - Commercial service management
 * - Enterprise-grade data management
 * 
 * Key Features:
 * - Service categorization and filtering
 * - Cost and pricing management
 * - Service item composition
 * - Professional admin workflow
 */
const ServiceCatalogManagerAspire: React.FC<ServiceCatalogManagerAspireProps> = ({
  services,
  categories,
  onCreateService,
  onUpdateService,
  onDeleteService,
  onManageItems
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showInactiveServices, setShowInactiveServices] = useState(false);
  const [editingService, setEditingService] = useState<ServiceCatalogItem | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [formData, setFormData] = useState<Partial<ServiceCatalogItem>>({
    name: '',
    description: '',
    category: '',
    unit: 'sq ft',
    baseCost: 0,
    basePrice: 0,
    defaultMarkupPercentage: 50,
    estimatedHours: 0,
    isActive: true
  });

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || service.category === selectedCategory;
    const matchesActive = showInactiveServices || service.isActive;
    
    return matchesSearch && matchesCategory && matchesActive;
  });

  const handleSaveService = () => {
    if (editingService) {
      onUpdateService(editingService.id, formData);
      setEditingService(null);
    } else {
      onCreateService(formData as Omit<ServiceCatalogItem, 'id'>);
      setShowCreateForm(false);
    }
    
    setFormData({
      name: '',
      description: '',
      category: '',
      unit: 'sq ft',
      baseCost: 0,
      basePrice: 0,
      defaultMarkupPercentage: 50,
      estimatedHours: 0,
      isActive: true
    });
  };

  const handleEditService = (service: ServiceCatalogItem) => {
    setEditingService(service);
    setFormData(service);
    setShowCreateForm(true);
  };

  const handleCancelEdit = () => {
    setEditingService(null);
    setShowCreateForm(false);
    setFormData({
      name: '',
      description: '',
      category: '',
      unit: 'sq ft',
      baseCost: 0,
      basePrice: 0,
      defaultMarkupPercentage: 50,
      estimatedHours: 0,
      isActive: true
    });
  };

  const calculateMargin = (cost: number, price: number) => {
    if (price === 0) return 0;
    return ((price - cost) / price) * 100;
  };

  return (
    <div className="bg-white rounded-md border border-slate-300">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Service Catalog</h2>
            <p className="text-sm text-slate-600">Manage standardized landscaping services and pricing</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Service
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border-slate-300 rounded-md focus:ring-slate-500 focus:border-slate-500"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-sm border-slate-300 rounded-md focus:ring-slate-500 focus:border-slate-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showInactiveServices}
              onChange={(e) => setShowInactiveServices(e.target.checked)}
              className="h-4 w-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500"
            />
            <span className="text-sm text-slate-700">Show inactive</span>
          </label>
        </div>
      </div>

      {/* Services Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                Pricing
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                Time & Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredServices.map((service) => (
              <tr key={service.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-slate-900">{service.name}</div>
                    <div className="text-sm text-slate-600 truncate max-w-xs">{service.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                    {service.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div className="flex items-center gap-2 text-slate-900">
                      <DollarSign className="h-3 w-3" />
                      <span className="font-medium">${service.basePrice}</span>
                      <span className="text-slate-500">/ {service.unit}</span>
                    </div>
                    <div className="text-xs text-slate-600">
                      Cost: ${service.baseCost} • 
                      Margin: {calculateMargin(service.baseCost, service.basePrice).toFixed(1)}%
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div className="flex items-center gap-2 text-slate-900">
                      <Clock className="h-3 w-3" />
                      <span>{service.estimatedHours}h / {service.unit}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Package className="h-3 w-3" />
                      <span>{service.itemCount} items</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    service.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {service.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => onManageItems(service.id)}
                      className="p-1 text-slate-600 hover:bg-slate-100 rounded transition-colors"
                      title="Manage Items"
                    >
                      <Package className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEditService(service)}
                      className="p-1 text-slate-600 hover:bg-slate-100 rounded transition-colors"
                      title="Edit Service"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDeleteService(service.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete Service"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div className="px-6 py-4 border-b border-slate-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-900">
                  {editingService ? 'Edit Service' : 'Create New Service'}
                </h3>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Service Name
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="block w-full px-3 py-2 text-sm border-slate-300 rounded-md focus:ring-slate-500 focus:border-slate-500"
                    placeholder="Weekly Lawn Maintenance"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="block w-full px-3 py-2 text-sm border-slate-300 rounded-md focus:ring-slate-500 focus:border-slate-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="block w-full px-3 py-2 text-sm border-slate-300 rounded-md focus:ring-slate-500 focus:border-slate-500"
                  placeholder="Detailed description of the service scope and deliverables..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Unit
                  </label>
                  <select
                    value={formData.unit || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                    className="block w-full px-3 py-2 text-sm border-slate-300 rounded-md focus:ring-slate-500 focus:border-slate-500"
                  >
                    <option value="sq ft">Square Feet</option>
                    <option value="linear ft">Linear Feet</option>
                    <option value="each">Each</option>
                    <option value="hour">Hour</option>
                    <option value="acre">Acre</option>
                    <option value="cubic yard">Cubic Yard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Base Cost
                  </label>
                  <input
                    type="number"
                    value={formData.baseCost || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, baseCost: parseFloat(e.target.value) || 0 }))}
                    className="block w-full px-3 py-2 text-sm border-slate-300 rounded-md focus:ring-slate-500 focus:border-slate-500"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Base Price
                  </label>
                  <input
                    type="number"
                    value={formData.basePrice || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, basePrice: parseFloat(e.target.value) || 0 }))}
                    className="block w-full px-3 py-2 text-sm border-slate-300 rounded-md focus:ring-slate-500 focus:border-slate-500"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Estimated Hours per Unit
                  </label>
                  <input
                    type="number"
                    value={formData.estimatedHours || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, estimatedHours: parseFloat(e.target.value) || 0 }))}
                    className="block w-full px-3 py-2 text-sm border-slate-300 rounded-md focus:ring-slate-500 focus:border-slate-500"
                    min="0"
                    step="0.1"
                    placeholder="0.0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Default Markup %
                  </label>
                  <input
                    type="number"
                    value={formData.defaultMarkupPercentage || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, defaultMarkupPercentage: parseFloat(e.target.value) || 0 }))}
                    className="block w-full px-3 py-2 text-sm border-slate-300 rounded-md focus:ring-slate-500 focus:border-slate-500"
                    min="0"
                    step="1"
                    placeholder="50"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive || false}
                  onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="h-4 w-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500"
                />
                <label className="ml-2 text-sm text-slate-700">
                  Active (available for estimates)
                </label>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveService}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors"
              >
                <Save className="h-4 w-4" />
                {editingService ? 'Update Service' : 'Create Service'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredServices.length === 0 && (
        <div className="px-6 py-12 text-center">
          <Package className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-2 text-sm font-medium text-slate-900">No services found</h3>
          <p className="mt-1 text-sm text-slate-500">
            {searchTerm || selectedCategory ? 'Try adjusting your filters.' : 'Get started by creating your first service.'}
          </p>
          {!searchTerm && !selectedCategory && (
            <div className="mt-6">
              <button
                onClick={() => setShowCreateForm(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Create First Service
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceCatalogManagerAspire;