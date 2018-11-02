function loadPokeList() {

    let object;

    database.ref('PokemonRegions').on("value", function (snapshot) {
        object = snapshotToArray(snapshot);
        $("#pokeBox").append('<div class=/"scrollmenu bordetTopLine_RED/"></div>');
        for (var i = 0; i < object.length; i++) {
            $("#pokeBox > .scrollmenu").append('<a>' + object[i].Name + '</a>');
            loadPokemonsIcons(object[i]);
        }
    });
}

function loadPokemonsIcons(pokeGen) {
    let numbersCon = pokeGen.Numbers.split("-");
    let firstNumber = numbersCon[0];
    let secondNumber = numbersCon[1];
    let x;

    for (x = firstNumber; firstNumber <= 5; x++)
    {
        $("#pokeBox").append('<div id=pn_' + x + ' class=\'pokeList\'></div>');
        $("#pn_" + x).append('<img/>');
        strPath = 'Pokemons%2F' + pokeGen.Name + '%2F' + x + '.png';

        storageRef.child(strPath).getDownloadURL().then(function (url) {
            $('#pn_' + x).attr("src", url);
        });
    }
}