$(document).ready(function() {
    $('#pokemon').DataTable({
        "sAjaxSource": "/api/pokemon",
        "aoColumns": [
          { "mData": "ndex", 'sTitle': 'Dex number' },
          { "mData": "forme", 'sTitle': 'Name' },
          { "mData": "total", 'sTitle': 'Total' },
          { "mData": "hp", 'sTitle': 'HP' },
          { "mData": "attack", 'sTitle': 'Attack' },
          { "mData": "defense", 'sTitle': 'Defense' },
          { "mData": "sp_attack", 'sTitle': 'Sp. Attack' },
          { "mData": "sp_defense", 'sTitle': 'Sp. Defense' },
          { "mData": "speed", 'sTitle': 'Speed' },
          { "mData": "type1", 'sTitle': 'Type 1' },
          { "mData": "type2", 'sTitle': 'Type 2' }
        ]
    });
});
