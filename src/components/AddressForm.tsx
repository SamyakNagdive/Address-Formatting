import React from 'react';
import { FileText, Plus } from 'lucide-react';
import AddressFormInput from './AddressFormInput';
import AddressList from './AddressList';
import { Address } from '../types';

const initialAddress: Address = {
  doctorName: '',
  hospitalClinic: '',
  flatNo: '',
  society: '',
  area: '',
  city: '',
  pincode: '',
  mobile: '',
};

export default function AddressForm() {
  const [addresses, setAddresses] = React.useState<Address[]>([initialAddress]);

  const addNewAddress = () => {
    setAddresses([...addresses, { ...initialAddress }]);
  };

  const removeAddress = (index: number) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  const updateAddress = (index: number, updatedAddress: Address) => {
    setAddresses(
      addresses.map((addr, i) => (i === index ? updatedAddress : addr))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <FileText className="h-10 w-10 text-indigo-600 mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Address Formatter</h1>
          <p className="text-base text-gray-600">Generate professionally formatted addresses in one click</p>
        </div>

        <div className="space-y-4">
          {addresses.map((address, index) => (
            <AddressFormInput
              key={index}
              address={address}
              onUpdate={(updatedAddress) => updateAddress(index, updatedAddress)}
              onRemove={() => removeAddress(index)}
              showRemove={addresses.length > 1}
            />
          ))}

          <div className="flex justify-center">
            <button
              type="button"
              onClick={addNewAddress}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Address
            </button>
          </div>

          {addresses.some(addr => addr.doctorName) && (
            <AddressList addresses={addresses} />
          )}
        </div>
      </div>
    </div>
  );
}