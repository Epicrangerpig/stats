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
        .background('#fff')
        .color("name")
        .legend({
            'size': 90
        })
        .font({"family": "Merrywheater", "color": "#231F20", "size": "15"})
        .draw()
};

var addPokemonSprites = function(pokemonList) {
    $('#selected-pokemon').empty();
    $.each(pokemonList, function(i, pokemon) {
        var sprite = $($.parseHTML('<img></img>'));
        sprite
            .attr('src', '//play.pokemonshowdown.com/sprites/bw/' + pokemon.name.toLowerCase() + '.png')
            .attr('alt', pokemon.name)
            .attr('title', pokemon.name);
        $('#selected-pokemon').append(sprite);
        if (i < pokemonList.length-1) {
            var vs = $($.parseHTML('<span class="vs">vs.</span>'));
            $('#selected-pokemon').append(vs);
        }
    });
};

var getPokemonByIds = function(pokemonList) {
    if (pokemonList.length > 7) 
        $('#result').css('padding', '100px 0 40px 0');
    else
        $('#result').css('padding', '100px 0 60px 0');
    $('#result > .container').removeClass('hidden');
    $.ajax({
        url: '/api/pokemon/get',
        data: {'data': pokemonList},
        success: function(result) {
            addPokemonSprites(result.data);
            draw(result.data);
        }
    });
};

$(function() {
    $(this).scrollTop(0);

    $(this).scroll(function () {
        var $nav = $("nav");
        $nav.toggleClass('scrolled', $(this).scrollTop() > 860);
    });    
    
    $('select').select2({
        width: '80%',
        placeholder: 'Choose Pokémon for comparison'
    });

    $('#compare-button').click(function() {
        var selectedPokemon = [];
        $.each($('select').val(), function(i, id) {
            selectedPokemon.splice(0, 0, id);
        });
        getPokemonByIds(selectedPokemon);
    });

    $('#rand-button').click(function() {
        var nPokemon = $('select').find('option').length,
            i = 0,
            j = 0;
        while (i == j) {
            i = Math.floor(Math.random() * nPokemon)
            j = Math.floor(Math.random() * nPokemon)
        }
        var pokemonList = [$('select').find('option')[i].value, $('select').find('option')[j].value];
        getPokemonByIds(pokemonList);
    });

    $('.eevee').click(function() {
        var eeveelutions = []
        $.each($('select > option'), function(i, option) {
            switch ($(option).html().toLowerCase()) {
                case 'eevee':
                case 'vaporeon':
                case 'jolteon':
                case 'flareon':
                case 'espeon':
                case 'umbreon':
                case 'leafeon':
                case 'glaceon':
                case 'sylveon':
                    eeveelutions.splice(0, 0, $(option).attr('value'));
                    break;
            }
        });
        getPokemonByIds(eeveelutions);
    });
});
