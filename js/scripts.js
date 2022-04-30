page = (document.getElementsByTagName('iframe')[0])
page.contentWindow.document
    .write(
        '<style>' +
        (
            document.getElementsByTagName('textarea')[1]
        ).value +
        '</style>' +
        (
            document.getElementsByTagName('textarea')[0]
        ).value
    )
    page.contentWindow.eval(
        (
            document.getElementsByTagName('textarea')[2]
        ).value )