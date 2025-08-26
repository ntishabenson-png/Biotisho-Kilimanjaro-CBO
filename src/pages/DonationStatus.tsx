import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase"; // Assuming this is correctly configured

// Backend URL from environment variable
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const DonationStatus: React.FC = () => {
  const [searchParams] = useSearchParams();
  const txRef = searchParams.get("tx_ref");
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!txRef) {
        setStatus("failed");
        return;
      }

      try {
        // Call your backend's verification endpoint
        const response = await fetch(`${BACKEND_URL}/api/verify-payment`, {
          method: "POST", // Use POST as per server.js
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tx_ref: txRef }), // Send tx_ref in body
        });

        const data = await response.json();
        console.log("Verification result from backend:", data);

        // Check response.ok and backend's 'verified' flag
        if (response.ok && data.verified) {
          setStatus("success");
          // Supabase update is now handled by the backend
        } else {
          setStatus("failed");
          // Supabase update is now handled by the backend
        }
      } catch (err) {
        console.error("Verification error calling backend:", err);
        setStatus("failed");
      }
    };

    verifyPayment();
  }, [txRef]);

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 text-center mt-12">
      {status === "loading" && (
        <p className="text-gray-600">Verifying your payment...</p>
      )}

      {status === "success" && (
        <div>
          <h2 className="text-2xl font-bold text-green-600">🎉 Thank You!</h2>
          <p className="mt-2 text-gray-700">
            Your donation was successful. We deeply appreciate your support.
          </p>
        </div>
      )}

      {status === "failed" && (
        <div>
          <h2 className="text-2xl font-bold text-red-600"> Payment Failed</h2>
          <p className="mt-2 text-gray-700">
            Something went wrong. Please try again or contact support.
          </p>
        </div>
      )}
    </div>
  );
};

export default DonationStatus;