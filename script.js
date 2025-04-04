document.addEventListener("DOMContentLoaded", function () {
    const listingContainer = document.getElementById("listing-container");
    const titleInput = document.getElementById("listing-title");
    const priceInput = document.getElementById("listing-price");
    const addListingBtn = document.getElementById("add-listing-btn");

    let listings = [];

    function loadListings() {
        listingContainer.innerHTML = "";
        listings.forEach(listing => {
            const div = document.createElement("div");
            div.classList.add("listing");
            div.innerHTML = `
                <h3>${listing.title}</h3>
                <p>Price: $${listing.price}</p>
                <input type="number" class="offer-input" placeholder="Your Offer" min="1">
                <button class="offer-button">Make Offer</button>
                <div class="offers"></div>
            `;

            const offerButton = div.querySelector(".offer-button");
            const offerInput = div.querySelector(".offer-input");
            const offersDiv = div.querySelector(".offers");

            offerButton.addEventListener("click", function () {
                const offerPrice = offerInput.value.trim();
                if (offerPrice === "") {
                    alert("Enter a valid offer price.");
                    return;
                }
                const offerText = document.createElement("p");
                offerText.innerHTML = `<strong>Offer:</strong> $${offerPrice}`;
                offersDiv.appendChild(offerText);
                offerInput.value = "";
            });

            listingContainer.appendChild(div);
        });
    }

    addListingBtn.addEventListener("click", function () {
        const title = titleInput.value.trim();
        const price = priceInput.value.trim();

        if (title === "" || price === "") {
            alert("Please enter both title and price.");
            return;
        }

        listings.push({ title, price });
        loadListings();

        titleInput.value = "";
        priceInput.value = "";
    });

    loadListings();
});
