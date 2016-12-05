$(document).ready(function() {
    $('#pokemon').DataTable({
        "sAjaxSource": "/api/pokemon",
        "aoColumns": [
          { "mData": "ndex" },
          { "mData": "name" },
          { "mData": "forme" },
          { "mData": "total" },
          { "mData": "hp" },
          { "mData": "attack" },
          { "mData": "defense" },
          { "mData": "sp_attack" },
          { "mData": "sp_defense" },
          { "mData": "speed" },
          { "mData": "type1" },
          { "mData": "type2" }
        ],
    });
});
