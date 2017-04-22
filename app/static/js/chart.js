'use strict';

var draw = function draw(list) {
    var $radarVizWrapper = $('#radar-viz-wrapper');
    var typeColor = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD'
    };
    var stats = [['Attack', 'attack'], ['Defense', 'defense'], ['Sp. Attack', 'sp_attack'], ['Sp. Defense', 'sp_defense'], ['Speed', 'speed'], ['HP', 'hp']];

    var data = [];

    $('#viz').empty();

    $radarVizWrapper.empty().css('height', list.length * 412);

    $.each(list, function (i, pokemon) {
        var $viz = $($.parseHTML('<div></div>'));
        var $row = $($.parseHTML('<div></div>'));
        var $title = $($.parseHTML('<h4></h4>'));
        var thisData = [];

        $.each(stats, function (i, stat) {
            thisData.splice(0, 0, {
                total: pokemon.total,
                type: pokemon.type1,
                name: pokemon.forme,
                stat: stat[0],
                value: pokemon[stat[1]]
            });
        });

        $viz.attr('id', 'pokemon' + pokemon.id).addClass('col-md-12 radar-viz');

        $title.addClass('radar-title text-center').html(pokemon.forme);

        $row.addClass('row').append($title).append($viz).append($($.parseHTML('<hr>')));

        $radarVizWrapper.append($row);

        var radarViz = d3plus.viz().container('#' + $viz.attr('id')).data(thisData).id(['name', 'stat']).size('value').color(function (d) {
            return d3plus.color.lighter(typeColor[d.type], 0.00005 * d.total);
        }).type('radar').draw();

        data = data.concat(thisData);
        data.splice(0, 0, {
            total: pokemon.total,
            type: pokemon.type1,
            name: pokemon.forme,
            value: pokemon.total,
            stat: 'Total'
        });
    });

    var barViz = d3plus.viz().container('#viz').data(data).type('bar').id('name').x({
        value: 'stat',
        grid: false,
        ticks: false
    }).y({
        value: 'value',
        grid: false
    }).axes({
        background: {
            color: '#fff'
        },
        ticks: false
    }).background('#fff').color(function (d) {
        return d3plus.color.lighter(typeColor[d.type], 0.00005 * d.total);
    }).legend({
        size: 90
    }).font({
        family: 'Helvetica',
        color: '#231F20',
        size: '15'
    }).draw();
};

var addSprites = function addSprites(list) {
    var $selectedPokemon = $('#selected-pokemon');

    $selectedPokemon.empty();

    $.each(list, function (i, item) {
        var $sprite = $($.parseHTML('<img></img>'));
        var $figure = $($.parseHTML('<figure></figure>'));
        var $figcaption = $($.parseHTML('<figcaption></figcaption>'));
        var forme = item.forme;
        var name = item.name.replace(new RegExp('é', 'g'), 'e').replace(new RegExp('[^a-zA-z2]', 'g'), '').toLowerCase();

        if (encodeURI(item.name) == 'Nidoran%E2%99%82') {
            name += 'm';
        } else if (encodeURI(item.name) == 'Nidoran%E2%99%80') {
            name += 'f';
        }

        if (forme.search(' [(]Mega') != -1) {
            name += '-mega';
            if (forme == 'Charizard (Mega Charizard X)') {
                name += 'x';
            } else if (forme == 'Charizard (Mega Charizard Y)') {
                name += 'y';
            }
        }

        if (forme.search(' [(]Alola Form') != -1) {
            name += '-alola';
        }

        $sprite.attr('src', '//play.pokemonshowdown.com/sprites/bw/' + name + '.png').attr('alt', item.name).attr('title', item.forme);

        $figure.append($sprite);
        $figure.append($figcaption.html(item.forme));
        $selectedPokemon.append($figure);
    });
};

var getPokemon = function getPokemon(list) {
    $('#result > .container-fluid').removeClass('hidden');

    $.ajax({
        url: '/api/pokemon/get',
        type: 'POST',
        data: { 'ids': list },
        success: function success(result) {
            addSprites(result.data);
            draw(result.data);
        }
    });
};

$(function () {
    $(this).scrollTop(0).find('body').css('background-color', '#77AC98').scroll(function () {
        $('nav').toggleClass('scrolled', $(this).scrollTop() > 860);
    });

    $('select').select2({
        width: '80%',
        placeholder: 'Choose Pokémon'
    });

    $('#compare-button').click(function () {
        var $select = $('select');
        var selected = [];

        if ($select.val().length == 0) return;

        $.each($select.val(), function (i, val) {
            selected.splice(0, 0, val);
        });

        getPokemon(selected);
    });

    $('#rand-button').click(function () {
        var $options = $('select option');
        var list = [];
        var i = 0;
        var j = 0;

        while (i == j) {
            i = Math.floor(Math.random() * $options.length);
            j = Math.floor(Math.random() * $options.length);
        }

        list = [$options[i].value, $options[j].value];
        getPokemon(list);
    });

    $('#clear-button').click(function () {
        $('select').val('').trigger('change');
    });

    $('.eevee').click(function () {
        var list = [];

        $.each($('select > option'), function (i, option) {
            var $option = $(option);

            switch ($option.html().toLowerCase()) {
                case 'eevee':
                case 'vaporeon':
                case 'jolteon':
                case 'flareon':
                case 'espeon':
                case 'umbreon':
                case 'leafeon':
                case 'glaceon':
                case 'sylveon':
                    list.splice(0, 0, $option.attr('value'));
                    break;
            }
        });

        getPokemon(list);
    });
});
