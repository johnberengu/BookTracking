// Search function to fetch data from Google Books API
performSearch = () => {
    const searchInput = document.querySelector("#searchBox input");
    const searchBox = searchInput.value.trim(); // Get the trimmed value of the input

    const results = document.getElementById("results"); // Results container

    // Check if the search box is empty
    if (!searchBox) {
        alert('Enter book title');
        return;
    }


    results.innerHTML = "<p>Loading...</p>";

    // Fetch data from Google Books API
    const URL = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchBox)}`;

    fetch(URL)
        .then((feedback) => {
            if (!feedback.ok) {
                throw new Error("Network problem: " + feedback.statusText);
            }
            return feedback.json();
        })

        .then((data) => {
            displayResults(data); 
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            results.innerHTML = "<p>Something went wrong.</p>"; 
        });
}

// Display the results in the "results" container
displayResults = (data) => {
    const results = document.getElementById("results");
    results.innerHTML = ""; 


    if (!data.items || data.items.length === 0) {
        results.innerHTML = "<p>No books found.</p>";
        return;
    }

    // Loop through each book result and display its details
    data.items.forEach((item) => {
        const book = item.volumeInfo;
        const title = book.title || "No Title";
        const authors = book.authors ? book.authors.join(", ") : "Unknown Author";
        const thumbnail = book.imageLinks?.thumbnail || "https://via.placeholder.com/128x192?text=No+Image";

        // Create a div for each book result
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        // Create a button to add to favorites
        const favoriteButton = document.createElement("button");
        favoriteButton.textContent = "Add to Favorites";
        favoriteButton.classList.add("favorite-btn");

        // Create a book details section
        bookDiv.innerHTML = `
            <img src="${thumbnail}" alt="Book Image">
            <h3>${title}</h3>
            <p><strong>Author(s):</strong> ${authors}</p>
        `;

        // Add the "Add to Favorites" button to the book div
        bookDiv.appendChild(favoriteButton);

        // Add event listener to "Add to Favorites" button
        favoriteButton.addEventListener("click", () => {
            addToFavorites(book, favoriteButton); 
            favoriteButton.textContent = "Added to Favorites"; 
            favoriteButton.disabled = true; 
        });

        // Append the book div to the results container
        results.appendChild(bookDiv);
    });
}

// Add book to favorites
addToFavorites = (book, favoriteButton) => {
    const favoritesList = document.getElementById("favoritesList");

    //list item for the favorite book
    const favoriteItem = document.createElement("li");
    favoriteItem.classList.add("favorite-item");


    favoriteItem.textContent = `${book.title} by ${book.authors ? book.authors.join(", ") : "Unknown Author"}`;

    //delete button for each favorite book
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    // Event listener to remove the book from favorites
    deleteButton.addEventListener("click", () => {
        favoritesList.removeChild(favoriteItem); 
    });

    // Append the delete button to the favorite item
    favoriteItem.appendChild(deleteButton);


    // Add the favorite book to the "favoritesList"
    favoritesList.appendChild(favoriteItem);
}

// Show/hide the library section
showLibrary = () => {
    const libraryDiv = document.getElementById("library");
    libraryDiv.style.display = libraryDiv.style.display === "none" ? "block" : "none";
}

// Adding event listeners for the "Currently Reading" section
document.getElementById('addCurrentBookBtn').addEventListener('click', function() {
    const currentInput = document.getElementById('currentlyReadingInput');
    const bookTitle = currentInput.value.trim();
    const currentlyReadingList = document.getElementById('currentlyReadingList');


    if (bookTitle) {
        // Create a new list item for the book
        const bookItem = document.createElement('li');
        bookItem.textContent = bookTitle;

        // Append the book to the "Currently Reading" list
        currentlyReadingList.appendChild(bookItem);


        // Clear the input field after adding the book
        currentInput.value = '';
    } else {
        alert("Please enter a book title.");
    }
});

// Adding event listeners for the "Done Reading" section
document.getElementById('addDoneBookBtn').addEventListener('click', function() {
    const doneInput = document.getElementById('doneReadingInput');
    const bookTitle = doneInput.value.trim();
    const doneReadingList = document.getElementById('doneReadingList');

    if (bookTitle) {
        // Create a new list item for the book
        const bookItem = document.createElement('li');
        bookItem.textContent = bookTitle;


        // Append the book to the "Done Reading" list
        doneReadingList.appendChild(bookItem);

        // Clear the input field after adding the book
        doneInput.value = '';
    } else {
        alert("Please enter a book title.");
    }
});


// Adding event listener for the "Clear" button
document.getElementById('clearBooksCurrentlyReading').addEventListener('click',function() {
    const currentInput = document.getElementById('currentlyReadingInput');
    const currentlyReadingList = document.getElementById('currentlyReadingList');
    currentInput.value = '';
    currentlyReadingList.innerHTML = '';
})


// Adding event listener for the search input field to fetch data as user types
document.getElementById('searchBox').querySelector('input').addEventListener('keyup', function(event) {
    const searchBox = event.target.value.trim(); 

    if (searchBox.length > 0) {
        performSearch(); 
    } else {
        document.getElementById("results").innerHTML = ""; // Clear results if input is empty
    }
});

// Adding event listener for the feedback form submission
document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const feedbackInput = document.getElementById('feedbackInput').value.trim(); 
    

    if (feedbackInput) {
        alert('Thank you for your feedback: ' + feedbackInput); 

        document.getElementById('feedbackInput').value = '';
    } else {
        alert("Please enter feedback before submitting.");
    }
});


