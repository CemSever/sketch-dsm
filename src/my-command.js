export default function(context) {

    var sketch = require('sketch/dom')
    var Document = require('sketch/dom').Document
    var document = Document.getSelectedDocument()
    var pageCount = document.pages.length;
    var p;
    var currentPage;
    var k;

    var componentData = createJsonData(document);

    writeFile('/Users/cemsever/components.json', componentData);

    // const stressTextMenuString = "Stress Test";



    // if (layer.type == "Artboard" || layer.type == "SymbolMaster")

}


function writeFile(path, content) {
    const string = NSString.stringWithFormat("%@", content);
    return string.writeToFile_atomically(path, true);
}

function createJsonData(document) {
    var pageIndex = 0;
    var pageCount = document.pages.length;

    var components = [];
    var pages = [];
    for (pageIndex = 0; pageIndex < pageCount; pageIndex++) {
        var page = document.pages[pageIndex];
        // pages = page.name;
        log(page.name)
        if (page.name !== "Symbols") {
            pages.push({
                name: page.name
            });
        }

        var componentIndex = 0;
        var componentCount = page.layers.length;
        for (componentIndex = 0; componentIndex < componentCount; componentIndex++) {
            var component = page.layers[componentIndex];
                    if (page.name !== "Symbols") {

            components.push({
                name: component.name,
                parent: page.name
            });

        }
    }
    }

    var dictionary = { "components": components, "pages": pages };
    return JSON.stringify(dictionary);
}