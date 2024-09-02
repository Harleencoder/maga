const totalPages = 24;  // Define total pages

function loadImage(fileNumber) {
    const imgElement = document.getElementById('page-content');
    const filePath = /assets/${fileNumber}.jpeg;

    console.log(Attempting to load image: ${filePath});

    imgElement.src = filePath;
    imgElement.alt = Image ${fileNumber};

    imgElement.onerror = function() {
        console.error(Failed to load image: ${filePath});
        imgElement.src = '';  // Clear the src attribute
        imgElement.alt = Image ${fileNumber} not found;
    };

    if (fileNumber > totalPages) {
        window.location.href = "https://www.gndec.ac.in";
    }

    // Update the active page in pagination
    updatePagination(fileNumber);
}

function changePage(step) {
    const currentNumber = parseInt(document.getElementById('page-content').alt.match(/\d+/)[0]);
    const newFileNumber = currentNumber + step;

    if (newFileNumber < 1 || newFileNumber > totalPages) {
        console.log(Invalid page number: ${newFileNumber});
        return;
    }

    loadImage(newFileNumber);
}

function goToPage(pageNumber) {
    loadImage(pageNumber);
}

function updatePagination(activePage) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('span');
        pageLink.textContent = i;
        pageLink.style.cursor = 'pointer';
        pageLink.style.margin = '0 5px';
        pageLink.style.padding = '5px';
        pageLink.style.border = '1px solid #000';
        pageLink.style.borderRadius = '3px';

        if (i === activePage) {
            pageLink.style.backgroundColor = '#ccc';  // Highlight the active page
        }

        pageLink.addEventListener('click', function() {
            goToPage(i);
        });

        paginationContainer.appendChild(pageLink);
    }
}

document.getElementById('nextButton').addEventListener('click', function() {
    changePage(1);
});

document.getElementById('prevButton').addEventListener('click', function() {
    changePage(-1);
});

// Load the initial image and setup pagination
loadImage(1);
