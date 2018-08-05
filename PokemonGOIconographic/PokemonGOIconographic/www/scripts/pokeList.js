function loadPokeBox() {
    let generationObject;

    database.ref('PokemonRegions/').on("value").then(function (snapshot) {
        snapshot.forEach(function (data) {
            generationObject = data.key;
            console.log(data.key);
        });
    });
}