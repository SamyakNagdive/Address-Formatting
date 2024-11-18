import React from 'react';
import { Trash2, RefreshCw } from 'lucide-react';
import { Address } from '../types';

interface AddressFormInputProps {
  address: Address;
  onUpdate: (address: Address) => void;
  onRemove: () => void;
  showRemove: boolean;
}

export default function AddressFormInput({
  address,
  onUpdate,
  onRemove,
  showRemove,
}: AddressFormInputProps) {
  const [errors, setErrors] = React.useState<Partial<Address>>({});

  const validateField = (name: keyof Address, value: string) => {
    if (name === 'mobile' && value && !/^\d{10}$/.test(value)) {
      return 'Please enter a valid 10-digit mobile number';
    }
    if (!value && name !== 'hospitalClinic') {
      return `${name.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`;
    }
    return '';
  };

  const handleChange = (name: keyof Address, value: string) => {
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
    onUpdate({ ...address, [name]: value });
  };

  const resetForm = () => {
    onUpdate({
      doctorName: '',
      hospitalClinic: '',
      flatNo: '',
      society: '',
      area: '',
      city: '',
      pincode: '',
      mobile: '',
    });
    setErrors({});
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Doctor's Name</label>
            <input
              type="text"
              value={address.doctorName}
              onChange={(e) => handleChange('doctorName', e.target.value)}
              className={`block w-full rounded-md text-sm ${
                errors.doctorName ? 'border-red-500' : ''
              }`}
            />
            {errors.doctorName && (
              <p className="text-xs text-red-600">{errors.doctorName}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Hospital/Clinic (Optional)
            </label>
            <input
              type="text"
              value={address.hospitalClinic}
              onChange={(e) => handleChange('hospitalClinic', e.target.value)}
              className="block w-full rounded-md text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Flat No./Survey Number
            </label>
            <input
              type="text"
              value={address.flatNo}
              onChange={(e) => handleChange('flatNo', e.target.value)}
              className={`block w-full rounded-md text-sm ${
                errors.flatNo ? 'border-red-500' : ''
              }`}
            />
            {errors.flatNo && <p className="text-xs text-red-600">{errors.flatNo}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Society/Colony</label>
            <input
              type="text"
              value={address.society}
              onChange={(e) => handleChange('society', e.target.value)}
              className={`block w-full rounded-md text-sm ${
                errors.society ? 'border-red-500' : ''
              }`}
            />
            {errors.society && <p className="text-xs text-red-600">{errors.society}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Lane/Area</label>
            <input
              type="text"
              value={address.area}
              onChange={(e) => handleChange('area', e.target.value)}
              className={`block w-full rounded-md text-sm ${
                errors.area ? 'border-red-500' : ''
              }`}
            />
            {errors.area && <p className="text-xs text-red-600">{errors.area}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              value={address.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className={`block w-full rounded-md text-sm ${
                errors.city ? 'border-red-500' : ''
              }`}
            />
            {errors.city && <p className="text-xs text-red-600">{errors.city}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Pincode</label>
            <input
              type="text"
              value={address.pincode}
              onChange={(e) => handleChange('pincode', e.target.value)}
              className={`block w-full rounded-md text-sm ${
                errors.pincode ? 'border-red-500' : ''
              }`}
            />
            {errors.pincode && <p className="text-xs text-red-600">{errors.pincode}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              type="tel"
              value={address.mobile}
              onChange={(e) => handleChange('mobile', e.target.value)}
              className={`block w-full rounded-md text-sm ${
                errors.mobile ? 'border-red-500' : ''
              }`}
              maxLength={10}
            />
            {errors.mobile && <p className="text-xs text-red-600">{errors.mobile}</p>}
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center px-3 py-1.5 text-sm border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            Clear
          </button>
          {showRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="inline-flex items-center px-3 py-1.5 text-sm border border-transparent font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1.5" />
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}