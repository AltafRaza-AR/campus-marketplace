document.getElementById('google-login').addEventListener('click', function() {
    alert('Google OAuth login triggered');
});

function loadListings() {
    const listings = [
        { title: 'Laptop for Sale', price: '$500' },
        { title: 'Books - Computer Science', price: '$30' }
    ];
    
    const container = document.getElementById('listing-container');
    container.innerHTML = '';
    
    listings.forEach(listing => {
        const div = document.createElement('div');
        div.classList.add('listing');
        div.innerHTML = `<h3>${listing.title}</h3><p>${listing.price}</p>`;
        container.appendChild(div);
    });
}

window.onload = loadListings;
