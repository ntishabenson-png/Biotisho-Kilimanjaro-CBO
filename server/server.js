import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const app = express();

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error(" Missing Supabase environment variables");
  process.exit(1);
}

if (!process.env.FLW_SECRET_KEY) {
  console.error("❌ Missing Flutterwave secret key");
  process.exit(1);
}

app.use(
  cors({
    origin: [process.env.FRONTEND_ORIGIN, "http://localhost:5173"].filter(
      Boolean
    ),
  })
);
app.use(express.json());


// Supabase admin client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);


// Flutterwave secret

const FLW_SECRET = process.env.FLW_SECRET_KEY;



// 1. Initiate Donation (create Flutterwave payment link)
app.post("/api/donate", async (req, res) => {
  try {
    const { tx_ref, amount, currency, donor, message } = req.body;

    if (!tx_ref || !amount || !currency || !donor?.email) {
      return res
        .status(400)
        .json({ error: "Missing required donation fields" });
    }

    const payload = {
      tx_ref,
      amount,
      currency,
      redirect_url: `${
        process.env.FRONTEND_ORIGIN || "http://localhost:5173"
      }/donation-success`,
      customer: {
        email: donor.email,
        name: donor.name,
        phonenumber: donor.phone,
      },
      customizations: {
        title: "Biotisho Kilimanjaro",
        description: "Support our mission with your donation",
      },
      meta: {
        message,
        anonymous: donor.anonymous || false,
      },
    };
    const response = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      payload,
      {
        headers: {
          Authorization: `Bearer ${FLW_SECRET}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data?.status === "success") { 
      await supabase.from("donations").insert({
        flutterwave_tx_ref: tx_ref,
        amount,
        currency,
        donor_email: donor.email,
        donor_name: donor.name,
        donor_phone: donor.phone,
        status: "pending",
        message,
        anonymous: donor.anonymous || false,
      });
      return res.json({ link: response.data.data.link });
    }

    
    return res.status(400).json({ error: "Failed to create payment link" });
  } catch (err) {
    console.error("💥 Payment error occurred:");
    console.error("Error message:", err.message);
    console.error("Error code:", err.code);
    console.error("Error config URL:", err.config?.url);
    console.error("Error config method:", err.config?.method);
    console.error("Error config headers:", err.config?.headers);
    if (err.response) {
      console.error("Response status:", err.response.status);
      console.error("Response data:", err.response.data);
      console.error("Response headers:", err.response.headers);
    } else if (err.request) {
      console.error("Request made but no response received");
      console.error("Request details:", err.request);
    }
    return res
      .status(500)
      .json({ error: err.response?.data?.message || err.message });
  }
});


// 2. Verify and finalize donation

app.post("/api/verify-payment", async (req, res) => {
  try {
    const { tx_ref } = req.body || {}; 

    if (!tx_ref) {
      return res.status(400).json({ ok: false, error: "Missing tx_ref" });
    } 

    const verifyUrl = `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${tx_ref}`;
    const fw = await axios.get(verifyUrl, {
      headers: { Authorization: `Bearer ${FLW_SECRET}` },
    });

    const v = fw.data?.data;
    if (!v) {
      console.error("❌ Invalid verify response from Flutterwave:", fw.data);
      return res
        .status(502)
        .json({ ok: false, error: "Invalid verify response from Flutterwave" });
    } 
    const statusOk = v.status === "successful" && v.data?.status === "successful";
    
    if (!statusOk) {
      await supabase
        .from("donations")
        .update({ status: "failed", flutterwave_tx_id: String(v.id || "N/A") })
        .eq("flutterwave_tx_ref", tx_ref);

      return res.status(400).json({
        ok: false,
        verified: false,
        reason: "Payment not successful or invalid status",
        flutterwave: v,
      });
    }

    const { data, error } = await supabase
      .from("donations")
      .update({ status: "successful", flutterwave_tx_id: String(v.id) })
      .eq("flutterwave_tx_ref", tx_ref)
      .select()
      .single();

    if (error) {
      console.error("Supabase update error:", error);
      return res.status(500).json({ ok: false, error: error.message });
    }
    return res.json({
      ok: true,
      verified: true,
      donation: data,
      flutterwave: v,
    });
  } catch (err) {
    const msg =
      err.response?.data?.message || err.response?.data || err.message;
    console.error("💥 Verify error:", msg);
    return res.status(500).json({ ok: false, error: msg });
  }
});


// 3. Receive and store contact messages

app.post("/api/contact-message", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data, error } = await supabase.from("contact_messages").insert([
      {
        name,
        email,
        phone,
        subject,
        message,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ error: "Failed to save message" });
    }

    
    return res
      .status(200)
      .json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("💥 Contact message error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});


// 4. Receive and store partnership inquiries

app.post("/api/partner-inquiry", async (req, res) => {
  try {
    const { organizationName, contactPerson, email, phone, organizationType, partnershipType, message } = req.body;

    if (!organizationName || !contactPerson || !email || !phone || !organizationType || !partnershipType || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data, error } = await supabase.from("partnership_inquiries").insert([
      {
        organization_name: organizationName,
        contact_person: contactPerson,
        email: email,
        phone: phone,
        organization_type: organizationType,
        partnership_type: partnershipType,
        message: message,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ error: "Failed to save partnership inquiry" });
    }
    return res.status(200).json({ success: true, message: "Partnership inquiry sent successfully!" });
  } catch (err) {
    console.error("Partnership inquiry error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});


// Start server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);