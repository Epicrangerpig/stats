$(document).ready(function() {
    $('#pokemon').DataTable({
        "sAjaxSource": "/api/pokemon",
        "aoColumns": [
          { "mData": "ndex" },
          { "mData": "name" },
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
        "aoColumnDefs": [{
            "aTargets": [9],
            "mData": function (source, type, val) {
            if (source.type2 === undefined) {
                val = source.type2;
                return;
            }
        }}]
    });
});
