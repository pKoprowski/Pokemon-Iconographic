function set_PokeDbMenuActive(element) {

    switch (element.id)
    {
        case 'pokeAdding':
            $('#pokeAddingBox').css('display', 'block');
            $('#PokedbPreviewBox').css('display', 'none');
            $('#pokeAdding').addClass('bordetBottomLine_RED');
            $('#PokedbPreview').removeClass('bordetBottomLine_RED');
            break;

        case 'PokedbPreview':
            $('#pokeAddingBox').css('display', 'none');
            $('#PokedbPreviewBox').css('display', 'block');
            $('#PokedbPreview').addClass('bordetBottomLine_RED');
            $('#pokeAdding').removeClass('bordetBottomLine_RED');
            break;
    }
}

function showEffectiveAndWeak(type)
{
    if ($('#superEffective_' + type).css('visibility') == 'visible' &&
        $('#weak_' + type).css('visibility') == 'visible')
    {
        $('#superEffective_' + type).css('visibility', 'hidden');
        $('#weak_' + type).css('visibility', 'hidden');
    }
    else
    {
        $('#superEffective_' + type).css('visibility', 'visible');
        $('#weak_' + type).css('visibility', 'visible');
    }
}

function activeFileButton() {

    if ($("#pokeNumber").val() && $("#pokeName").val())
        $("#pokeFile").prop("disabled", false);
    else
        $("#pokeFile").prop("disabled", true);
}

function setPokemonType(type, object)
{
    $('#' + object.id).toggleClass('selectedType');

}


$("#pokeFile").change(function () {
    var file = document.querySelector('#pokeFile').files[0];
    var name;
    var metadata;
    var task;
    var regName;
    
    if ($("select#pokeRegions").val() && file && $("#pokeNumber").val()) {

        regName = $("select#pokeRegions").val();
        regName = regName.slice(regName.indexOf('#')+1, regName.length);

        name = file.name
        metadata = {
            contentType: file.type
        };
        $("#filePath").text(' Pokemons/' + regName + "/" + $("#pokeNumber").val());

        task = storageRef.child('Pokemons/' + regName + "/" + $("#pokeNumber").val()).put(file, metadata);
        task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then((url) => {
                document.querySelector('#previewImg > img').src = url;
                $("#pokeFile").prop("disabled", true);

            })
            .catch(console.error);
    }
});

function deleteFileDB(type) {

    if (confirm('Czy chesz usun�� plik ze �cie�ki ' + $("#filePath").val())) {
        var desertRef = storageRef.child($("#filePath").val());

        desertRef.delete().then(function () {
            alert('Usuni�to plik z bazy');
            $("#pokeFile").prop("disabled", false);
        }).catch(function (error) {
            alert(error);
        });
    }
}

function addToDatabase()
{
    if ($("#pokeName").val() &&
        $("#previewImg > img").attr("src") && 
        $("#pokeNumber").val() &&
        $(".selectedType").length != 0)
    {
        var types = "";
        var name = $("#pokeName").val();
        var number = $("#pokeNumber").val();
        var imgSrc = $("#previewImg > img").attr("src");
        var regName = $("select#pokeRegions").val();
        regName = regName.slice(regName.indexOf('#')+1, regName.length);

        for (var i = 0; i < $(".selectedType").length; i++)
        {
            types += '#' + $(".selectedType")[i].innerText;
        }

        var pokeRef = database.ref('pokemons/' + regName + '/' + $("#pokeNumber").val());
        pokeRef.set({
            Number: number,
            Name: name,
            Img: imgSrc,
            Types: types
        }).then(function () {
            alert('Dodano ' + name);
            clearFieldsAfterAddToDb();
        }).catch(function (error) {
            alert(error);
        });
    }

}

function clearFieldsAfterAddToDb()
{
    $("#pokeName").val('');
    $("#pokeNumber").val('');
    $('#filePath').val('');
    $("#previewImg > img").attr("src", "");
    for (var i = 0; i < $(".selectedType").length; i++)
    {
        $(".selectedType")[i].removeClass("selectedType");
    }
}

function createDb_View()
{
    $('#PokedbPreviewBox').empty();
    database.ref('pokemons').on("value", function (snapshot) {
        pokeDex = snapshot.val();
        $.each(pokeDex, function(regionName) {
            $('#PokedbPreviewBox').append('<div class="regionTab" id="region_'+regionName+'"><div id="'+regionName+'">'+regionName+'</div><div>');
            curpokeDex = pokeDex[regionName];
            
            for(var i = 1; i <= curpokeDex.length - 1; i++)
            {
                var pokeDexNum = curpokeDex[i];
                $('.regionTab').append('<p>Numer'+pokeDexNum.Number+'</p><p> Nazwa'+ pokeDexNum.Name +'</p><img src="'+pokeDexNum.Img+'" />');
            }
        });
            
    });
}