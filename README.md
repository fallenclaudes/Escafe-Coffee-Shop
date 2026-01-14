# Escafe | Organic Coffee E-Commerce Frontend

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Performance](https://img.shields.io/badge/Lighthouse-100%25-brightgreen)
![Tech Stack](https://img.shields.io/badge/Tech-Vanilla_JS_&_Tailwind-blue)

**Escafe** is a high-performance, responsive e-commerce interface designed for a boutique coffee brand. This project demonstrates a mastery of core web fundamentals, specifically focusing on DOM manipulation, state management, and local persistence without reliance on heavy frontend frameworks.

![Project Screenshot]
<img width="1901" height="942" alt="image" src="https://github.com/user-attachments/assets/73545777-d459-4334-8e67-87ad528521d4" />



## 🚀 Live Demo
[**[Click here to view the Live Demo](https://escafe-coffee.netlify.app/)**] 

## 🛠️ Technical Stack

* **Core:** HTML5, CSS3, JavaScript (ES6+)
* **Styling:** Tailwind CSS (via CDN for rapid prototyping and performance)
* **Icons:** Lucide Icons
* **Persistence:** Browser Local Storage API
* **Fonts:** Google Fonts (Lato & Playfair Display)

## ✨ Key Features

### 1. Custom State Management
Instead of using a library like Redux, I engineered a custom state system using Vanilla JavaScript arrays to handle the cart logic.
* **Add/Remove:** Real-time calculation of totals and item quantities.
* **Persistence:** Utilizes `localStorage` to save the user's cart. If the tab is closed and reopened, the state is retrieved and re-hydrated instantly.
* **Filtering:** Functional programming methods (`.filter()`, `.map()`, `.reduce()`) used to sort products by category (Hot/Cold) and calculate totals.

### 2. UI/UX Design System
* **Theme:** Curated "Sage & Cream" palette to reflect the organic brand identity.
* **Interactivity:** Smooth CSS transitions for the slide-out cart drawer and modal overlays.
* **Failsafe Loading:** Implemented `onerror` handlers for product images to ensure the UI never breaks, even if an external asset fails.

### 3. User Journey Flow
1.  **Browse:** Users can filter products by category.
2.  **Cart Management:** Adjust quantities via the slide-out sidebar.
3.  **Checkout Simulation:** A custom form validates input and simulates a network request.
4.  **Confirmation:** Generates a dynamic timestamped order receipt.

## 💡 Engineering Decisions

**Why Vanilla JavaScript?**
While I am proficient in frameworks, I built this project in Vanilla JS to demonstrate a deep understanding of how the browser works "under the hood." I manually handled:
* Event Delegation.
* DOM Injection and Cleanup.
* Asynchronous timing (simulating API calls during checkout).

**Why Local Storage?**
To improve the user experience (UX), I implemented data persistence. This ensures that potential customers do not lose their selected items upon page refresh, simulating a persistent database connection on the client side.

## 📦 How to Run Locally

Since this project uses a CDN for Tailwind CSS, no build step (npm install) is required. It is lightweight and runs instantly.

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/yourusername/escafe.git](https://github.com/yourusername/escafe.git)
    ```
2.  **Open the file**
    Simply double-click `index.html` to open it in any modern browser.

## 🔮 Future Roadmap

* **Migration to React/Next.js:** To implement Server Side Rendering (SSR) for better SEO.
* **Stripe Integration:** To replace the checkout simulation with real payments.
* **Backend:** Connecting to a Node.js/Express API to serve product data from a database instead of a static array.

---
*Designed and Developed by Clarence Claude Cristobal*
