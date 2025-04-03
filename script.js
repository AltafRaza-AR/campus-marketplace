import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

document.getElementById('google-login').addEventListener('click', function() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            alert(`Logged in as ${user.displayName}`);
        })
        .catch((error) => {
            console.error("Login failed:", error);
        });
});

document.getElementById('logout').addEventListener('click', function() {
    signOut(auth).then(() => {
        alert("Logged out successfully");
    }).catch((error) => {
        console.error("Logout failed:", error);
    });
});

let listings = [
    { id: 1, title: 'Laptop for Sale', price: '$500' },
    { id: 2, title: 'Books - Computer Science', price: '$30' }
];

function loadListings() {
    const container = document.getElementById('listing-container');
    container.innerHTML = '';
    
    listings.forEach(listing => {
        const div = document.createElement('div');
        div.classList.add('listing');
        div.innerHTML = `<h3>${listing.title}</h3><p>${listing.price}</p>
                         <button onclick="deleteListing(${listing.id})">Delete</button>`;
        container.appendChild(div);
    });
}

document.getElementById('add-listing-btn').addEventListener('click', function() {
    const title = document.getElementById('listing-title').value;
    const price = document.getElementById('listing-price').value;
    if (title && price) {
        listings.push({ id: Date.now(), title, price: `$${price}` });
        loadListings();
    }
});

function deleteListing(id) {
    listings = listings.filter(listing => listing.id !== id);
    loadListings();
}

window.onload = loadListings;
