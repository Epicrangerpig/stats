var draw = function(list) {
    $('#viz').empty();
    $('#radar-viz-wrapper').empty();

    var data = [];
    $('#radar-viz-wrapper').css('height', list.length * 412);
    
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
        'fairy': '#D685AD'
    };

    $.each(list, function(i, pokemon) {
        var thisData = [],
        stats = [['Attack', 'attack'], ['Defense', 'defense'], ['Sp. Attack', 'sp_attack'], ['Sp. Defense', 'sp_defense'], ['Speed', 'speed'], ['HP', 'hp']];
        $.each(stats, function(i, stat) {
            thisData.splice(0, 0, {
                'total': pokemon['total'], 
                'type': pokemon['type1'], 
                'name': pokemon['forme'],
                'stat': stat[0], 
                'value': pokemon[stat[1]]
            });
        });

        var viz = $($.parseHTML('<div></div>')),
            row = $($.parseHTML('<div></div>')),
            title = $($.parseHTML('<h4></h4>')),
            hr = $($.parseHTML('<hr>'));

        row.addClass('row');
        viz.attr('id', 'pokemon' + pokemon['id'])
            .addClass('col-md-12 radar-viz');
        title.addClass('radar-title text-center')
            .html(pokemon['forme']);
        row.append(hr);
        row.append(title);
        row.append(viz);
        $('#radar-viz-wrapper').append(row);
        
        var visualization = d3plus.viz()
            .container('#' + viz.attr('id'))
            .data(thisData)
            .id(['name', 'stat'])
            .size('value')
            .color(function(d) {
                return d3plus.color.lighter(typeColor[d.type], 0.00005 * d.total);
            })
            .type('radar')
            .draw();
        
        data = data.concat(thisData);
        data.splice(0, 0, {
            'total': pokemon['total'], 
            'type': pokemon['type1'], 
            'stat': 'Total', 
            'name': pokemon['forme'], 
            'value': pokemon['total']
        });
    });

    var visualization = d3plus.viz()
        .container('#viz')
        .data(data)
        .type('bar')
        .id('name')
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
            },
            'ticks': false
        })
        .background('#fff')
        .color(function(d) {
            var color = typeColor[d.type];
            return d3plus.color.lighter(color, 0.00005*d.total);
        })
        .legend({
            'size': 90
        })
        .font({'family': 'Helvetica', 'color': '#231F20', 'size': '15'})
        .draw();
};

var addSprites = function(list) {
    $('#selected-pokemon').empty();

    $.each(list, function(i, item) {
        var sprite = $($.parseHTML('<img></img>')),
            figure = $($.parseHTML('<figure></figure>')),
            figcaption = $($.parseHTML('<figcaption></figcaption>')),
            name = item.name.replace(new RegExp('é', 'g'), 'e').replace(new RegExp('[^a-zA-z]', 'g'), '').toLowerCase(),
            forme = item.forme;

        if (encodeURI(item.name) == 'Nidoran%E2%99%82') 
            name += 'm';
        else if (encodeURI(item.name) == 'Nidoran%E2%99%80') 
            name += 'f';

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

        sprite.attr('src', '//play.pokemonshowdown.com/sprites/bw/' + name + '.png')
            .attr('alt', item.name)
            .attr('title', item.forme);

        figure.append(sprite);
        figure.append(figcaption.html(item.forme));
        $('#selected-pokemon').append(figure);
    });
};

var getPokemon = function(list) {
    $('#result > .container-fluid').removeClass('hidden');

    $.ajax({
        url: '/api/pokemon/get',
        type: 'POST',
        data: {'ids': list},
        success: function(result) {
            addSprites(result.data);
            draw(result.data);
        }
    });
};

$(function() {
    $(this).scrollTop(0);
    $(this).find('body').css('background-color', '#77AC98');
    $(this).scroll(function () {
        var $nav = $("nav");
        $nav.toggleClass('scrolled', $(this).scrollTop() > 860);
    });    
    
    $('select').select2({
        width: '80%',
        placeholder: 'Choose Pokémon'
    });

    $('#compare-button').click(function() {
        if (!$('select').val().length)
            return;

        var selected = [];
        $.each($('select').val(), function(i, val) {
            selected.splice(0, 0, val);
        });
        getPokemon(selected);
    });

    $('#rand-button').click(function() {
        var n = $('select').find('option').length,
            i = 0, j = 0;
        while (i == j) {
            i = Math.floor(Math.random() * n);
            j = Math.floor(Math.random() * n);
        }

        var list = [$('select').find('option')[i].value, $('select').find('option')[j].value];
        getPokemon(list);
    });

    $('.eevee').click(function() {
        var list = [];
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
                    list.splice(0, 0, $(option).attr('value'));
                    break;
            }
        });
        getPokemon(list);
    });
});
