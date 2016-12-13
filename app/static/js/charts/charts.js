var draw = function(pokemonList) {
    $('#viz').empty();

    var data = [];
    $.each(pokemonList, function(i, pokemon) {
        data.splice(0, 0, {'stat': 'attack', 'name': pokemon['name'], 'value': pokemon['attack']});
        data.splice(0, 0, {'stat': 'defense', 'name': pokemon['name'], 'value': pokemon['defense']});
        data.splice(0, 0, {'stat': 'sp_attack', 'name': pokemon['name'], 'value': pokemon['sp_attack']});
        data.splice(0, 0, {'stat': 'sp_defense', 'name': pokemon['name'], 'value': pokemon['sp_defense']});
        data.splice(0, 0, {'stat': 'speed', 'name': pokemon['name'], 'value': pokemon['speed']});
        data.splice(0, 0, {'stat': 'hp', 'name': pokemon['name'], 'value': pokemon['hp']});
        data.splice(0, 0, {'stat': 'total', 'name': pokemon['name'], 'value': pokemon['total']});
    });

    var visualization = d3plus.viz()
        .container("#viz")
        .data(data)
        .type("bar")
        .id("name")
        .x({
            'value': 'stat', 
            'grid': false
        })
        .y({
            'value': 'value', 
            'grid': false
        })
        .axes({
            'background': {
                'color': '#fff'
            }
        })
        .background('#f2f2f2')
        .color("name")
        .legend({
            'size': 80
        })
        .draw()
};

$(function() {
    $('select').select2({
        width: '50%',
        placeholder: 'Choose Pokémon for comparison'
    });

    $('#compare-button').click(function() {
        var selectedPokemon = [];
        $.each($('select').val(), function(i, id) {
            selectedPokemon.splice(0, 0, id);
        });

        $.ajax({
            url: '/api/pokemon/get',
            data: {'data': selectedPokemon},
            success: function(result) {
                draw(result.data);
            }
        });
    });
});
