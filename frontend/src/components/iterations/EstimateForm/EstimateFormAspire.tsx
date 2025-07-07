import React, { useState } from 'react';
import { Plus, Trash2, Calculator, FileText, Save, Send } from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  estimatedHours: number;
  category: string;
}

interface EstimateData {
  opportunityName: string;
  propertyName: string;
  clientName: string;
  estimateName: string;
  projectDescription: string;
  services: ServiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  terms: string;
  notes: string;
  expirationDate: string;
}

interface EstimateFormAspireProps {
  estimate?: EstimateData;
  onSave: (estimate: EstimateData) => void;
  onSend: (estimate: EstimateData) => void;
  serviceCatalog: Array<{
    id: string;
    name: string;
    description: string;
    category: string;
    defaultPrice: number;
    unit: string;
    estimatedHours: number;
  }>;
}

/**
 * Estimate form component following Aspire commercial patterns
 * Service-based estimating with automatic work ticket generation capability
 * 
 * Design References:
 * - Aspire: professional business forms with clear hierarchy
 * - Service → Work Ticket relationship preparation
 * - Commercial client context throughout
 * 
 * Key Features:
 * - Service catalog integration
 * - Automatic cost calculations
 * - Work ticket generation preview
 * - Professional presentation for B2B clients
 */
const EstimateFormAspire: React.FC<EstimateFormAspireProps> = ({
  estimate,
  onSave,
  onSend,
  serviceCatalog
}) => {
  const [formData, setFormData] = useState<EstimateData>(estimate || {
    opportunityName: '',
    propertyName: '',
    clientName: '',
    estimateName: '',
    projectDescription: '',
    services: [],
    subtotal: 0,
    taxRate: 8.5,
    taxAmount: 0,
    total: 0,
    terms: 'Net 30 days. Work to commence upon signed contract and 50% deposit.',
    notes: '',
    expirationDate: ''
  });

  const [showServiceCatalog, setShowServiceCatalog] = useState(false);

  // Calculate totals when services change
  React.useEffect(() => {
    const subtotal = formData.services.reduce((sum, service) => sum + service.totalPrice, 0);
    const taxAmount = (subtotal * formData.taxRate) / 100;
    const total = subtotal + taxAmount;

    setFormData(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      total
    }));
  }, [formData.services, formData.taxRate]);

  const addServiceFromCatalog = (catalogService: any) => {
    const newService: ServiceItem = {
      id: `service-${Date.now()}`,
      name: catalogService.name,
      description: catalogService.description,
      quantity: 1,
      unit: catalogService.unit,
      unitPrice: catalogService.defaultPrice,
      totalPrice: catalogService.defaultPrice,
      estimatedHours: catalogService.estimatedHours,
      category: catalogService.category
    };

    setFormData(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }));
    setShowServiceCatalog(false);
  };

  const addCustomService = () => {
    const newService: ServiceItem = {
      id: `service-${Date.now()}`,
      name: 'Custom Service',
      description: '',
      quantity: 1,
      unit: 'each',
      unitPrice: 0,
      totalPrice: 0,
      estimatedHours: 0,
      category: 'Custom'
    };

    setFormData(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }));
  };

  const updateService = (serviceId: string, updates: Partial<ServiceItem>) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map(service => {
        if (service.id === serviceId) {
          const updated = { ...service, ...updates };
          // Recalculate total price if quantity or unit price changed
          if ('quantity' in updates || 'unitPrice' in updates) {
            updated.totalPrice = updated.quantity * updated.unitPrice;
          }
          return updated;
        }
        return service;
      })
    }));
  };

  const removeService = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(service => service.id !== serviceId)
    }));
  };

  const totalEstimatedHours = formData.services.reduce((sum, service) => 
    sum + (service.estimatedHours * service.quantity), 0
  );

  return (
    <div className="bg-white rounded-md border border-slate-200 max-w-4xl mx-auto">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Create Estimate</h2>
            <p className="text-sm text-slate-600">Service-based estimate with work ticket generation</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onSave(formData)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors"
            >
              <Save className="h-4 w-4" />
              Save Draft
            </button>
            <button
              onClick={() => onSend(formData)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors"
            >
              <Send className="h-4 w-4" />
              Send to Client
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Project Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Estimate Name
            </label>
            <input
              type="text"
              value={formData.estimateName}
              onChange={(e) => setFormData(prev => ({ ...prev, estimateName: e.target.value }))}
              className="block w-full px-3 py-2 text-sm border-slate-300 rounded-md focus:ring-slate-500 focus:border-slate-500"
              placeholder="Landscaping Project Estimate"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Expiration Date
            </label>
            <input
              type="date"
              value={formData.expirationDate}
              onChange={(e) => setFormData(prev => ({ ...prev, expirationDate: e.target.value }))}
              className="block w-full px-3 py-2 text-sm border-slate-300 rounded-md focus:ring-slate-500 focus:border-slate-500"
            />
          </div>
        </div>

        {/* Client Information */}
        <div className="bg-slate-50 rounded-md p-4">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Client Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Client Name
              </label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                className="block w-full px-3 py-2 text-sm bg-white border-slate-300 rounded-md"
                placeholder="ABC Corporation"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Property Name
              </label>
              <input
                type="text"
                value={formData.propertyName}
                onChange={(e) => setFormData(prev => ({ ...prev, propertyName: e.target.value }))}
                className="block w-full px-3 py-2 text-sm bg-white border-slate-300 rounded-md"
                placeholder="Corporate Headquarters"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Opportunity
              </label>
              <input
                type="text"
                value={formData.opportunityName}
                onChange={(e) => setFormData(prev => ({ ...prev, opportunityName: e.target.value }))}
                className="block w-full px-3 py-2 text-sm bg-white border-slate-300 rounded-md"
                placeholder="Spring Landscaping Project"
              />
            </div>
          </div>
        </div>

        {/* Project Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Project Description
          </label>
          <textarea
            value={formData.projectDescription}
            onChange={(e) => setFormData(prev => ({ ...prev, projectDescription: e.target.value }))}
            rows={3}
            className="block w-full px-3 py-2 text-sm border-slate-300 rounded-md focus:ring-slate-500 focus:border-slate-500"
            placeholder="Describe the scope of work and project objectives..."
          />
        </div>

        {/* Services Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Services</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setShowServiceCatalog(!showServiceCatalog)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add from Catalog
              </button>
              <button
                onClick={addCustomService}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Custom Service
              </button>
            </div>
          </div>

          {/* Service Catalog Dropdown */}
          {showServiceCatalog && (
            <div className="mb-4 bg-slate-50 rounded-md p-4">
              <h4 className="text-sm font-medium text-slate-900 mb-2">Service Catalog</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {serviceCatalog.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => addServiceFromCatalog(service)}
                    className="text-left p-3 bg-white rounded border border-slate-200 hover:border-slate-300 transition-colors"
                  >
                    <div className="font-medium text-sm text-slate-900">{service.name}</div>
                    <div className="text-xs text-slate-600">{service.description}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      ${service.defaultPrice}/{service.unit} • {service.estimatedHours}h • {service.category}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Services List */}
          <div className="space-y-3">
            {formData.services.map((service, index) => (
              <div key={service.id} className="bg-slate-50 rounded-md p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={service.name}
                      onChange={(e) => updateService(service.id, { name: e.target.value })}
                      className="block w-full px-3 py-2 text-sm font-medium bg-white border-slate-300 rounded-md"
                      placeholder="Service name"
                    />
                  </div>
                  <button
                    onClick={() => removeService(service.id)}
                    className="ml-2 p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={service.quantity}
                      onChange={(e) => updateService(service.id, { quantity: parseFloat(e.target.value) || 0 })}
                      className="block w-full px-3 py-2 text-sm bg-white border-slate-300 rounded-md"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Unit
                    </label>
                    <input
                      type="text"
                      value={service.unit}
                      onChange={(e) => updateService(service.id, { unit: e.target.value })}
                      className="block w-full px-3 py-2 text-sm bg-white border-slate-300 rounded-md"
                      placeholder="sq ft"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Unit Price
                    </label>
                    <input
                      type="number"
                      value={service.unitPrice}
                      onChange={(e) => updateService(service.id, { unitPrice: parseFloat(e.target.value) || 0 })}
                      className="block w-full px-3 py-2 text-sm bg-white border-slate-300 rounded-md"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Hours per Unit
                    </label>
                    <input
                      type="number"
                      value={service.estimatedHours}
                      onChange={(e) => updateService(service.id, { estimatedHours: parseFloat(e.target.value) || 0 })}
                      className="block w-full px-3 py-2 text-sm bg-white border-slate-300 rounded-md"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Total Price
                    </label>
                    <div className="px-3 py-2 text-sm bg-white border border-slate-300 rounded-md font-medium">
                      ${service.totalPrice.toLocaleString()}
                    </div>
                  </div>
                </div>

                <textarea
                  value={service.description}
                  onChange={(e) => updateService(service.id, { description: e.target.value })}
                  placeholder="Service description and scope of work..."
                  className="block w-full px-3 py-2 text-sm bg-white border-slate-300 rounded-md"
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-slate-50 rounded-md p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Project Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Services:</span>
                  <span className="font-medium">{formData.services.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Estimated Hours:</span>
                  <span className="font-medium">{totalEstimatedHours.toFixed(1)}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Avg. Hours/Service:</span>
                  <span className="font-medium">
                    {formData.services.length > 0 ? (totalEstimatedHours / formData.services.length).toFixed(1) : 0}h
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Financial Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal:</span>
                  <span className="font-medium">${formData.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Tax ({formData.taxRate}%):</span>
                  <span className="font-medium">${formData.taxAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-slate-300 pt-2">
                  <span className="font-semibold text-slate-900">Total:</span>
                  <span className="font-bold text-lg text-slate-900">${formData.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Terms and Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Terms & Conditions
            </label>
            <textarea
              value={formData.terms}
              onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.value }))}
              rows={4}
              className="block w-full px-3 py-2 text-sm border-slate-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={4}
              className="block w-full px-3 py-2 text-sm border-slate-300 rounded-md"
              placeholder="Additional notes or special instructions..."
            />
          </div>
        </div>

        {/* Work Ticket Preview */}
        {formData.services.length > 0 && (
          <div className="bg-blue-50 rounded-md p-4">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">
              Work Ticket Generation Preview
            </h3>
            <p className="text-sm text-blue-800 mb-3">
              When this estimate is converted to a contract, {formData.services.length} work tickets will be automatically generated:
            </p>
            <div className="space-y-1">
              {formData.services.map((service, index) => (
                <div key={service.id} className="text-sm text-blue-800 flex items-center gap-2">
                  <FileText className="h-3 w-3" />
                  <span className="font-medium">WT-{String(index + 1).padStart(2, '0')}:</span>
                  <span>{service.name}</span>
                  <span className="text-blue-600">({service.estimatedHours * service.quantity}h, ${service.totalPrice.toLocaleString()})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EstimateFormAspire;