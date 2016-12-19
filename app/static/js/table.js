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
            },
            {
                'targets': [3, 4, 5, 6, 7, 8],
                'render': function(data, type, row) {
                    var statsLabels = ['hp', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed'],
                        stats = [];
                    for (var i = 0; i < statsLabels.length; i++)
                        stats.splice(0, 0, row[statsLabels[i]]);
                    stats = stats.sort(function(a, b) {
                        return a - b;
                    });
                    if (data == stats[0])
                        return '<span class="lowest-stat">' + data + '</span>';
                    else if (data == stats[stats.length - 1])
                        return '<span class="greatest-stat">' + data + '</span>';
                    return data;
                }
            }
        ]
    });
});
