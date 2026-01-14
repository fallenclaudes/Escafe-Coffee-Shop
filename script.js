// --- 1. PRODUCT DATA ---
const products = [
    { 
        id: 1, 
        name: "Forest Floor Blend", 
        price: 4.50, 
        category: "Hot", 
        desc: "Earthy tones with a hint of dark chocolate.", 
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80"
    },
    { 
        id: 2, 
        name: "Sunrise Cold Brew", 
        price: 5.25, 
        category: "Cold", 
        desc: "Steeped with mint leaves and vanilla bean.", 
        image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=800&auto=format&fit=crop"
    },
    { 
        id: 3, 
        name: "Honey Lavender Latte", 
        price: 6.00, 
        category: "Hot", 
        desc: "Local wildflower honey with dried lavender.", 
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop"
    },
    { 
        id: 4, 
        name: "Mountain Drip", 
        price: 3.50, 
        category: "Hot", 
        desc: "Single-origin light roast from the Andes.", 
        image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=800&auto=format&fit=crop"
    },
    { 
        id: 5, 
        name: "Oat Milk Matcha", 
        price: 5.50, 
        category: "Hot", 
        desc: "Ceremonial grade matcha with organic oat milk.", 
        image: "https://images.unsplash.com/photo-1722556349973-f59bd9d857ee?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    { 
        id: 6, 
        name: "Iced Caramel Macchiato", 
        price: 5.75, 
        category: "Cold", 
        desc: "House-made caramel drizzle over ice.", 
        image: "https://images.unsplash.com/photo-1578643606776-4f870be81c40?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];

// --- LOAD CART FROM LOCAL STORAGE ---

let cart = JSON.parse(localStorage.getItem('escafe_cart')) || [];

// --- 2. RENDER FUNCTIONS ---
function renderProducts(filter = 'All') {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = ''; 

    const filtered = filter === 'All' ? products : products.filter(p => p.category === filter);

    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = "group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition duration-500 border border-stone-100 flex flex-col";
        card.innerHTML = `
            <div class="h-64 rounded-xl overflow-hidden relative mb-4">
                <img src="${product.image}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="${product.name}">
                <button onclick="addToCart(${product.id})" class="absolute bottom-3 right-3 bg-white text-sage-900 w-10 h-10 rounded-full shadow-lg flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300 hover:bg-green-600 hover:text-white">
                    <i data-lucide="plus" class="w-5 h-5"></i>
                </button>
            </div>
            <div class="flex-1 flex flex-col px-2">
                <div class="flex justify-between items-start mb-1">
                    <h3 class="text-xl font-serif font-bold text-sage-900">${product.name}</h3>
                    <span class="font-bold text-green-600">$${product.price.toFixed(2)}</span>
                </div>
                <p class="text-stone-500 text-sm mb-2 line-clamp-2">${product.desc}</p>
            </div>
        `;
        grid.appendChild(card);
    });
  
    if(window.lucide) lucide.createIcons();
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const footer = document.getElementById('cart-footer');
    const badge = document.getElementById('cart-badge');
    const totalEl = document.getElementById('cart-total');

    container.innerHTML = '';
    
    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

    // Update Badge visibility
    if(totalQty > 0) {
        badge.innerText = totalQty;
        badge.classList.remove('hidden');
        badge.classList.add('flex');
    } else {
        badge.classList.add('hidden');
    }

    // Update Cart Content
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="h-full flex flex-col items-center justify-center text-stone-400">
                <i data-lucide="leaf" class="w-12 h-12 mb-4 opacity-20"></i>
                <p class="font-serif italic">Your basket is empty.</p>
                <button onclick="toggleCart(false)" class="mt-4 text-green-600 font-bold hover:underline">View Menu</button>
            </div>
        `;
        footer.classList.add('hidden');
    } else {
        footer.classList.remove('hidden');
        totalEl.innerText = '$' + totalPrice.toFixed(2);
        document.getElementById('checkout-total').innerText = '$' + totalPrice.toFixed(2);

        cart.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = "flex gap-4 animate-[fadeIn_0.3s_ease-out]";
            itemEl.innerHTML = `
                <div class="w-20 h-20 bg-stone-100 rounded-xl overflow-hidden shrink-0">
                    <img src="${item.image}" class="w-full h-full object-cover">
                </div>
                <div class="flex-1 py-1">
                    <h4 class="font-serif font-bold text-sage-900">${item.name}</h4>
                    <p class="text-xs text-stone-500 mb-2">$${item.price.toFixed(2)}</p>
                    <div class="flex items-center gap-3">
                        <button onclick="updateQty(${item.id}, -1)" class="w-6 h-6 flex items-center justify-center hover:bg-stone-200 rounded-full transition"><i data-lucide="minus" class="w-3 h-3"></i></button>
                        <span class="font-bold text-sm w-4 text-center">${item.qty}</span>
                        <button onclick="updateQty(${item.id}, 1)" class="w-6 h-6 flex items-center justify-center hover:bg-stone-200 rounded-full transition"><i data-lucide="plus" class="w-3 h-3"></i></button>
                    </div>
                </div>
                <div class="text-right font-bold text-sage-900 self-center">$${(item.price * item.qty).toFixed(2)}</div>
            `;
            container.appendChild(itemEl);
        });
    }
    if(window.lucide) lucide.createIcons();
}

// --- 3. HELPER & ACTIONS ---

// Helper function to save cart to Local Storage
function saveCart() {
    localStorage.setItem('escafe_cart', JSON.stringify(cart));
}

function toggleCart(isOpen) {
    const overlay = document.getElementById('cart-overlay');
    isOpen ? overlay.classList.add('open') : overlay.classList.remove('open');
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) { existing.qty++; } else { cart.push({ ...product, qty: 1 }); }
    
    saveCart();
    renderCart();
    toggleCart(true);
}

function updateQty(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
    }
    
    saveCart(); 
    renderCart();
}

function filterProducts(category) {
    document.querySelectorAll('.cat-btn').forEach(btn => {
        const isActive = btn.dataset.cat === category;
        btn.className = `cat-btn px-6 py-2 rounded-full text-sm font-bold transition ${isActive ? 'bg-sage-900 text-white shadow-lg' : 'bg-white text-stone-500 hover:bg-sage-50 border border-stone-200'}`;
    });
    renderProducts(category);
}

function openCheckout() {
    toggleCart(false);
    document.getElementById('checkout-modal').classList.add('open');
}

function closeCheckout() {
    document.getElementById('checkout-modal').classList.remove('open');
}

function processOrder(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.innerText = "Processing...";
    btn.disabled = true;

    setTimeout(() => {
        // --- Date Calculation ---
        const now = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = now.toLocaleDateString('en-GB', options);
        
        // --- Inject Date ---
        document.getElementById('order-date').innerText = "Placed on " + formattedDate;

        closeCheckout();
        document.getElementById('success-modal').classList.add('open');
        
        // --- Clear Data ---
        cart = []; 
        saveCart(); 
        renderCart();
        
        // Reset button for next time
        btn.innerText = "Confirm Order";
        btn.disabled = false;
    }, 1500);
}

// --- 4. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderCart();
    // Ensure icons load if script loads slightly after DOM
    if(window.lucide) lucide.createIcons();
});