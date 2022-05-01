htmlElement = document.querySelector("html")
view = document.querySelector("iframe")
row = document.querySelector("row")
column = document.querySelector("column")

html = CodeMirror(document.querySelector("html-code"), {
    lineNumbers: true,
    theme: "dracula",
    tabSize: 2,
    mode: "xml",
    autoCloseTags: true,
    autoCloseBrackets: true
});
css = CodeMirror(document.querySelector("css-code"), {
    lineNumbers: true,
    theme: "dracula",
    tabSize: 2,
    mode: "css",
    autoCloseTags: true,
    autoCloseBrackets: true
});
js = CodeMirror(document.querySelector("js-code"), {
    lineNumbers: true,
    theme: "dracula",
    tabSize: 2,
    mode: "javascript",
    autoCloseTags: true,
    autoCloseBrackets: true
});

width = htmlElement.offsetWidth
height = htmlElement.offsetHeight

h=1
w=1

if (height<width) {
    h = .33
    w=.5
    row.style = "flex-direction: row"
    column.style = "flex-direction:column"

} 
if(height>width) {
    h = .5
    w=.33
    row.style = "flex-direction:column"
    column.style = "flex-direction:row" 

}

    html.setSize(width *w, height*h)
    css.setSize(width *w, height*h)
    js.setSize(width *w, height*h)
    
function view() {
    output = view.contentWindow.document;
    output.open();
    output.write(
        "<style>" +
        css.getValue() +
        "</style>" +
        html.getValue() +
        "<scr" + "ipt>" +
        js.getValue() +
        "</scr" + "ipt>"
    );
    output.close();
}
