var draw = function(pokemonList) {
    $('#viz').empty();

    var data = [];
    $.each(pokemonList, function(i, pokemon) {
        data.splice(0, 0, {'total': pokemon['total'], 'type': pokemon['type1'], 'stat': 'Attack', 'name': pokemon['forme'], 'value': pokemon['attack']});
        data.splice(0, 0, {'total': pokemon['total'], 'type': pokemon['type1'], 'stat': 'Defense', 'name': pokemon['forme'], 'value': pokemon['defense']});
        data.splice(0, 0, {'total': pokemon['total'], 'type': pokemon['type1'], 'stat': 'Sp. Attack', 'name': pokemon['forme'], 'value': pokemon['sp_attack']});
        data.splice(0, 0, {'total': pokemon['total'], 'type': pokemon['type1'], 'stat': 'Sp. Defense', 'name': pokemon['forme'], 'value': pokemon['sp_defense']});
        data.splice(0, 0, {'total': pokemon['total'], 'type': pokemon['type1'], 'stat': 'Speed', 'name': pokemon['forme'], 'value': pokemon['speed']});
        data.splice(0, 0, {'total': pokemon['total'], 'type': pokemon['type1'], 'stat': 'HP', 'name': pokemon['forme'], 'value': pokemon['hp']});
        data.splice(0, 0, {'total': pokemon['total'], 'type': pokemon['type1'], 'stat': 'Total', 'name': pokemon['forme'], 'value': pokemon['total']});
    });

    var typeColor = {
        'normal': '#A8A77A',
        'fire': '#EE8130',
        'water': '#6390F0',
        'electric': '#F7D02C',
        'grass': '#7AC74C',
        'ice': '#96D9D6',
        'fighting': '#C22E28',
        'poison': '#A33EA1',
        'ground': '#E2BF65',
        'flying': '#A98FF3',
        'psychic': '#F95587',
        'bug': '#A6B91A',
        'rock': '#B6A136',
        'ghost': '#735797',
        'dragon': '#6F35FC',
        'dark': '#705746',
        'steel': '#B7B7CE',
        'fairy': '#D685AD',
    };

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
        .color(function(d) {
            var color = typeColor[d.type];
            return d3plus.color.lighter(color, 0.00005*d.total);
        })
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
        var name = pokemon.name;
        var forme = pokemon.forme;
        if (forme.search(' [(]Mega') != -1) {
            name += '-mega';
            if (forme == 'Charizard (Mega Charizard X)')
                name += 'x';
            else if (forme == 'Charizard (Mega Charizard Y)')
                name += 'y';
        }
        if (forme.search(' [(]Alola Form') != -1) {
            name += '-alola';
        }
        sprite
            .attr('src', '//play.pokemonshowdown.com/sprites/bw/' + name.toLowerCase() + '.png')
            .attr('alt', pokemon.name)
            .attr('title', pokemon.forme);
        $('#selected-pokemon').append(sprite);
        if (i < pokemonList.length-1) {
            var vs = $($.parseHTML('<span class="vs">vs.</span>'));
            $('#selected-pokemon').append(vs);
        }
    });
};

var getPokemonByIds = function(pokemonList) {
    if (pokemonList.length > 7) 
        $('#result').css('padding', '40px 0 40px 0');
    else
        $('#result').css('padding', '100px 0 110px 0');
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
