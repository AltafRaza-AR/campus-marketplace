document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const listingContainer = document.getElementById("listing-container");
    const searchBar = document.getElementById("search-bar");
    const showAddListingModalBtn = document.getElementById("show-add-listing-modal-btn");
    const addListingModal = document.getElementById("add-listing-modal");
    const closeModalBtn = document.querySelector(".close-btn");
    const addListingForm = document.getElementById("add-listing-form");

    // Load listings from localStorage or initialize an empty array
    let listings = JSON.parse(localStorage.getItem('marketplaceListings')) || [];

    // --- Functions ---
    const saveListings = () => {
        localStorage.setItem('marketplaceListings', JSON.stringify(listings));
    };

    const renderListings = (filter = '') => {
        listingContainer.innerHTML = "";
        const filteredListings = listings.filter(listing =>
            listing.title.toLowerCase().includes(filter.toLowerCase()) ||
            listing.description.toLowerCase().includes(filter.toLowerCase())
        );
        
        if (filteredListings.length === 0) {
            listingContainer.innerHTML = "<p>No listings found. Try adding one!</p>";
        }

        filteredListings.forEach(listing => {
            const div = document.createElement("div");
            div.classList.add("listing");
            
            const imageElement = listing.image
                ? `<img src="${listing.image}" alt="${listing.title}">`
                : `<div class="listing-image-placeholder">No Image</div>`;

            div.innerHTML = `
                ${imageElement}
                <div class="listing-content">
                    <div class="listing-header">
                        <h3>${listing.title}</h3>
                        <p>$${parseFloat(listing.price).toFixed(2)}</p>
                    </div>
                    <p class="listing-description">${listing.description}</p>
                    <button class="delete-btn" data-id="${listing.id}">Delete</button>
                </div>
            `;
            listingContainer.appendChild(div);
        });
    };

    // --- Event Listeners ---

    // Open/Close Modal
    showAddListingModalBtn.addEventListener("click", () => addListingModal.style.display = "flex");
    closeModalBtn.addEventListener("click", () => addListingModal.style.display = "none");
    window.addEventListener("click", (event) => {
        if (event.target == addListingModal) {
            addListingModal.style.display = "none";
        }
    });

    // Handle form submission for new listings
    addListingForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const title = document.getElementById("listing-title").value.trim();
        const description = document.getElementById("listing-description").value.trim();
        const price = document.getElementById("listing-price").value;
        const imageFile = document.getElementById("listing-image").files[0];
        
        const newListing = {
            id: Date.now(),
            title,
            description,
            price,
            image: null
        };
        
        // This function contains all the steps after the listing is ready
        const finalizeAndRender = () => {
            listings.push(newListing);
            saveListings();
            renderListings();
            addListingForm.reset();
            addListingModal.style.display = "none";
        };

        if (imageFile) {
            const reader = new FileReader();
            // This runs AFTER the image has been loaded
            reader.onload = function(event) {
                newListing.image = event.target.result;
                finalizeAndRender(); // Now we finalize and render
            };
            reader.readAsDataURL(imageFile);
        } else {
            // If no image, we can finalize and render immediately
            finalizeAndRender();
        }
    });

    // Handle deleting listings (using event delegation)
    listingContainer.addEventListener("click", (e) => {
        if (e.target && e.target.classList.contains("delete-btn")) {
            const listingId = parseInt(e.target.dataset.id, 10);
            if (confirm("Are you sure you want to delete this listing?")) {
                listings = listings.filter(listing => listing.id !== listingId);
                saveListings();
                renderListings(searchBar.value);
            }
        }
    });

    // Handle live search
    searchBar.addEventListener("input", (e) => {
        renderListings(e.target.value);
    });

    // --- Initial Render ---
    renderListings();
});
