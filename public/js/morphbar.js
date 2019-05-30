var showing = false;
var clickButton = false

function createLinkButton() {
    var btn = $('<a href=""><i class="fas fa-link icon selection"></i></a>');
    btn.appendTo($('.morph-toolbar'));
    showing = true;
    btn.on('click', (e) => {
        clickButton = true;
        e.preventDefault();
        console.log('clicked');
    });

    btn.focusout((e) => {
        removeSelectionButton();
    })

}

function removeSelectionButton() {
    $('.selection').remove();
    showing = false;
    clickButton = false;
}