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

width = document.offsetHeight;
height = document.offsetHeight;

html.setSize(width * 0.5, height * 0.33);
css.setSize(width * 0.5, height * 0.33);
js.setSize(width * 0.5, height * 0.33);

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
