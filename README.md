# 🌾 Farmer ID Card Generator — Payment System

**All Work Online** | AgriStack Farmer ID Card with Cashfree ₹10 Payment

---

## 📁 Project Structure

```
farmer-card-project/
├── server.js          ← Node.js Backend (Cashfree API)
├── package.json       ← Dependencies
├── .env.example       ← Keys ka template (copy karke .env banao)
├── .gitignore         ← .env ko GitHub pe nahi jaane deta
├── README.md          ← Ye file
└── public/
    └── index.html     ← Frontend (Farmer Card + Payment Modal)
```

---

## 🚀 STEP 1 — GitHub pe Upload Karo

1. GitHub pe **New Repository** banao (e.g. `farmer-card-payment`)
2. Ye saari files usi repo mein upload karo
3. `.env` file **mat** upload karna — woh `.gitignore` mein hai ✅

---

## 🔑 STEP 2 — Cashfree Keys Lao

1. **dashboard.cashfree.com** pe login karo
2. Left menu → **Developers** → **API Keys**
3. Copy karo:
   - `App ID` → ye aapka `CASHFREE_APP_ID` hai
   - `Secret Key` → ye aapka `CASHFREE_SECRET_KEY` hai
4. Testing ke liye **Test Mode** on rakho
5. Live payment ke liye **Production Keys** use karo

---

## ☁️ STEP 3 — Railway pe Deploy Karo (FREE)

Railway sabse easy aur free hai:

### A) Railway Account

1. **railway.app** pe jaao → GitHub se login karo

### B) New Project

1. **"New Project"** click karo
2. **"Deploy from GitHub repo"** select karo
3. Apna repo (`farmer-card-payment`) select karo
4. Railway automatically detect karega ki ye Node.js project hai

### C) Environment Variables Daalo

Railway dashboard mein:
1. Apna project → **Variables** tab
2. Ye variables ek-ek karke add karo:

```
CASHFREE_APP_ID     =  TEST_xxxxxxxxxxxxxxxxxxx
CASHFREE_SECRET_KEY =  cfsk_ma_test_xxxxxxxxxxxxxxxxxxxxxxxxxx
CF_ENV              =  TEST
YOUR_UPI_ID         =  yourname@paytm
```

> ⚠️ Live payment ke liye `CF_ENV=PROD` aur Production keys daalna

3. **Deploy** button dabao

### D) URL Milega

Railway ek URL dega jaise:
`https://farmer-card-payment-production.up.railway.app`

Ye hi aapka live website URL hai! ✅

---

## 🔄 Alternative: Render pe Deploy (FREE)

1. **render.com** pe GitHub se login karo
2. **New → Web Service**
3. Repo select karo
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. **Environment** tab mein same variables daalo
6. **Create Web Service** click karo

---

## 🧪 Local Testing (Optional)

Agar pehle apne computer pe test karna ho:

```bash
# 1. Dependencies install karo
npm install

# 2. .env file banao
cp .env.example .env

# 3. .env file mein apni keys daalo (Notepad/VS Code se)
# CASHFREE_APP_ID=...
# CASHFREE_SECRET_KEY=...
# YOUR_UPI_ID=...

# 4. Server start karo
node server.js

# 5. Browser mein kholo
# http://localhost:3000
```

---

## ✅ Flow Summary

```
User → Detail Fill karta hai
     ↓
"Generate Card (₹10)" click karta hai
     ↓
Frontend → Backend ko /api/create-order call karta hai
     ↓
Backend → Cashfree se Order create karta hai
     ↓
Frontend → UPI QR dikhata hai
     ↓
User → Google Pay / PhonePe se ₹10 pay karta hai
     ↓
Auto verify (har 5 second mein) → /api/verify-order check karta hai
     ↓
Payment PAID → "✅ Payment Successful!" screen
     ↓
"View My Card" → Farmer ID Card generate ho jata hai 🎉
```

---

## ❓ Common Problems

| Problem | Solution |
|---|---|
| "Server se connect nahi hua" | Railway/Render pe deploy check karo, ENV variables daale hain? |
| Payment verify nahi ho raha | Cashfree dashboard mein TEST mode on hai? Sandbox mein test karo |
| QR scan nahi ho raha | UPI ID sahi hai? `yourname@paytm` format mein |
| Page open nahi ho raha | `node server.js` run hai? Port 3000 pe |

---

## 📞 Support

**All Work Online** — AgriStack Farmer ID Card Generator
