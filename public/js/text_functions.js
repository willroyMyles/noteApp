function setup_froala(id) {

    return new Promise((resolve, reject) => {

        console.log('func called');
        FroalaEditor.POPUP_TEMPLATES["customPlugin.popup"] = '[_BUTTONS_][_CUSTOM_LAYER_]';
        Object.assign(FroalaEditor.DEFAULTS, {
            popupButtons: ['makeLink', 'underline', 'insertLink'],
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
                if (editor.opts.popupButtons.length > 1) {
                    popup_buttons += '<div class="fr-buttons">';
                    popup_buttons += editor.button.buildList(editor.opts.popupButtons);
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
                // Get the popup object defined above.
                var $popup = editor.popups.get('customPlugin.popup');

                // If popup doesn't exist then create it.
                // To improve performance it is best to create the popup when it is first needed
                // and not when the editor is initialized.
                if (!$popup) $popup = initPopup();

                // Set the editor toolbar as the popup's container.
                editor.popups.setContainer('customPlugin.popup', editor.$tb);

                // This will trigger the refresh event assigned to the popup.
                // editor.popups.refresh('customPlugin.popup');

                // This custom popup is opened by pressing a button from the editor's toolbar.
                // Get the button's object in order to place the popup relative to it.
                // var $btn = editor.$tb.find('.fr-command[data-cmd="myButton"]');

                // // Set the popup's position.
                // var left = $btn.offset().left + $btn.outerWidth() / 2;
                // var top = $btn.offset().top + (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10);

                // left = currentMousePos.x;
                // top = currentMousePos.y;

                // Show the custom popup.
                // The button's outerHeight is required in case the popup needs to be displayed above it.
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
                        'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
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
                            'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
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

        resolve(editor);
    });

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
            a.href = "model";
            a.onclick = () => {
                justPrint();
            };
            a.classList.add('link-button');
            a.contentEditable = false;

            range.insertNode(a);
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.text = replacementText;
    }
}