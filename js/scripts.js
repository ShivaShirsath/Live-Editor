const html = CodeMirror(document.querySelector("html-code"), {
    lineNumbers: true,
    tabSize: 2,
    mode: "xml",
});
const css = CodeMirror(document.querySelector("css-code"), {
    lineNumbers: true,
    tabSize: 2,
    mode: "css"
});
const js = CodeMirror(document.querySelector("js-code"), {
    lineNumbers: true,
    tabSize: 2,
    mode: "javascript"
});

function view() {
    let view = document.querySelector("iframe").contentWindow.document;
    view.open();
    view.write(
        "<style>" +
        css.getValue() +
        "</style>" +
        html.getValue() +
        "<scr" + "ipt>" +
        js.getValue() +
        "</scr" + "ipt>"
    );
    view.close();
}