const html = CodeMirror(document.querySelector("#html"), {
  lineNumbers: true,
  theme: "darcula-html",
  tabSize: 2,
  mode: "htmlmixed",
  extraKeys: { "Ctrl-Space": "autocomplete" },
  autoCloseTags: true,
  autoCloseBrackets: true,
});
const css = CodeMirror(document.querySelector("#css"), {
  lineNumbers: true,
  theme: "darcula-css",
  tabSize: 2,
  mode: "css",
  extraKeys: { "Ctrl-Space": "autocomplete" },
  autoCloseTags: true,
  autoCloseBrackets: true,
});
const js = CodeMirror(document.querySelector("#js"), {
  lineNumbers: true,
  theme: "darcula-js",
  tabSize: 2,
  extraKeys: { "Ctrl-Space": "autocomplete" },
  mode: { name: "javascript", globalVars: true },
  autoCloseTags: true,
  autoCloseBrackets: true,
});

js.on("keyup", function (cm) {
  autoComplete(js);
});

css.on("keyup", function (e) {
  autoComplete(css);
});

html.on("keyup", function (cm) {
  //if(html.getValue().charCodeAt(html.getValue().length - 1) == "<".charCodeAt(0))
  autoComplete(html);
});

function autoComplete(editor) {
  kc = editor.getValue().charCodeAt(editor.getValue().length - 1);
  if (
    (kc > 64 && kc < 91) ||
    (kc > 96 && kc < 123) ||
    kc == "<".charCodeAt(0)
  ) {
  CodeMirror.commands.autocomplete(editor);
  }
}
html.setSize("100%", "100%");
css.setSize("100%", "100%");
js.setSize("100%", "100%");

function full() {
  if (
    window.fullScreen ||
    (window.innerWidth == screen.width && window.innerHeight == screen.height)
  ) {
    // TODO
  } else {
    document.body.requestFullscreen();
  }
}

html.focus();

/*
html.addEventListener("focus", function(){});
*/
function view() {
  let view = document.querySelector("iframe").contentWindow.document;
  view.open();
  view.write(
    "<style" +
      ">" +
      css.getValue() +
      "</style" +
      ">" +
      "<body" +
      ">" +
      html.getValue() +
      "</body" +
      ">" +
      "<script" +
      ">" +
      js.getValue() +
      "</script" +
      ">"
  );

  unDo(html);
  unDo(css);
  unDo(js);

  if (!html.getValue().includes("<html")) {
    if (html.getValue().includes("<style")) {
      focusField(html, "style", css);
    }
    if (html.getValue().includes("<script")) {
      focusField(html, "script", js);
    }
  }
  if (html.getValue().includes("<!-- save -->")) {
    saveAction(html, "<!-- save -->", "html");
  }
  if (css.getValue().includes("/* save */")) {
    saveAction(css, "/* save */", "css");
  }
  if (js.getValue().includes("// save //")) {
    saveAction(js, "// save //", "js");
  }
  view.close();
}
function unDo(editor) {
  if (editor.getValue().includes("??z")) {
    for (i = 0; i < 3; i++) {
      editor.undo();
    }
  }
}
function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function saveAction(code, comment, ex) {
  code.setValue(code.getValue().replace(comment, ""));
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
  else if (confirm("Save All code ?")) {
    download(
      prompt("Download index file.", "index") + ".html",
      "<html>\n\t<head>\n\t\t<title>Live Editor Presents</title>\n\t</head>\n\t<body>\n\t\t<style>" +
        css.getValue() +
        "\n\t\t</style>\n\t" +
        html.getValue() +
        "\n\t\t<script>\n" +
        js.getValue() +
        "\n\t\t</script>\n\t</body>\n</html>"
    );
  } else
    download(
      prompt("Download " + ex + " file.", ex) + "." + ex,
      code.getValue()
    );
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
