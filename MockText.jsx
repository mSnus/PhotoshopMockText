// Copyright 2002-2007.  Adobe Systems, Incorporated.  All rights reserved.
// Create a new art layer and convert it to a text layer.
// Set its contents, size and color.

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// in case we double clicked the file
app.bringToFront();

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line



function createTextLayers(num, offset, text, type) {
    // suppress all dialogs
    //  app.displayDialogs = DialogModes.NO;
    //  alert('done!');

    num = parseInt(num);
    offset = parseInt(offset);

    var strtRulerUnits = app.preferences.rulerUnits;
    var strtTypeUnits = app.preferences.typeUnits;
    app.preferences.rulerUnits = Units.PIXELS;
    app.preferences.typeUnits = TypeUnits.PIXELS;

	 alert(type);
	 return true;


    if (app.documents.length == 0) {
        //   var docRef = app.documents.add(320, 240);
		  alert('No sense to use this without creating a document first!')
        return false;
    } else {
        var docRef = app.activeDocument;
    }

    //pick current text style
	 var newSize = 16;
	 var newFont = "Verdana";
    var textColor = new SolidColor;
    textColor.rgb.red = 0;
    textColor.rgb.green = 0;
    textColor.rgb.blue = 0;

    if (activeDocument.activeLayer.kind == LayerKind.TEXT) {
		 newSize = activeDocument.activeLayer.textItem.size;
		 newFont = activeDocument.activeLayer.textItem.font;
		 textColor = activeDocument.activeLayer.textItem.color;
    }

    for (var i = 0; i < num; i++) {
        var newTextLayer = docRef.artLayers.add();
        newTextLayer.kind = LayerKind.TEXT;

        newTextLayer.textItem.contents = text;

        var dy = offset * i;
        newTextLayer.translate(0, dy);
        //   newTextLayer.textItem.position = Array(0.75, 0.75);
        newTextLayer.textItem.size = newSize;
        newTextLayer.textItem.color = textColor;
		  newTextLayer.textItem.font = newFont
        newTextLayer = null;
    };

    app.preferences.rulerUnits = strtRulerUnits;
    app.preferences.typeUnits = strtTypeUnits;
    docRef = null;
    textColor = null;
}

var dlg = new Window('dialog', 'Text Mock Creator', [100, 100, 500, 500]);

dlg.panelParams = dlg.add('panel', [10, 10, 400, 350], 'Parameters');
dlg.panelParams.numStringsLabel = dlg.panelParams.add('statictext', [15, 10, 120, 30], 'Number of strings');
dlg.panelParams.numStrings = dlg.panelParams.add('edittext', [15, 40, 120, 60], '3');

dlg.panelParams.offsetLabel = dlg.panelParams.add('statictext', [200, 10, 280, 30], 'Offset (px)');
dlg.panelParams.offsetPx = dlg.panelParams.add('edittext', [200, 40, 280, 60], '15');

dlg.mockGroup = dlg.panelParams.add('panel', [12, 80, 282, 300], 'Mock what:');

dlg.panelParams.mockTextRadio = dlg.mockGroup.add('radiobutton', [15, 20, 120, 40], 'Clone text strings');
dlg.panelParams.mockTextRadio.value = true;
dlg.panelParams.mockText = dlg.mockGroup.add('edittext', [15, 50, 200, 70], 'Sample text');

dlg.panelParams.mockRandRadio = dlg.mockGroup.add('radiobutton', [15, 80, 120, 100], 'Random numbers');
dlg.panelParams.mockRand1 = dlg.mockGroup.add('edittext', [15, 110, 100, 130], '1234');
dlg.panelParams.mockRand2 = dlg.mockGroup.add('edittext', [120, 110, 200, 130], '5678');

dlg.panelParams.mockDateRadio = dlg.mockGroup.add('radiobutton', [15, 140, 120, 160], 'Random date');
var dt = new Date();
dlg.panelParams.mockDate1 = dlg.mockGroup.add('edittext', [15, 170, 100, 190], dt.getDay()+"."+dt.getMonth()+"."+(dt.getFullYear()-1));
dlg.panelParams.mockDate2 = dlg.mockGroup.add('edittext', [120, 170, 200, 190], dt.getDay()+"."+dt.getMonth()+"."+dt.getFullYear());


dlg.btnOk = dlg.add('button', [50, 360, 170, 400], 'ok');
dlg.btnCancel = dlg.add('button', [210, 360, 320, 400], 'cancel');

dlg.btnOk.onClick = function() {
var mockType = "text ";

	if (dlg.panelParams.mockRandRadio.value) {
		mockType = "rand"
	} else if (dlg.panelParams.mockDateRadio.value) {
		mockType = "date"
	};

    createTextLayers(dlg.panelParams.numStrings.text, dlg.panelParams.offsetPx.text, dlg.panelParams.mockText.text, mockType);
    dlg.close()

}


dlg.center();

dlg.show();