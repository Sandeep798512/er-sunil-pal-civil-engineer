# 📊 Er. Sunil Pal — Google Sheets & Instant Email Alert Setup Guide

Is guide se aap 2 minute me **Google Sheets + Email Alert + WhatsApp** ka automatic system activate kar sakte hain. Yeh 100% Free hai lifetime ke liye.

---

### Step 1: Ek Nayi Google Sheet Banayein
1. Apne browser me [sheets.google.com](https://sheets.google.com) open karein (`sandeepgaud8081@gmail.com` se ya Sunil sir ki ID se).
2. Ek nayi blank spreadsheet banayein aur uska naam rakhein:  
   **`Er. Sunil Pal - Website Inquiries`**

---

### Step 2: Code Paste Karein
1. Google Sheet ke top menu me jayein:  
   **Extensions** ➔ **Apps Script** par click karein.
2. Wahan pehle se likha hua code delete kar dein.
3. Hamari file **`google-apps-script/Code.gs`** ka pura code copy karke wahan paste kar dein.
4. Top menu me **Save icon (💾)** par click karein.

---

### Step 3: Web App Deploy Karein (Sabse Zaroori Step)
1. Apps Script window me top-right me blue button **"Deploy"** ➔ **"New deployment"** par click karein.
2. Gear icon ⚙️ (Select type) par click karein aur **"Web app"** chunein.
3. Form me yeh settings set karein:
   - **Description:** `Website Lead Webhook`
   - **Execute as:** `Me (your email)`
   - **Who has access:** `Anyone` *(Isko zaroor 'Anyone' karein taaki website form se data sheet me aa sake)*
4. **"Deploy"** button dabayein.
5. Google permission mangega:
   - Click **"Authorize access"**
   - Apna Google account select karein
   - "Google hasn't verified this app" warning aane par **"Advanced"** par click karein, aur niche **"Go to Untitled project (unsafe)"** par click karein.
   - **"Allow"** par click karein.
6. Deploy hone ke baad aapko ek **Web App URL** milega:  
   *(Example: `https://script.google.com/macros/s/AKfycbx.../exec`)*
7. Is URL ko copy kar lein!

---

### Step 4: Webhook URL ko Website me Connect Karein
Aap do tarike se is URL ko set kar sakte hain:

#### Tarika A: `.env` file me
Project ke root directory me `.env` file me paste karein:
```env
VITE_GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

#### Tarika B: `src/config/leadConfig.ts` file me
Directly `src/config/leadConfig.ts` me default webhook URL paste kar dein:
```ts
export const DEFAULT_GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
```

---

### 🚀 Result & Testing:
- Jaise hi koi client website par project ya property enquiry form bharega:
  1. Google Sheet me auto row add ho jayegi with Date, Time, Name, Mobile, Service, Details.
  2. Aapki email (`sandeepgaud8081@gmail.com`) par turant high-priority formatted alert aayega jisme 1-click **"Chat on WhatsApp"** aur **"Call Directly"** ke buttons honge.
  3. Client ki screen par WhatsApp automatically pre-filled details ke sath open ho jayega.
