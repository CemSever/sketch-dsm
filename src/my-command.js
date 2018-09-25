export default function(context) {

    var sketch = require('sketch/dom')
    var Document = require('sketch/dom').Document
    var document = Document.getSelectedDocument()
    var pageCount = document.pages.length;
    var p;
    var currentPage;
    var k;

    var componentData = makeComponentData(document);
    var csvData = createCSV(document);

    writeFile('/Users/cemsever/components.json', componentData);
    // writeFile('/Users/cemsever/components.csv', csvData);


    // if (layer.type == "Artboard" || layer.type == "SymbolMaster")

}


function writeFile(path, content) {
    const string = NSString.stringWithFormat("%@", content);
    return string.writeToFile_atomically(path, true);
}

function makeComponentData(document) {
    var pageIndex = 0;
    var pageCount = document.pages.length;

    var components = [];
    var pages = [];
    for (pageIndex = 0; pageIndex < pageCount; pageIndex++) {
        var page = document.pages[pageIndex];
        // pages = page.name;
        pages.push({
            name: page.name
        });
        var componentIndex = 0;
        var componentCount = page.layers.length;
        for (componentIndex = 0; componentIndex < componentCount; componentIndex++) {
            var component = page.layers[componentIndex];

            components.push({
                name: component.name,
                parent: page.name
            });
        }
    }

    var dictionary = { "components": components, "pages": pages };
    return JSON.stringify(dictionary);
}


function createCSV(document) {
    var pageIndex = 0;
    var pageCount = document.pages.length;

    var components = "Component Group , Component Name  , Position , Size , Status ";
    components += "\n";
    for (pageIndex = 0; pageIndex < pageCount; pageIndex++) {
        var page = document.pages[pageIndex];

        var componentIndex = 0;
        var componentCount = page.layers.length;
        for (componentIndex = 0; componentIndex < componentCount; componentIndex++) {
            var component = page.layers[componentIndex];
            var compName = component.name;
            var tempName = compName.split('/');
            log(tempName.length);

            var nameIndex = 0;
            var nameCount = tempName.length;

            for (nameIndex = 0; nameIndex < nameCount; nameIndex++) {

                if (tempName[nameIndex] != " ") {
                    components += tempName[nameIndex];

                } else {
                	components += "";
                }

                if (nameIndex != nameCount - 1) {
                    components += ","


                }

            }
            components += "\n";
        }
    }

    var csv = components;
    log(csv);
    return csv;
}