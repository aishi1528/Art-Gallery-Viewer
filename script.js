const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const gallery = document.getElementById("gallery");

async function fetchArtworks(query) {
  gallery.innerHTML = "<p>⏳ Loading artworks...</p>";

  try {
    const res = await fetch(
      `https://api.artic.edu/api/v1/artworks/search?q=${query}&fields=id,title,image_id,artist_display,date_display&limit=12`
    );
    const data = await res.json();

    if (!data.data.length) {
      gallery.innerHTML = "<p>❌ No artworks found.</p>";
      return;
    }

    gallery.innerHTML = "";
    data.data.forEach(art => {
      if (!art.image_id) return;

      const imgUrl = `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`;
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${imgUrl}" alt="${art.title}">
        <div class="info">
          <h3>${art.title}</h3>
          <p>${art.artist_display || "Unknown Artist"}</p>
          <p>${art.date_display || ""}</p>
        </div>
      `;
      gallery.appendChild(card);
    });
  } catch (error) {
    gallery.innerHTML = "<p>❌ Error loading artworks.</p>";
  }
}

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchArtworks(query);
  } else {
    gallery.innerHTML = "<p>⚠️ Please enter a search term.</p>";
  }
});

