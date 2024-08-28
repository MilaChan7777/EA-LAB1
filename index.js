document.getElementById('fetchkitty-button').addEventListener('click', fetchKittyData);

async function fetchKittyData() {
    renderKittyLoadingState();
    try {
        const response = await fetch('https://catfact.ninja/fact');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        renderKittyData(data);
    } catch (error) {
        renderKittyErrorState();
        console.error('Error fetching data:', error);
    }
}

function renderKittyErrorState() {
    const container = document.getElementById('data-container');
    container.innerHTML = '<p>Failed to load data</p>';
    console.log('Failed to load data');
}

function renderKittyLoadingState() {
    const container = document.getElementById('data-container');
    container.innerHTML = '<p>Loading...</p>';
    console.log('Loading...');
}

function renderKittyData(data) {
    const container = document.getElementById('data-container');
    container.innerHTML = '';

    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `<p>${data.fact}</p>`;
    container.appendChild(div);
}

document.getElementById('fetchdog-button').addEventListener('click', fetchDogData);

async function fetchDogData() {
    renderDogLoadingState();
    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        renderDogData(data);
    } catch (error) {
        renderDogErrorState();
        console.error('Error fetching data:', error);
    }
}

function renderDogErrorState() {
    const container = document.getElementById('data-container2');
    container.innerHTML = '<p>Failed to load data</p>';
    console.log('Failed to load data');
}

function renderDogLoadingState() {
    const container = document.getElementById('data-container2');
    container.innerHTML = '<p>Loading...</p>';
    console.log('Loading...');
}

function renderDogData(data) {
    const container = document.getElementById('data-container2');
    container.innerHTML = '';

    const img = document.createElement('img');
    img.src = data.message;
    img.alt = 'Random Puppy';
    container.appendChild(img);
}

document.getElementById('search-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('anime-name').value;
    const type = document.getElementById('anime-type').value;
    const limit = document.getElementById('anime-limit').value || 10;

    renderAnimeLoadingState();

    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?limit=${limit}&q=${encodeURIComponent(name)}&type=${type}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.data.length === 0) {
            renderAnimeEmptyState();
        } else {
            renderAnimeResults(data.data);
        }
    } catch (error) {
        renderAnimeErrorState();
        console.error('Error fetching data:', error);
    }
});

function renderAnimeLoadingState() {
    const container = document.getElementById('anime-results');
    container.innerHTML = '<p>Loading...</p>';
}

function renderAnimeErrorState() {
    const container = document.getElementById('anime-results');
    container.innerHTML = '<p>Failed to load data</p>';
    console.log('Failed to load data');
}

function renderAnimeEmptyState() {
    const container = document.getElementById('anime-results');
    container.innerHTML = '<p>No results found</p>';
}

function renderAnimeResults(animeList) {
    const container = document.getElementById('anime-results');
    container.innerHTML = '';

    animeList.forEach(anime => {
        const div = document.createElement('div');
        div.className = 'anime-result';
        div.innerHTML = `
            <h2>${anime.title}</h2>
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <p>${anime.synopsis || 'No synopsis available.'}</p>
            <p><strong>Type:</strong> ${anime.type}</p>
        `;
        container.appendChild(div);
    });
}
