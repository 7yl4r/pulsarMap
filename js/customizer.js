
// helpers  for pulsar lister
var availableTags = [
    'J0437-4715', 'J1456-6843', 'J1243-6423', 'J0835-4510', 'J0953+0755', 'J0826+2637', 'J0534+2200', 'J0528+2200', 'J0332+5434', 'J2219+4754', 'J2018+2839', 'J1935+1616', 'J1932+1059', 'J1645-0317'
    //TODO: add more pulsars here (get them from the atnf db programatically?)
];
function split( val ) {
    return val.split( /,\s*/ );
}
function extractLast( term ) {
    return split( term ).pop();
}

$(function() {
    //init datepicker
    $("#datepicker").datepicker();

    //init pulsar selector
    $("#pulsar-lister").bind("keydown", function (event) {
        // don't navigate away from the field on tab when selecting an item
        if (event.keyCode === $.ui.keyCode.TAB &&
            $(this).autocomplete("instance").menu.active) {
            event.preventDefault();
        }
    }).autocomplete({
        minLength: 0,
        source: function (request, response) {
            // delegate back to autocomplete, but extract the last term
            response($.ui.autocomplete.filter(
                availableTags, extractLast(request.term)));
        },
        focus: function () {
            // prevent value inserted on focus
            return false;
        },
        select: function (event, ui) {
            var terms = split(this.value);
            // remove the current input
            terms.pop();
            // add the selected item
            terms.push(ui.item.value);
            // add placeholder to get the comma-and-space at the end
            terms.push("");
            this.value = terms.join(", ");
            return false;
        }
    });

    $("#use-orig-pulsars-btn").button().click(function () {
        var pulsarLister = $('#pulsar-lister');
        if (pulsarLister.prop("disabled")) {
            pulsarLister.prop("disabled", false);
        } else {
            pulsarLister.prop("disabled", true);
        }
    });
});
