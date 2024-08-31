const totalImages = 25; // Total number of images
const imagesPerPage = 5; // Number of page numbers shown at a time

function loadImage(fileNumber) {
    let imgElement = document.getElementById('page-content');
    let filePath = `/assets/${fileNumber}.jpeg`;

    console.log(`Loading image: ${filePath}`);  // Log the path to be loaded

    imgElement.src = filePath;

    imgElement.onerror = function() {
        console.error(`Failed to load image: ${filePath}`);
        imgElement.src = '';  // Clear the src
        imgElement.alt = `Image ${fileNumber}.jpeg not found`;
    };
}

function changePage(newFileNumber) {
    if (newFileNumber > totalImages) {
        // Redirect to appsc.gndec.ac.in after page 25
        window.location.href = 'https://appsc.gndec.ac.in/';
        return;
    }

    if (newFileNumber < 1) return;

    console.log(`Changing to image number: ${newFileNumber}`);

    document.getElementById('currentFileNumber').textContent = newFileNumber;

    loadImage(newFileNumber);
    updatePagination(newFileNumber);
}

function updatePagination(currentPage) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // Clear previous pagination buttons

    let startPage = Math.floor((currentPage - 1) / imagesPerPage) * imagesPerPage + 1;
    let endPage = Math.min(startPage + imagesPerPage - 1, totalImages);

    // Create Previous button for pagination
    if (startPage > 1) {
        let prevButton = document.createElement('button');
        prevButton.textContent = '«'; // Previous arrow
        prevButton.addEventListener('click', () => updatePagination(startPage - imagesPerPage));
        paginationContainer.appendChild(prevButton);
    }

    // Create page number buttons
    for (let i = startPage; i <= endPage; i++) {
        let pageButton = document.createElement('button');
        pageButton.textContent = i;
        if (i === currentPage) {
            pageButton.disabled = true; // Highlight the current page
        }
        pageButton.addEventListener('click', () => {
            changePage(i);
        });
        paginationContainer.appendChild(pageButton);
    }

    // Create Next button
    if (endPage < totalImages) {
        let nextButton = document.createElement('button');
        nextButton.textContent = '»'; // Next arrow
        nextButton.addEventListener('click', () => updatePagination(startPage + imagesPerPage));
        paginationContainer.appendChild(nextButton);
    }
}

document.getElementById('nextButton').addEventListener('click', function() {
    let currentNumber = parseInt(document.getElementById('currentFileNumber').textContent);
    changePage(currentNumber + 1);
});

document.getElementById('prevButton').addEventListener('click', function() {
    let currentNumber = parseInt(document.getElementById('currentFileNumber').textContent);
    changePage(currentNumber - 1);
});

// Initial image load and pagination setup
loadImage(1);
updatePagination(1);
