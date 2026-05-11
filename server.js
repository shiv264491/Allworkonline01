// ============================================================
//  FARMER ID CARD — CASHFREE PAYMENT BACKEND
//  Node.js + Express
// ============================================================

const express  = require('express');
const cors     = require('cors');
const fetch    = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Static files (index.html serve karega)
app.use(express.static('public'));

// ---- CONFIG (Railway/Render pe Environment Variables mein daalna) ----
const CF_APP_ID  = process.env.CASHFREE_APP_ID;
const CF_SECRET  = process.env.CASHFREE_SECRET_KEY;
const CF_ENV     = process.env.CF_ENV || 'TEST'; // 'TEST' ya 'PROD'
const CF_BASE    = CF_ENV === 'PROD'
  ? 'https://api.cashfree.com/pg'
  : 'https://sandbox.cashfree.com/pg';

// ============================================================
//  ROUTE 1: Order Create
//  POST /api/create-order
//  Body: { name, mobile }
// ============================================================
app.post('/api/create-order', async (req, res) => {
  const { name, mobile } = req.body;

  if (!name || !mobile) {
    return res.status(400).json({ error: 'name aur mobile required hai' });
  }

  const orderId = 'FRMR_' + Date.now() + '_' + Math.random().toString(36).substr(2,5).toUpperCase();

  const payload = {
    order_id:       orderId,
    order_amount:   10,
    order_currency: 'INR',
    customer_details: {
      customer_id:    'CUST_' + mobile,
      customer_name:  name,
      customer_phone: mobile
    },
    order_meta: {}
  };

  try {
    const cfRes = await fetch(`${CF_BASE}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type':    'application/json',
        'x-api-version':   '2023-08-01',
        'x-client-id':     CF_APP_ID,
        'x-client-secret': CF_SECRET,
      },
      body: JSON.stringify(payload)
    });

    const data = await cfRes.json();

    if (data.order_id) {
      // UPI link generate karke bhejna
      const upiId  = process.env.YOUR_UPI_ID || 'yourname@upi';
      const upiLink = `upi://pay?pa=${upiId}&pn=AllWorkOnline&am=10&cu=INR&tn=FarmerCard-${orderId}`;

      return res.json({
        success:  true,
        orderId:  orderId,
        upiLink:  upiLink,
        upiId:    upiId
      });
    } else {
      console.error('Cashfree order error:', data);
      return res.status(500).json({ error: data.message || 'Order create failed', raw: data });
    }
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// ============================================================
//  ROUTE 2: Payment Verify
//  GET /api/verify-order/:orderId
// ============================================================
app.get('/api/verify-order/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    const cfRes = await fetch(`${CF_BASE}/orders/${orderId}`, {
      headers: {
        'x-api-version':   '2023-08-01',
        'x-client-id':     CF_APP_ID,
        'x-client-secret': CF_SECRET,
      }
    });

    const data = await cfRes.json();

    return res.json({
      success: true,
      status:  data.order_status,  // 'PAID', 'ACTIVE', 'EXPIRED' etc.
      raw:     data
    });
  } catch (err) {
    return res.status(500).json({ error: 'Verify error: ' + err.message });
  }
});

// ============================================================
//  SERVER START
// ============================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌍 Cashfree ENV: ${CF_ENV}`);
});
