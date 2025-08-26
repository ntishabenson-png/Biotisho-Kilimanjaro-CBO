import React, { useState } from "react";
import { Loader2, DollarSign } from "lucide-react";

// Preset donation amounts
const PRESET_AMOUNTS = {
  KES: [100, 3500, 2500, 1000, 4000, 5000],
  USD: [5, 100, 200, 250, 3100, 1000],
};

// Currency symbols
const CURRENCY_SYMBOLS: Record<string, string> = {
  KES: "KSh",
  USD: "$",
};

// Backend URL from environment variable
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const DonationForm: React.FC = () => {
  const [currency, setCurrency] = useState<"KES" | "USD">("KES");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [donorEmail, setDonorEmail] = useState<string>("");
  const [donorPhone, setDonorPhone] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCurrencySymbol = () => CURRENCY_SYMBOLS[currency] || "";

  const handlePresetAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const handleDonate = async () => {
    const amount = selectedAmount || Number(customAmount);

    if (!amount || amount <= 0) {
      alert("Please select or enter a valid amount.");
      return;
    }

    if (!donorEmail.trim()) {
      alert("Please provide your email.");
      return;
    }

    const txRef = `BIOTISHO-${Date.now()}`;

    setIsLoading(true);

    try {
      console.log("🚀 Starting donation process...");
      console.log("Backend URL:", BACKEND_URL);
      console.log("Donation payload:", {
        tx_ref: txRef,
        amount,
        currency,
        donor: {
          name: donorName,
          email: donorEmail,
          phone: donorPhone,
          anonymous: isAnonymous,
        },
        message: message.trim(),
      });

      const res = await fetch(`${BACKEND_URL}/api/donate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tx_ref: txRef,
          amount,
          currency,
          donor: {
            name: donorName,
            email: donorEmail,
            phone: donorPhone,
            anonymous: isAnonymous,
          },
          message: message.trim(),
        }),
      });

      console.log("📡 Response status:", res.status);
      console.log("📡 Response ok:", res.ok);

      const data = await res.json().catch(() => null);
      console.log("📦 Response data:", data);

      if (!res.ok) {
        console.error("❌ Donation error:", data);
        
        // Provide specific error messages for common issues
        if (data?.error === 'read ECONNRESET') {
          alert("Connection lost to payment service. Please check your internet connection and try again.");
        } else if (data?.error?.includes('ECONNRESET')) {
          alert("Network connection interrupted. Please try again in a moment.");
        } else if (data?.error?.includes('timeout')) {
          alert("Request timed out. Please check your connection and try again.");
        } else if (data?.error?.includes('ENOTFOUND')) {
          alert("Unable to reach payment service. Please check your internet connection.");
        } else {
          alert(data?.error || "Could not start payment. Please try again.");
        }
        return;
      }

      if (data?.link) {
        console.log("🔗 Flutterwave payment link received:", data.link);
        console.log("🔗 Link type:", typeof data.link);
        console.log("🔗 Link length:", data.link.length);
        
        // Add a small delay to ensure console logs are visible
        setTimeout(() => {
          console.log("🚀 Redirecting to Flutterwave checkout...");
          window.location.href = data.link;
        }, 1000);
      } else {
        console.error("❌ No payment link received:", data);
        alert("Payment link not received. Please try again.");
      }
    } catch (err) {
      console.error("💥 Donation error:", err);
      alert("Something went wrong. Please check your network and try again.");
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
        Make an Impact
      </h2>

      {/* Currency Selector */}
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

      {/* Preset Amounts */}
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
            {getCurrencySymbol()}
            {amount}
          </button>
        ))}
      </div>

      {/* Custom Amount */}
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

      {/* Donor Details */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
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

      {/* Anonymous */}
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

      {/* Donate Button */}
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