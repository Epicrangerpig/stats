var draw = function(pokemonList) {
    $('#viz').empty();

    var data = [];
    $.each(pokemonList, function(i, pokemon) {
        data.splice(0, 0, {'stat': 'Attack', 'name': pokemon['name'], 'value': pokemon['attack']});
        data.splice(0, 0, {'stat': 'Defense', 'name': pokemon['name'], 'value': pokemon['defense']});
        data.splice(0, 0, {'stat': 'Sp. Attack', 'name': pokemon['name'], 'value': pokemon['sp_attack']});
        data.splice(0, 0, {'stat': 'Sp. Defense', 'name': pokemon['name'], 'value': pokemon['sp_defense']});
        data.splice(0, 0, {'stat': 'Speed', 'name': pokemon['name'], 'value': pokemon['speed']});
        data.splice(0, 0, {'stat': 'HP', 'name': pokemon['name'], 'value': pokemon['hp']});
        data.splice(0, 0, {'stat': 'Total', 'name': pokemon['name'], 'value': pokemon['total']});
    });

    var visualization = d3plus.viz()
        .container("#viz")
        .data(data)
        .type("bar")
        .id("name")
        .x({
            'value': 'stat', 
            'grid': false,
            'ticks': false
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
        .background('#231F20')
        .color("name")
        .legend({
            'size': 90
        })
        .font({"family": "Merrywheater", "color": "#fff", "size": "15"})
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
