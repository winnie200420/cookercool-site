# CookerCool Website - Deployment Guide

## 📁 Website Structure

```
cookercool-site/
├── index.html        ← Main page structure
├── style.css         ← Styles (warm kitchen design)
├── config.js         ← ★ YOUR CONTENT FILE (edit this to update everything!)
├── script.js         ← Interactivity (no need to edit)
└── images/           ← ★ Put your product photos here
```

---

## 🚀 How to Deploy for FREE (GitHub Pages)

### Step 1: Create GitHub Account
Go to https://github.com and sign up (free).

### Step 2: Create a New Repository
1. Click **"+"** → **"New repository"**
2. Name: `cookercool-website`
3. Select **"Public"**
4. Click **"Create repository"**

### Step 3: Upload Your Files
1. In your new repo, click **"uploading an existing file"**
2. Drag ALL files from this folder into the upload area
3. Also upload your product photos to the `images/` folder
4. Click **"Commit changes"**

### Step 4: Enable GitHub Pages
1. Go to **Settings** → **Pages** (left menu)
2. Under "Source": select `main` branch, `/ (root)` folder
3. Click **"Save"**
4. Wait 2-3 minutes → live at:
   **`https://YOUR-USERNAME.github.io/cookercool-website/`**

### Step 5: Connect cookercool.com Domain
1. In your domain registrar DNS settings, add:
   - **CNAME**: `www` → `YOUR-USERNAME.github.io`
   - **A record**: `@` → `185.199.108.153`
2. In GitHub Settings → Pages → Custom domain: enter `cookercool.com`
3. Wait for SSL certificate (automatic) → **www.cookercool.com** is live!

---

## ✏️ How to Edit Content (No Coding Needed!)

### Open `config.js` in any text editor (Notepad works!)

**Change your company info:**
```javascript
name: "CookerCool Co., Ltd.",
address: "Your City, China",
email: "sales@cookercool.com",
phone: "+86 138 0000 0000",
```

**Change a product:**
```javascript
title: "Cast Iron Skillet",       // English name
title_zh: "铸铁平底锅",            // Chinese name
desc: "Your description...",      // English description
desc_zh: "中文描述...",           // Chinese description
materials: ["Cast Iron"],        // Materials (English)
materials_zh: ["铸铁"],           // Materials (Chinese)
tag: "Best Seller",               // Optional badge
image: "images/skillet.jpg"       // Your image filename
```

**Change statistics:**
```javascript
years: "15+",      // Years in business
countries: "40+",  // Countries you serve
clients: "500+"    // Number of clients
```

---

## 🖼️ How to Add Product Images

1. Save photos as JPG, 800×800px works well
2. Put them in the `images/` folder
3. In `config.js`, update the `image` field for each product:
   ```javascript
   image: "images/my-product.jpg"
   ```

---

## 🍳 Products Listed in config.js

Currently includes:
- Cast Iron Skillet / Frying Pan
- Cast Iron Dutch Oven
- Cast Iron Grill Pan / Griddle
- Cast Iron Wok
- Stainless Steel Fry Pan
- Stainless Steel Stockpot
- Enamel Cast Iron Dutch Oven
- Meat Grinder / Food Chopper
- Cast Iron Casserole
- Custom OEM / ODM Cookware

**Edit, add, or remove products in the `products` array in `config.js`.**

---

## 🌐 Language Support

Website has **English** and **Chinese** built in.
- Click "EN / 中文" button in the top right to switch
- Every piece of text has both English and Chinese versions
- Add `title_zh`, `desc_zh`, etc. for each new product

---

*Last updated: 2026-04-20*
