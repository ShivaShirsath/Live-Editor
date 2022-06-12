localStorage.setItem("eruda-sources", '{"showLineNum":true,"formatCode":true,"indentSize":"2"}');
localStorage.setItem("eruda-entry-button", '{"rememberPos":true,"pos":{"x":0,"y":0}}');
localStorage.setItem("eruda-resources", '{"hideErudaSetting":true,"observeElement":true}');
localStorage.setItem("eruda-console", '{"asyncRender":true,"catchGlobalErr":true,"jsExecution":true,"overrideConsole":true,"displayExtraInfo":true,"displayUnenumerable":true,"displayGetterVal":true,"lazyEvaluation":true,"displayIfErr":true');
localStorage.setItem("eruda-dev-tools", '{"transparency":0.95,"displaySize":50,"theme":"Material Darker"}');
localStorage.setItem("eruda-elements", '{"overrideEventTarget":true,"observeElement":true}');

const html = CodeMirror(document.querySelector("#html"), {
  lineNumbers: true,
  theme: "darcula-html",
  tabSize: 2,
  mode: "htmlmixed",
  extraKeys: { 
    "Ctrl-Space": "autocomplete",
    "Ctrl-Q": function(cm){
      cm.foldCode(cm.getCursor()); 
    }
  },
  autoCloseTags: true,
  autoCloseBrackets: true,
  foldGutter: true,
  gutters: [
    "CodeMirror-linenumbers",
    "CodeMirror-foldgutter"
  ]
});

const css = CodeMirror(document.querySelector("#css"), {
  lineNumbers: true,
  theme: "darcula-css",
  tabSize: 2,
  mode: "css",
  extraKeys: { 
    "Ctrl-Space": "autocomplete", 
    "Ctrl-Q": function(cm){ 
      cm.foldCode(cm.getCursor()); 
    }
  },
  autoCloseTags: true,
  autoCloseBrackets: true,
  foldGutter: true,
  gutters: [
    "CodeMirror-linenumbers", 
    "CodeMirror-foldgutter"
  ]
});

const js = CodeMirror(document.querySelector("#js"), {
  lineNumbers: true,
  theme: "darcula-js",
  tabSize: 2,
  extraKeys: {
    "Ctrl-Space": "autocomplete",
    "Ctrl-Q": function(cm){ 
      cm.foldCode(cm.getCursor());
    }
  },
  mode: {
    name: "javascript", 
    globalVars: true
  },
  autoCloseTags: true,
  autoCloseBrackets: true,
  foldGutter: true,
  gutters: [
    "CodeMirror-linenumbers",
    "CodeMirror-foldgutter"
  ]
});

const output = document.querySelector("iframe");

  js.setValue("");
 css.setValue("");
html.setValue(localStorage.html);

jss = "";

autoComplete(js);
autoComplete(css);
autoComplete(html);

function autoComplete(editor) {
  editor.on("keyup", 
    function(cm, e) {
      if ((! e.shiftKey) && [8, 13, 32, 35, 36, 37, 38, 39, 40, 46, 219].indexOf(e.keyCode) < 0) {
        if (acb(cm)) cm.execCommand("autocomplete"); 
      }
    }
  );
}

html.setSize("100%", "100%");
css.setSize("100%", "100%");
js.setSize("100%", "100%");

html.focus();

CodeMirror.commands.foldAll(html);
CodeMirror.commands.foldAll(css);
CodeMirror.commands.foldAll(js);

view();

function view() {
  let view = output.contentWindow.document;
  view.open();
  view.write(
    getCode() + "<script" + ">" +
      jss +
    "</script" + ">"
  );

  unDo(html);
  unDo(css);
  unDo(js);
  
  if (!html.getValue().includes("<html")) {
    if (html.getValue().includes(  "<body")) focusField(html, "body", html);
    if (html.getValue().includes( "<style")) focusField(html, "style", css);
    if (html.getValue().includes("<script")) focusField(html, "script", js);
  }
  
  if (html.getValue().includes("<!-- save -->")) saveAction(html, "<!-- save -->");
  if (html.getValue().includes("<!-- inspect -->"))
    jss = "var script = document.createElement('script'); script.src='//cdn.jsdelivr.net/npm/eruda';        document.body.appendChild(script); script.onload = function () { eruda.init(); }; ";
  else jss = "";
  
  view.close();
  
  localStorage.setItem("html", getCode());
}

function unDo(editor) {
  if (editor.getValue().includes("??z")) {
    for (i = 0; i < 3; i++) {
      editor.undo();
    }
  }
}

function getCode(){
  return "<style" + ">" +
      css.getValue() + 
    "</style" + ">" +
    "<body" + ">" +
      html.getValue() +
    "</body" + ">" +
    "<script" + ">" +
      js.getValue() +
    "</script" + ">"
  ;
}

function download(filename, content) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(content)
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function focusField(ele, tag, target) {
  tags = "";
  if (ele.getValue().includes("</" + tag + ">"))
    tags = ele
      .getValue()
      .substring(
        ele.getValue().indexOf("<" + tag),
        ele.getValue().indexOf("</" + tag + ">") + tag.length + 3
      );
  else tags = "";
  ele.setValue(ele.getValue().replace(tags == "" ? "<" + tag : tags, ""));
  target.setValue(
    target.getValue() +
      tags.substring(
        tags.indexOf(">") + 1,
        tags.lastIndexOf(">") - tag.length - 2
      )
  );
  target.focus();
}

function saveAction(editor, comment) {
  editor.setValue(editor.getValue().replace(comment, ""));
  if (
    confirm("Do you want to upload files to server ?\n( 'Cancel' for download")
  )
    $.ajax({
      method: "POST",
      url: "php/code.php",
      data: {
        html: html.getValue(),
        css: css.getValue(),
        js: js.getValue(),
        command: "insert",
      },
    }).done(function (response) {
      alert(response);
    });
  else download(
    prompt("Download index file.", "index") + ".html",
    getCode()
  );
}

function acb(editor) {
    pos = editor.getCursor();
    if("{" == editor.getLine(pos.line).substring(pos.ch-1, pos.ch)){
       insertString(editor, "}"); 
       editor.setCursor({line: pos.line, ch: pos.ch});
       return false;
    }
    return true;
}

function insertString(editor,str){
  var selection = editor.getSelection();
  if(selection.length>0){
    editor.replaceSelection(str);
  } else {
    var doc = editor.getDoc();
    var cursor = doc.getCursor();
    var pos = {
      line: cursor.line,
      ch: cursor.ch
    };
    doc.replaceRange(str, pos);
  }
}
