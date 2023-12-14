
var Content = document.getElementById('wrapper');
Content.innerHTML += `<div id="manga_header">
<div id="manga_title">
    <div id="title_shadow">
        <div id="logo"></div>
        <h1>MangaDuc</h1>
    </div>
    <div id="search_box">
        <input type="text" placeholder="Search..." id="search" />
        <label for="search"></label>
        <button id="search_btn">
            <i class='bx bx-search'></i>
        </button>
    </div>
    <div id="group_icons">
        <i class='bx bx-history'></i>
        <i class='bx bxs-user-circle'></i>
    </div>
</div>
<div id="manga_box">
    <div id="manga_nav">
        <div class="nav_box">
            <i class='bx bx-bookmark'></i>
            <h4>BookMark</h4>
            <i class='bx bx-chevron-down'></i>
        </div>
        <div class="nav_box">
            <i class='bx bx-book-reader'></i>
            <h4>Titles</h4>
            <i class='bx bx-chevron-down'></i>
        </div>
        <div class="nav_box">
            <i class='bx bx-group'></i>
            <h4>Community</h4>
            <i class='bx bx-chevron-down'></i>
        </div>
        <div class="nav_box">
            <i class='bx bx-pin'></i>
            <h4>MangaDuc</h4>
            <i class='bx bx-chevron-down'></i>
        </div>
    </div>
    <div id="manga_list">
        <div id="manga_text">
            <i class='bx bx-list-ul'></i>
            <h4>Manga List</h4>
        </div>
        <i class='bx bx-chevron-right'></i>
    </div>
    <div id="manga_result"></div>
</div>
</div>`;

var results = document.getElementById('manga_result');

for (var loading = 0; loading < 20; loading++) {    //Skeleton Loading Screen
    results.innerHTML += `<div class="manga-containerhtml">
    <div id="manga-imghtml">
        <i class='bx bx-image'></i>
    </div>
    <div id="text-grouphtml">
        <div id="manga-titlehtml"></div>
        <div class="manga-deschtml">
            <hr>
            <hr>
            <hr>
        </div>
    </div>
</div>`
}
var loadingscreen = document.getElementById('manga-containerhtml')
var searchbtn = document.getElementById('search_btn');
var searchInput = document.getElementById('search').value;
fetch(`https://api.mangadex.org/manga?limit=20&includes%5B%5D=cover_art`)
    .then(response => response.json())
    .then(data => {
        loadingscreen.style.display = 'none';
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
var loadingscreen = document.getElementById('manga-containerhtml')
var searchbtn = document.getElementById('search_btn');
var searchInput = document.getElementById('search').value;

searchbtn.addEventListener('click', async (evt) => {
    var search = document.getElementById('search').value;
    var results = document.getElementById('manga_result');

    results.innerHTML = "";
    for (var loading = 0; loading < 20; loading++) {    //Skeleton Loading Screen
        results.innerHTML += `<div class="manga-containerhtml">
        <div id="manga-imghtml">
            <i class='bx bx-image'></i>
        </div>
        <div id="text-grouphtml">
            <div id="manga-titlehtml"></div>
            <div class="manga-deschtml">
                <hr>
                <hr>
                <hr>
            </div>
        </div>
    </div>`
    }

    if (!search || search === "") {
        return; //Di mo kuhag API rquest ug way input
    } 
    fetch(`https://api.mangadex.org/manga?limit=20&title=${search}&includes%5B%5D=cover_art`)
        .then(response => response.json())
        .then(data => {
            loadingscreen.style.display = 'none';
            var Mangadata = data?.data || []; //Di kuhaon ang undefined nga data

            if (Mangadata.length === 0) {
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