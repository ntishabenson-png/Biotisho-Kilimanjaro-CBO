import React from 'react';
import DonationForm from '../components/DonationForm';

const DonatePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Page Header */}
      <div className="bg-green-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Support Conservation in Kilimanjaro</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Join us in protecting the unique ecosystems and wildlife of the Kilimanjaro region. 
            Your donation directly supports conservation efforts, community education, and sustainable development.
          </p>
        </div>
      </div>

      {/* Donation Form */}
      <div className="py-12">
        <DonationForm />
      </div>

      {/* Additional Information */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Conservation</h3>
              <p className="text-gray-600">
                Protecting endangered species and preserving critical habitats in the Kilimanjaro ecosystem.
              </p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">
                Empowering local communities through education, sustainable livelihoods, and capacity building.
              </p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Research</h3>
              <p className="text-gray-600">
                Conducting vital research to understand and protect the region's biodiversity and ecosystems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;