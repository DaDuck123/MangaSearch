var searchbtn = document.getElementById('search_btn');
var searchInput = document.getElementById('search').value;
var results = document.getElementById('manga_result');


fetch(`https://api.mangadex.org/manga?limit=10&includes%5B%5D=cover_art`)
    .then(response => response.json())
    .then(data => {
        var Mangadata = data?.data || []; //Di kuhaon ang undefined nga data

        if (Mangadata.length === 0) {
            // Display a message when no titles are found
            results.innerHTML = "<p>No titles found.</p>";
            return;
        }

        Mangadata.forEach(manga => {
            let mangatitle = manga.attributes.title.en;
            let mangadesc = manga.attributes.description.en;
            manga.relationships.forEach((relationship, index) => {  //iterating relationship to find Filename
                if (relationship.attributes && relationship.attributes.fileName) { // finding
                    const fileName = relationship.attributes.fileName;
                    const mangaid = manga.id;
                    results.innerHTML += `
                <div class="manga-container">
                    <div id="manga-img">
                        <img src="https://uploads.mangadex.org/covers/${mangaid}/${fileName}"/>
                    </div>
                <div id="text-group">
                    <div id="manga-title">
                        <h3>${mangatitle}</h3>
                    </div>
                    <div id="manga-desc">
                        <p>${mangadesc}</p>
                    </div>
                </div>
                </div>`;
                    console.log(Mangadata)
                }
            });
        });


    });

searchbtn.addEventListener('click', async (evt) => {
    var search = document.getElementById('search').value;
    var results = document.getElementById('manga_result');

    results.innerHTML = "";

    if (search.trim() === "") {
        return; //Di mo kuhag API rquest ug way input
    }
    fetch(`https://api.mangadex.org/manga?title=${search}&includes%5B%5D=cover_art`)
        .then(response => response.json())
        .then(data => {
            var Mangadata = data?.data || []; //Di kuhaon ang undefined nga data

            if (Mangadata.length === 0) {
                // Display a message when no titles are found
                results.innerHTML = "<p>No titles found.</p>";
                return;
            }

            Mangadata.forEach(manga => {
                let mangatitle = manga.attributes.title.en;
                let mangadesc = manga.attributes.description.en;
                manga.relationships.forEach((relationship, index) => {  //iterating relationship to find Filename
                    if (relationship.attributes && relationship.attributes.fileName) { // finding
                        const fileName = relationship.attributes.fileName;
                        const mangaid = manga.id;
                        results.innerHTML += `
                <div class="manga-container">
                    <div id="manga-img">
                        <img src="https://uploads.mangadex.org/covers/${mangaid}/${fileName}"/>
                    </div>
                <div id="text-group">
                    <div id="manga-title">
                        <h3>${mangatitle}</h3>
                    </div>
                    <div id="manga-desc">
                        <p>${mangadesc}</p>
                    </div>
                </div>
                </div>`;

                    }
                });
            });


        });
});
searchbtn.addEventListener('click', (evt) => {
    document.getElementById("search").value = "";
});