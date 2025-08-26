import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

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
        // Verify with Flutterwave API
        const response = await fetch(`https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${txRef}`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_FLUTTERWAVE_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("Verification result:", data);

        if (data.status === "success" && data.data.status === "successful") {
          setStatus("success");

          // Update Supabase record
          await supabase
            .from("donations")
            .update({ status: "successful" })
            .eq("flutterwave_tx_ref", txRef);
        } else {
          setStatus("failed");

          // Update Supabase record
          await supabase
            .from("donations")
            .update({ status: "failed" })
            .eq("flutterwave_tx_ref", txRef);
        }
      } catch (err) {
        console.error("Verification error:", err);
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
          <h2 className="text-2xl font-bold text-red-600">❌ Payment Failed</h2>
          <p className="mt-2 text-gray-700">
            Something went wrong. Please try again or contact support.
          </p>
        </div>
      )}
    </div>
  );
};

export default DonationStatus;
