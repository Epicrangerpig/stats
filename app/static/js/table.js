$(document).ready(function() {

    var abilities = []
    $.ajax({
        url: '/api/ability/',
        success: function(result) {
            abilities = result['data'];
            $('#pokemon').DataTable({
                'sAjaxSource': '/api/pokemon/',
                'pageLength': '20',
                fixedHeader: {
                    header: true,
                    headerOffset: 50
                },
                responsive: true,
                'aoColumns': [
                    { 'mData': 'ndex', 'sTitle': 'Dex' },
                    { 'mData': 'forme', 'sTitle': 'Name' },
                    { 'mData': 'total', 'sTitle': 'Total' },
                    { 'mData': 'hp', 'sTitle': 'HP' },
                    { 'mData': 'attack', 'sTitle': 'Attack' },
                    { 'mData': 'defense', 'sTitle': 'Defense' },
                    { 'mData': 'sp_attack', 'sTitle': 'Sp. Atk.' },
                    { 'mData': 'sp_defense', 'sTitle': 'Sp. Def.' },
                    { 'mData': 'speed', 'sTitle': 'Speed' },
                    { 'mData': 'type1', 'sTitle': 'Type 1' },
                    { 'mData': 'type2', 'sTitle': 'Type 2' },
                    { 'mData': 'ability1', 'sTitle': 'Ability 1' },
                    { 'mData': 'ability2', 'sTitle': 'Ability 2' },
                    { 'mData': 'hidden_ability', 'sTitle': 'Hidden Ability' }
                ],
                'columnDefs': [
                    {
                        'targets': [9, 10],
                        'render': function(data, type, row) {
                            return data.length ? '<span class="type ' + data + '">' + data + '</span>' : '';
                        }
                    },
                    {
                        'targets': [11, 12, 13],
                        'render': function(data, type, row) {
                            var content = $.parseHTML('<span></span>');
                            $(content).html(data);
                            if (data.length) {
                                $.each(abilities, function(i, ability) {
                                    if (ability[0] == data) {
                                        $(content).attr('title', ability[1]);
                                        return;
                                    }
                                });
                            }
                            return content[0].outerHTML;
                        }
                    }
                ],
                initComplete: function() {
                    var table = this;
                    
                    var label = $($.parseHTML('<label></label>')),
                        select = $($.parseHTML('<select></select>')),
                        types = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 
                                'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'];

                        var defaultOption = $($.parseHTML('<option></option>'));
                        defaultOption.html('all types')
                            .attr('selected', 'selected')
                            .attr('value', 0);
                        select.append(defaultOption);

                        $.each(types, function(i, type) {
                            var option = $($.parseHTML('<option></option>'));
                            option.attr('value', type)
                                .html(type);
                            select.append(option);
                        });

                        select.on('change', function() {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );
                            debugger
                            table.api().columns([9, 10]).search( val ? '^'+val+'$' : '', true, false)
                                    .draw();

                        })

                        select.addClass('input-sm form-control');
                        label.append(select);
                        $('#pokemon_filter').append(select);
                }
            });
        }
    });
});
