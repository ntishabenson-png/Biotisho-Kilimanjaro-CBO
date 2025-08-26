// import React, { useState, useEffect } from 'react';
// import { Heart, Loader2, CheckCircle, X, DollarSign } from 'lucide-react';
// import { donationService } from '../lib/supabase'

// // Flutterwave types
// declare global {
//   interface Window {
//     FlutterwaveCheckout: (options: FlutterwaveCheckoutOptions) => void;
//   }
// }

// interface FlutterwaveCheckoutOptions {
//   public_key: string;
//   tx_ref: string;
//   amount: number;
//   currency: string;
//   payment_options: string;
//   customer: {
//     email: string;
//     phone_number?: string;
//     name?: string;
//   };
//   customizations: {
//     title: string;
//     description: string;
//     logo?: string;
//   };
//   callback: (response: FlutterwaveResponse) => void;
//   onclose: () => void;
// }

// interface FlutterwaveResponse {
//   status: string;
//   tx_ref: string;
//   transaction_id: string;
//   flw_ref: string;
// }

// // Currency options
// const CURRENCIES = [
//   { code: 'USD', symbol: '$', name: 'US Dollar' },
//   { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
//   { code: 'EUR', symbol: '€', name: 'Euro' },
//   { code: 'GBP', symbol: '£', name: 'British Pound' },
//   { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
//   { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
// ];

// // Preset amounts for different currencies
// const PRESET_AMOUNTS = {
//   USD: [25, 50, 100, 250, 500],
//   KES: [2500, 5000, 10000, 25000, 50000],
//   EUR: [20, 45, 90, 225, 450],
//   GBP: [20, 40, 80, 200, 400],
//   CAD: [35, 70, 140, 350, 700],
//   AUD: [35, 70, 140, 350, 700],
// };

// const DonationForm: React.FC = () => {
//   // Form state
//   const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
//   const [customAmount, setCustomAmount] = useState<string>('');
//   const [currency, setCurrency] = useState<string>('USD');
//   const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  
//   // Donor information
//   const [donorName, setDonorName] = useState<string>('');
//   const [donorEmail, setDonorEmail] = useState<string>('');
//   const [donorPhone, setDonorPhone] = useState<string>('');
//   const [message, setMessage] = useState<string>('');
//   const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  
//   // UI state
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');
//   const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
//   const [flutterwaveLoaded, setFlutterwaveLoaded] = useState<boolean>(false);

//   // Load Flutterwave script
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://checkout.flutterwave.com/v3.js';
//     script.async = true;
//     script.onload = () => setFlutterwaveLoaded(true);
//     script.onerror = () => setError('Failed to load payment system. Please refresh and try again.');
//     document.head.appendChild(script);

//     return () => {
//       document.head.removeChild(script);
//     };
//   }, []);

//   // Get current currency symbol
//   const getCurrentCurrencySymbol = () => {
//     return CURRENCIES.find(c => c.code === currency)?.symbol || '$';
//   };

//   // Get final donation amount
//   const getFinalAmount = (): number => {
//     if (selectedAmount) return selectedAmount;
//     return parseFloat(customAmount) || 0;
//   };

//   // Generate unique transaction reference
//   const generateTxRef = (): string => {
//     return `KCBO_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
//   };

//   // Validate form
//   const validateForm = (): boolean => {
//     setError('');
    
//     const amount = getFinalAmount();
//     if (!amount || amount <= 0) {
//       setError('Please select or enter a valid donation amount.');
//       return false;
//     }

//     if (!donorEmail.trim()) {
//       setError('Email address is required for donation receipt.');
//       return false;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(donorEmail.trim())) {
//       setError('Please enter a valid email address.');
//       return false;
//     }

//     return true;
//   };

//   // Handle Flutterwave payment
//   const handleDonate = async () => {
//     if (!validateForm() || !flutterwaveLoaded) return;

//     setIsLoading(true);
//     setError('');

//     try {
//       const amount = getFinalAmount();
//       const txRef = generateTxRef();

//       // Create donation record in Supabase
//       const donationData = {
//         amount,
//         currency,
//         frequency,
//         donor_name: isAnonymous ? null : donorName.trim() || null,
//         donor_email: donorEmail.trim(),
//         donor_phone: donorPhone.trim() || null,
//         message: message.trim() || null,
//         is_anonymous: isAnonymous,
//         flutterwave_tx_ref: txRef,
//         status: 'pending' as const,
//       };

//       await donationService.createDonation(donationData);

//       // Initialize Flutterwave checkout
//       const flutterwavePublicKey = import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY;
      
//       if (!flutterwavePublicKey) {
//         throw new Error('Payment system configuration error. Please contact support.');
//       }

//       window.FlutterwaveCheckout({
//         public_key: flutterwavePublicKey,
//         tx_ref: txRef,
//         amount,
//         currency,
//         payment_options: 'card,mpesa,mobilemoney,ussd,bank_transfer',
//         customer: {
//           email: donorEmail.trim(),
//           phone_number: donorPhone.trim() || undefined,
//           name: isAnonymous ? 'Anonymous Donor' : (donorName.trim() || 'Donor'),
//         },
//         customizations: {
//           title: 'Kilimanjaro CBO Donation',
//           description: `${frequency === 'monthly' ? 'Monthly' : 'One-time'} donation to support our conservation efforts`,
//           logo: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
//         },
//         callback: async (response: FlutterwaveResponse) => {
//           console.log('Flutterwave response:', response);
          
//           try {
//             if (response.status === 'successful') {
//               // Update donation status in Supabase
//               await donationService.updateDonationStatus(
//                 txRef,
//                 'successful',
//                 response.transaction_id
//               );
              
//               setShowSuccessModal(true);
//             } else {
//               // Update donation status as failed
//               await donationService.updateDonationStatus(txRef, 'failed');
//               setError('Payment was not completed successfully. Please try again.');
//             }
//           } catch (updateError) {
//             console.error('Error updating donation status:', updateError);
//             setError('Payment processed but there was an issue saving the record. Please contact support with your transaction reference: ' + txRef);
//           }
          
//           setIsLoading(false);
//         },
//         onclose: () => {
//           setIsLoading(false);
//           // Note: We don't update status to 'cancelled' here as the user might have completed payment
//         },
//       });
//     } catch (error) {
//       console.error('Donation error:', error);
//       setError(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
//       setIsLoading(false);
//     }
//   };

//   // Handle preset amount selection
//   const handlePresetAmountClick = (amount: number) => {
//     setSelectedAmount(amount);
//     setCustomAmount('');
//   };

//   // Handle custom amount input
//   const handleCustomAmountChange = (value: string) => {
//     setCustomAmount(value);
//     setSelectedAmount(null);
//   };

//   // Handle currency change
//   const handleCurrencyChange = (newCurrency: string) => {
//     setCurrency(newCurrency);
//     setSelectedAmount(null);
//     setCustomAmount('');
//   };

//   // Success modal component
//   const SuccessModal = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
//         <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
//         <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
//         <p className="text-gray-600 mb-4">
//           Your donation of {getCurrentCurrencySymbol()}{getFinalAmount()} has been processed successfully.
//           {!isAnonymous && donorName && ` Thank you, ${donorName}!`}
//         </p>
//         <p className="text-sm text-gray-500 mb-6">
//           A receipt has been sent to {donorEmail}. Your support helps us continue our vital conservation work.
//         </p>
//         <button
//           onClick={() => setShowSuccessModal(false)}
//           className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <div className="flex items-center justify-center mb-4">
//           <Heart className="w-8 h-8 text-red-500 mr-2" />
//           <h1 className="text-3xl font-bold text-gray-900">Support Our Mission</h1>
//         </div>
//         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//           Your donation helps Kilimanjaro CBO protect wildlife, preserve ecosystems, and support local communities 
//           in the Kilimanjaro region. Every contribution makes a difference.
//         </p>
//       </div>

//       <div className="grid lg:grid-cols-2 gap-8">
//         {/* Donation Form */}
//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <h2 className="text-2xl font-semibold text-gray-900 mb-6">Make a Donation</h2>

//           {/* Error Display */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//               <p className="text-red-700 text-sm">{error}</p>
//             </div>
//           )}

//           {/* Currency Selection */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Currency
//             </label>
//             <select
//               value={currency}
//               onChange={(e) => handleCurrencyChange(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//             >
//               {CURRENCIES.map((curr) => (
//                 <option key={curr.code} value={curr.code}>
//                   {curr.code} - {curr.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Donation Frequency */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-3">
//               Donation Frequency
//             </label>
//             <div className="flex bg-gray-100 rounded-lg p-1">
//               <button
//                 type="button"
//                 onClick={() => setFrequency('one-time')}
//                 className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
//                   frequency === 'one-time'
//                     ? 'bg-white text-gray-900 shadow-sm'
//                     : 'text-gray-600 hover:text-gray-900'
//                 }`}
//               >
//                 One-Time
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setFrequency('monthly')}
//                 className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
//                   frequency === 'monthly'
//                     ? 'bg-white text-gray-900 shadow-sm'
//                     : 'text-gray-600 hover:text-gray-900'
//                 }`}
//               >
//                 Monthly
//               </button>
//             </div>
//           </div>

//           {/* Preset Amounts */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-3">
//               Select Amount ({getCurrentCurrencySymbol()})
//             </label>
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
//               {PRESET_AMOUNTS[currency as keyof typeof PRESET_AMOUNTS].map((amount) => (
//                 <button
//                   key={amount}
//                   type="button"
//                   onClick={() => handlePresetAmountClick(amount)}
//                   className={`py-3 px-4 rounded-lg border-2 font-medium transition-colors ${
//                     selectedAmount === amount
//                       ? 'border-green-500 bg-green-50 text-green-700'
//                       : 'border-gray-200 hover:border-green-300 text-gray-700'
//                   }`}
//                 >
//                   {getCurrentCurrencySymbol()}{amount.toLocaleString()}
//                 </button>
//               ))}
//             </div>

//             {/* Custom Amount */}
//             <div className="relative">
//               <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="number"
//                 placeholder="Enter custom amount"
//                 value={customAmount}
//                 onChange={(e) => handleCustomAmountChange(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 min="1"
//                 step="0.01"
//               />
//             </div>
//           </div>

//           {/* Donor Information */}
//           <div className="space-y-4 mb-6">
//             <h3 className="text-lg font-medium text-gray-900">Donor Information</h3>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Full Name (Optional)
//               </label>
//               <input
//                 type="text"
//                 value={donorName}
//                 onChange={(e) => setDonorName(e.target.value)}
//                 disabled={isAnonymous}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
//                 placeholder="Enter your full name"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="email"
//                 value={donorEmail}
//                 onChange={(e) => setDonorEmail(e.target.value)}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 placeholder="Enter your email address"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Phone Number (Optional)
//               </label>
//               <input
//                 type="tel"
//                 value={donorPhone}
//                 onChange={(e) => setDonorPhone(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 placeholder="Enter your phone number"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Message/Dedication (Optional)
//               </label>
//               <textarea
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 rows={3}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 placeholder="Leave a message or dedication..."
//               />
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="anonymous"
//                 checked={isAnonymous}
//                 onChange={(e) => setIsAnonymous(e.target.checked)}
//                 className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
//               />
//               <label htmlFor="anonymous" className="ml-2 text-sm text-gray-700">
//                 Make this donation anonymous
//               </label>
//             </div>
//           </div>

//           {/* Donate Button */}
//           <button
//             onClick={handleDonate}
//             disabled={isLoading || !flutterwaveLoaded}
//             className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
//           >
//             {isLoading ? (
//               <>
//                 <Loader2 className="w-5 h-5 mr-2 animate-spin" />
//                 Processing...
//               </>
//             ) : (
//               <>
//                 <Heart className="w-5 h-5 mr-2" />
//                 Donate {getFinalAmount() > 0 && `${getCurrentCurrencySymbol()}${getFinalAmount()}`} Now
//               </>
//             )}
//           </button>

//           {!flutterwaveLoaded && (
//             <p className="text-sm text-gray-500 text-center mt-2">
//               Loading payment system...
//             </p>
//           )}
//         </div>

//         {/* Impact Information */}
//         <div className="bg-green-50 rounded-lg p-6">
//           <h3 className="text-2xl font-semibold text-gray-900 mb-4">Your Impact</h3>
//           <div className="space-y-4">
//             <div className="flex items-start">
//               <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
//                 <span className="text-green-600 font-bold">$25</span>
//               </div>
//               <div>
//                 <h4 className="font-medium text-gray-900">Protect Wildlife</h4>
//                 <p className="text-gray-600 text-sm">Funds anti-poaching patrols for one day</p>
//               </div>
//             </div>
            
//             <div className="flex items-start">
//               <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
//                 <span className="text-green-600 font-bold">$50</span>
//               </div>
//               <div>
//                 <h4 className="font-medium text-gray-900">Community Support</h4>
//                 <p className="text-gray-600 text-sm">Provides environmental education for 10 children</p>
//               </div>
//             </div>
            
//             <div className="flex items-start">
//               <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
//                 <span className="text-green-600 font-bold">$100</span>
//               </div>
//               <div>
//                 <h4 className="font-medium text-gray-900">Habitat Restoration</h4>
//                 <p className="text-gray-600 text-sm">Plants 50 native trees in degraded areas</p>
//               </div>
//             </div>
            
//             <div className="flex items-start">
//               <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
//                 <span className="text-green-600 font-bold">$250</span>
//               </div>
//               <div>
//                 <h4 className="font-medium text-gray-900">Research & Monitoring</h4>
//                 <p className="text-gray-600 text-sm">Funds wildlife monitoring equipment</p>
//               </div>
//             </div>
//           </div>

//           <div className="mt-6 p-4 bg-white rounded-lg">
//             <h4 className="font-medium text-gray-900 mb-2">Secure Payments</h4>
//             <p className="text-sm text-gray-600">
//               Your donation is processed securely through Flutterwave. We accept major credit cards, 
//               M-Pesa, and other local payment methods. All transactions are encrypted and secure.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Success Modal */}
//       {showSuccessModal && <SuccessModal />}
//     </div>
//   );
// };

// export default DonationForm;
import React, { useState } from "react";
import { Loader2, DollarSign } from "lucide-react";
import { donationService } from "../lib/supabase";

// Preset donation amounts
const PRESET_AMOUNTS = {
  KES: [100, 250, 500, 1000, 2000],
  USD: [5, 10, 20, 50, 100],
};

// Currency symbols
const CURRENCY_SYMBOLS: Record<string, string> = {
  KES: "KSh",
  USD: "$",
};

declare global {
  interface Window {
    FlutterwaveCheckout: any;
  }
}

const DonationForm: React.FC = () => {
  const [currency, setCurrency] = useState<"KES" | "USD">("KES");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentCurrencySymbol = () => CURRENCY_SYMBOLS[currency] || "";

  const handlePresetAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const handleDonate = async () => {
    try {
      setIsLoading(true);

      const amount = selectedAmount || Number(customAmount);
      if (!amount || amount <= 0) {
        alert("Please select or enter a valid amount.");
        return;
      }
      if (!donorEmail) {
        alert("Please provide your email.");
        return;
      }

      // Transaction reference
      const txRef = `BIOTISHO-${Date.now()}`;

      // Save donation to Supabase
      await donationService.createDonation({
        amount,
        currency,
        frequency: "one-time",
        donor_name: donorName || undefined,
        donor_email: donorEmail,
        donor_phone: donorPhone || undefined,
        message: message || undefined,
        is_anonymous: isAnonymous,
        flutterwave_tx_ref: txRef,
        status: "pending",
      });

      // Launch Flutterwave checkout
      if (window.FlutterwaveCheckout) {
        window.FlutterwaveCheckout({
          public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
          tx_ref: txRef,
          amount,
          currency,
          payment_options: "card,mpesa",
          redirect_url: `${window.location.origin}/donation-status?tx_ref=${txRef}`,
          customer: {
            email: donorEmail,
            name: donorName,
            phonenumber: donorPhone,
          },
          customizations: {
            title: "Biotisho Kilimanjaro CBO",
            description: "Donation to support our community projects",
            logo: "/logo.png",
          },
        });
      } else {
        console.error("Flutterwave script not loaded.");
        alert("Payment system not ready. Please refresh and try again.");
      }
    } catch (err) {
      console.error("Donation error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <h2 className="text-2xl font-bold text-center text-green-700">
        Support Our Cause
      </h2>

      {/* Currency selector */}
      <div className="flex justify-center space-x-4 mb-4">
        {(["KES", "USD"] as const).map((cur) => (
          <button
            key={cur}
            type="button"
            onClick={() => setCurrency(cur)}
            className={`px-4 py-2 rounded-lg border ${
              currency === cur
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cur}
          </button>
        ))}
      </div>

      {/* Preset amounts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {PRESET_AMOUNTS[currency].map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => handlePresetAmountClick(amount)}
            className={`px-4 py-2 rounded-lg border ${
              selectedAmount === amount
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {getCurrentCurrencySymbol()}
            {amount}
          </button>
        ))}
      </div>

      {/* Custom amount */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Or enter custom amount
        </label>
        <input
          type="number"
          min="1"
          value={customAmount}
          onChange={(e) => handleCustomAmountChange(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
          placeholder="Enter amount"
        />
      </div>

      {/* Donor details */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input
          type="email"
          value={donorEmail}
          onChange={(e) => setDonorEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone (optional)
        </label>
        <input
          type="tel"
          value={donorPhone}
          onChange={(e) => setDonorPhone(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="+254 7XX XXX XXX"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message (optional)
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Leave a message with your donation"
        />
      </div>

      {/* Anonymous option */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
          id="anonymous"
          className="h-4 w-4"
        />
        <label htmlFor="anonymous" className="text-sm text-gray-700">
          Make my donation anonymous
        </label>
      </div>

      {/* Donate button */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleDonate}
          disabled={isLoading}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center mx-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>
              <DollarSign className="w-5 h-5 mr-2" />
              Donate Now
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default DonationForm;
