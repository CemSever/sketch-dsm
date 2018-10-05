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
    writeFile('/Users/cemsever/components.csv', csvData);

    log(getCurrentFilePath);

}

export function getCurrentFilePath(context) {
  return context.document.fileURL().path().replace(/\.sketch$/, '')
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
            // log(component.id);
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

    var components = "Component Group , Component Name  , Position , Size , Status, Custom ";
    components += "\n";

    for (pageIndex = 0; pageIndex < pageCount; pageIndex++) {
        var page = document.pages[pageIndex];
        if (page.name != "Symbols") {
            var componentIndex = 0;
            var componentCount = page.layers.length;

            for (componentIndex = 0; componentIndex < componentCount; componentIndex++) {
                var component = page.layers[componentIndex];
                var compName = component.name;
                var tempName = compName.split('/');

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

    }

    var csv = components;
    return csv;
}

function createArray(){
    var components
}

// TODO
//     var table = createTable(document);
//      createarray with component.group, component.name, component.position, component.size, component.status, component.custom, component.id
//      change createCSV to handle arrays