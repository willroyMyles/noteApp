function setup_froala(id) {


    FroalaEditor.POPUP_TEMPLATES["customPlugin.popup"] = '[_BUTTONS_][_CUSTOM_LAYER_]';
    FroalaEditor.POPUP_TEMPLATES["customLink.popup"] = '[_BUTTONS_][_CUSTOM_LAYER_]';
    Object.assign(FroalaEditor.DEFAULTS, {
        popupButton: ['makeLink', 'editLink', 'insertLink', 'editLink'],
        linkButtons: ['openLink', 'editLink', 'unlink'],
    });

    var currentMousePos = {
        x: -1,
        y: -1
    };
    $(document).mousemove(function(event) {
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
    });

    // set up froala

    FroalaEditor.PLUGINS.customPlugin = function(editor) {
        // Create custom popup.
        function initPopup() {
            // Popup buttons.
            var popup_buttons = '';

            // Create the list of buttons.
            if (editor.opts.popupButton.length > 1) {
                popup_buttons += '<div class="fr-buttons">';
                popup_buttons += editor.button.buildList(editor.opts.popupButton);
                popup_buttons += '</div>';

            }

            // Load popup template.
            var template = {
                buttons: popup_buttons,
                custom_layer: '<div class="custom-layer">Hello World!</div>'
            };

            // Create popup.
            var $popup = editor.popups.create('customPlugin.popup', template);

            return $popup;
        }

        // Show the popup
        function showPopup() {
            var $popup = editor.popups.get('customPlugin.popup');
            if (!$popup) $popup = initPopup();
            editor.popups.setContainer('customPlugin.popup', editor.$tb);
            editor.popups.show('customPlugin.popup', currentMousePos.x, currentMousePos.y, 10);
        }

        // Hide the custom popup.
        function hidePopup() {
            editor.popups.hide('customPlugin.popup');
        }

        // Methods visible outside the plugin.
        return {
            showPopup: showPopup,
            hidePopup: hidePopup
        }
    }



    FroalaEditor.DefineIcon('makeLink', {
        NAME: 'times',
        SVG_KEY: 'Link'
    });
    FroalaEditor.RegisterCommand('makeLink', {
        title: 'Create Link',
        undo: false,
        focus: false,
        callback: function() {
            this.customPlugin.hidePopup();
            var text = this.selection.inEditor() ? this.selection.text() : undefined;
            if (text == '' || text == undefined) return;
            replaceSelectedText(text);
        }
    });

    var editor;
    var target;

    if (id != undefined) target = $('#' + id).find('.editable-div')['0'];
    else target = document.getElementsByClassName('editable-div');

    if (target.length == undefined)
        editor = new FroalaEditor(target, {
            toolbarContainer: '#toolbar',
            saveUrl: "this",

            toolbarButtons: {
                'moreText': {
                    'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
                },
                'moreParagraph': {
                    'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
                },
                'moreMisc': {
                    'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help', 'link'],
                    'align': 'right',
                    'buttonsVisible': 2
                }
            },
            events: {
                'link.bad': function(original_href) {
                    // Do something here.
                    // this is the editor instance.
                    console.log(this);
                    console.log("bad link");
                },
                'link.beforeInsert': function(link, text, attrs) {
                    // Do something here.
                    // this is the editor instance.
                    console.log(this);
                    console.log(link);
                },
                'save.before': function() {
                    // Before save request is made.
                },

                'save.after': function() {
                    // After successfully save request.
                },

                'save.error': function() {
                    // Do something here.
                },
            },

            // Set the save param.
            saveParam: 'content',

            // Set the save URL.
            saveURL: 'http://localhost:8000/save',

            // HTTP request type.
            saveMethod: 'POST',

            // Additional save params.
            saveParams: { id: 'editable-div' },

        });
    else {
        $(target).each((index, element) => {
            editor = new FroalaEditor(element, {
                toolbarContainer: '#toolbar',
                saveUrl: "this",

                toolbarButtons: {
                    'moreText': {
                        'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
                    },
                    'moreParagraph': {
                        'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
                    },
                    'moreMisc': {
                        'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help', 'link'],
                        'align': 'right',
                        'buttonsVisible': 2
                    }
                },
                events: {
                    'link.bad': function(original_href) {
                        // Do something here.
                        // this is the editor instance.
                        console.log(this);
                        console.log("bad link");
                    },
                    'link.beforeInsert': function(link, text, attrs) {
                        // Do something here.
                        // this is the editor instance.
                        console.log(this);
                        console.log(link);
                    },
                    'save.before': function() {
                        // Before save request is made.
                    },

                    'save.after': function() {
                        // After successfully save request.
                    },

                    'save.error': function() {
                        // Do something here.
                    },
                },

                // Set the save param.
                saveParam: 'content',

                // Set the save URL.
                saveURL: 'http://localhost:8000/save',

                // HTTP request type.
                saveMethod: 'POST',

                // Additional save params.
                saveParams: { id: 'editable-div' },

            });
        })
    }
    return editor;

}

function replaceSelectedText(replacementText) {
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            var a = document.createElement('a');
            var linkText = document.createTextNode(replacementText);
            a.appendChild(linkText);
            a.title = replacementText;
            a.href = replacementText;
            a.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                justPrint();
                //insertPage(replacementText);
            };
            a.classList.add('link-button');
            a.contentEditable = false;

            range.insertNode(a);
            insertPage(replacementText);
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.text = replacementText;
    }
}