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
                ]
            });
        }
    });
});
