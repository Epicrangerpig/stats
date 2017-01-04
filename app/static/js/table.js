$(document).ready(function() {
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
            { 'mData': 'type2', 'sTitle': 'Type 2' }
        ],
        'columnDefs': [
            {
                'targets': [9, 10],
                'render': function(data, type, row) {
                    return data.length ? '<span class="type ' + data + '">' + data + '</span>' : '';
                }
            }
        ]
    });
});
