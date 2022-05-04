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

h = window.innerHeight;
w = window.innerWidth;

html.setSize("100%", "100%");
css.setSize("100%", "100%");
js.setSize("100%", "100%");

function view() {
  let view = document.querySelector("iframe").contentWindow.document;
  view.open();
  view.write(
      "<style"  + ">" +  css.getValue() + "</style"  + ">" +
      "<body"   + ">" + html.getValue() + "</body"   + ">" +
      "<script" + ">" +   js.getValue() + "</script" + ">"
  );
  if (view.body.innerHTML.includes("<!-- save -->")) {
      alert(view.body.innerHTML.replace("<!-- save -->",''));
  }
  
  view.close();
}
