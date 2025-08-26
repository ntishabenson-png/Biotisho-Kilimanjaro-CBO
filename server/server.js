import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

const app = express();

// ----------------------
// Environment checks
// ----------------------
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

if (!process.env.FLW_SECRET_KEY) {
  console.error('❌ Missing Flutterwave secret key');
  process.exit(1);
}

// ----------------------
// Middleware
// ----------------------
app.use(
  cors({
    origin: [process.env.FRONTEND_ORIGIN, 'http://localhost:5173'].filter(Boolean),
  })
);
app.use(express.json());

// ----------------------
// Supabase admin client
// ----------------------
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ----------------------
// Flutterwave secret
// ----------------------
const FLW_SECRET = process.env.FLW_SECRET_KEY;

// ----------------------
// Health check
// ----------------------
app.get('/health', (_, res) => res.json({ ok: true }));

// ----------------------
// 1. Initiate Donation (create Flutterwave payment link)
// ----------------------
app.post('/api/donate', async (req, res) => {
  try {
    console.log('🔄 Processing donation request...');
    console.log('📋 Request payload:', JSON.stringify(req.body, null, 2));
    
    const { tx_ref, amount, currency, donor, message } = req.body;

    if (!tx_ref || !amount || !currency || !donor?.email) {
      console.log('❌ Missing required fields validation failed');
      return res.status(400).json({ error: 'Missing required donation fields' });
    }

    const payload = {
      tx_ref,
      amount,
      currency,
      redirect_url: `${process.env.FRONTEND_ORIGIN || 'http://localhost:5173'}/donation-success`,
      customer: {
        email: donor.email,
        name: donor.name,
        phonenumber: donor.phone,
      },
      customizations: {
        title: 'Biotisho Kilimanjaro',
        description: 'Support our mission with your donation',
      },
      meta: {
        message,
        anonymous: donor.anonymous || false,
      },
    };

    console.log('🚀 Sending request to Flutterwave API...');
    console.log('🔗 API URL: https://api.flutterwave.com/v3/payments');
    console.log('📦 Flutterwave payload:', JSON.stringify(payload, null, 2));
    console.log('🔑 Using secret key (first 10 chars):', FLW_SECRET.substring(0, 10) + '...');

    const response = await axios.post('https://api.flutterwave.com/v3/payments', payload, {
      headers: {
        Authorization: `Bearer ${FLW_SECRET}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('✅ Flutterwave API response received');
    console.log('📊 Response status:', response.status);
    console.log('📋 Response data:', JSON.stringify(response.data, null, 2));

    if (response.data?.status === 'success') {
      console.log('💾 Storing initial donation record in Supabase...');
      // Store initial donation record in Supabase
      await supabase.from('donations').insert({
        flutterwave_tx_ref: tx_ref,
        amount,
        currency,
        donor_email: donor.email,
        donor_name: donor.name,
        donor_phone: donor.phone,
        status: 'pending',
        message,
        anonymous: donor.anonymous || false,
      });

      console.log('✅ Payment link generated successfully:', response.data.data.link);
      return res.json({ link: response.data.data.link });
    }

    console.log('❌ Flutterwave API returned unsuccessful status');
    return res.status(400).json({ error: 'Failed to create payment link' });
  } catch (err) {
    console.error('💥 Payment error occurred:');
    console.error('Error message:', err.message);
    console.error('Error code:', err.code);
    console.error('Error config URL:', err.config?.url);
    console.error('Error config method:', err.config?.method);
    console.error('Error config headers:', err.config?.headers);
    
    if (err.response) {
      console.error('Response status:', err.response.status);
      console.error('Response data:', err.response.data);
      console.error('Response headers:', err.response.headers);
    } else if (err.request) {
      console.error('Request made but no response received');
      console.error('Request details:', err.request);
    }
    
    return res.status(500).json({ error: err.response?.data?.message || err.message });
  }
});

// ----------------------
// 2. Verify and finalize donation (updated to use tx_ref)
// ----------------------
// app.post('/api/verify-payment', async (req, res) => {
//   try {
//     const { tx_ref } = req.body || {}; // Only need tx_ref from frontend

//     if (!tx_ref) {
//       return res.status(400).json({ ok: false, error: 'Missing tx_ref' });
//     }

//     // Use the verify_by_reference endpoint
//     const verifyUrl = `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${tx_ref}`;
//     console.log(`🔄 Verifying payment with Flutterwave: ${verifyUrl}`);
    
//     const fw = await axios.get(verifyUrl, {
//       headers: { Authorization: `Bearer ${FLW_SECRET}` },
//     });

//     const v = fw.data?.data;
//     if (!v) {
//       console.error('❌ Invalid verify response from Flutterwave:', fw.data);
//       return res.status(502).json({ ok: false, error: 'Invalid verify response from Flutterwave' });
//     }

//     // Validate status (assuming successful is the only status we care about for success)
//     const statusOk = v.status === 'successful' && v.data?.status === 'successful'; // Check both status fields
//     console.log(`✅ Flutterwave verification status: ${v.status}, data.status: ${v.data?.status}`);

//     if (!statusOk) {
//       console.log('❌ Payment not successful or invalid status, updating Supabase to failed.');
//       // Update Supabase record to failed if verification fails
//       await supabase
//         .from('donations')
//         .update({ status: 'failed', flutterwave_tx_id: String(v.id || v.data?.id || 'N/A') })
//         .eq('flutterwave_tx_ref', tx_ref);

//       return res.status(400).json({
//         ok: false,
//         verified: false,
//         reason: 'Payment not successful or invalid status',
//         flutterwave: v,
//       });
//     }

//     // Mark donation successful in Supabase
//     console.log('✅ Payment successful, updating Supabase record.');
//     const { data, error } = await supabase
//       .from('donations')
//       .update({ status: 'successful', flutterwave_tx_id: String(v.id || v.data?.id) })
//       .eq('flutterwave_tx_ref', tx_ref)
//       .select()
//       .single();

//     if (error) {
//       console.error('❌ Supabase update error:', error);
//       return res.status(500).json({ ok: false, error: error.message });
//     }

//     console.log('🎉 Payment successfully verified and recorded.');
//     return res.json({ ok: true, verified: true, donation: data, flutterwave: v });
//   } catch (err) {
//     const msg = err.response?.data?.message || err.response?.data || err.message;
//     console.error('💥 Verify error:', msg);
//     return res.status(500).json({ ok: false, error: msg });
//   }
// });
// ----------------------
// 2. Verify and finalize donation (updated to use tx_ref)
// ----------------------
app.post('/api/verify-payment', async (req, res) => {
  try {
    const { tx_ref } = req.body || {}; // Only need tx_ref from frontend

    if (!tx_ref) {
      return res.status(400).json({ ok: false, error: 'Missing tx_ref' });
    }

    // Use the verify_by_reference endpoint
    const verifyUrl = `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${tx_ref}`;
    console.log(`🔄 Verifying payment with Flutterwave: ${verifyUrl}`);
    
    const fw = await axios.get(verifyUrl, {
      headers: { Authorization: `Bearer ${FLW_SECRET}` },
    });

    const v = fw.data?.data;
    if (!v) {
      console.error('❌ Invalid verify response from Flutterwave:', fw.data);
      return res.status(502).json({ ok: false, error: 'Invalid verify response from Flutterwave' });
    }

    // Validate status (only check v.status)
    const statusOk = v.status === 'successful';
    console.log(`✅ Flutterwave payment status: ${v.status}`);

    if (!statusOk) {
      console.log('❌ Payment not successful or invalid status, updating Supabase to failed.');
      await supabase
        .from('donations')
        .update({ status: 'failed', flutterwave_tx_id: String(v.id || 'N/A') })
        .eq('flutterwave_tx_ref', tx_ref);

      return res.status(400).json({
        ok: false,
        verified: false,
        reason: 'Payment not successful or invalid status',
        flutterwave: v,
      });
    }

    console.log('✅ Payment successful, updating Supabase record.');
    const { data, error } = await supabase
      .from('donations')
      .update({ status: 'successful', flutterwave_tx_id: String(v.id) })
      .eq('flutterwave_tx_ref', tx_ref)
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase update error:', error);
      return res.status(500).json({ ok: false, error: error.message });
    }

    console.log('🎉 Payment successfully verified and recorded.');
    return res.json({ ok: true, verified: true, donation: data, flutterwave: v });
  } catch (err) {
    const msg = err.response?.data?.message || err.response?.data || err.message;
    console.error('💥 Verify error:', msg);
    return res.status(500).json({ ok: false, error: msg });
  }
});


// ----------------------
// Start server
// ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));