const html = CodeMirror(document.querySelector("html-code"), {
  lineNumbers: true,
  theme: "dracula",
  tabSize: 2,
  mode: "xml",
  autoCloseTags: true,
  autoCloseBrackets: true,
});
const css = CodeMirror(document.querySelector("css-code"), {
  lineNumbers: true,
  theme: "dracula",
  tabSize: 2,
  mode: "css",
  autoCloseTags: true,
  autoCloseBrackets: true,
});
const js = CodeMirror(document.querySelector("js-code"), {
  lineNumbers: true,
  theme: "dracula",
  tabSize: 2,
  mode: "javascript",
  autoCloseTags: true,
  autoCloseBrackets: true,
});

width = document.querySelector("html").offsetWidth;
height = document.querySelector("html").offsetHeight;

html.setSize(width *.49, height *.32);
css.setSize(width *.49, height *.32);
js.setSize(width *.49, height *.32);

function view() {
  let view = document.querySelector("iframe").contentWindow.document;
  view.open();
  view.write(
    "<style>" +
      css.getValue() +
      "</style>" +
      html.getValue() +
      "<scr" +
      "ipt>" +
      js.getValue() +
      "</scr" +
      "ipt>"
  );
  view.close();
}
