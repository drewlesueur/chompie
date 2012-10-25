poorModule("string-test-runner", function () {
  var peppermint = poorModule("peppermint-expressions")

  var isPString = function (str) {
    return str.charAt(0) == "'"
  }, lastOrThis = function (raw, last) {
    if (isPString(raw)) { var _in = raw.substr(1) } 
    else { var _in = last }
    return _in
  }

  var runTests = function (rawTests, inputFn) {
    var tests = [], lastIn = "", lastOut = "", lastComment = ""
    for (var i=0; i < rawTests.length; i+= 3) {
      var rawIn = rawTests[i], rawOut = rawTests[i+1]
      , rawComment = rawTests[i+2]

      var _in = lastOrThis(rawIn, lastIn)
      , _out = lastOrThis(rawOut, lastOut)
      , _comment = lastOrThis(rawComment, lastComment)

      try {
        var _got = inputFn(_in)
        var _passed = _got == _out
      } catch (e) {
        var _got = "" 
        var _passed = false;
      }
      tests.push({
        "in": _in,
        "out": _out,
        "comment": _comment,
        "got": _got,
        "passed": _passed
      })
    }
    return tests;
  }, loadScripts = function (cb) {
    poorModule("fake-script")(["string-tests"], cb)
  }, outputTestsToTable = function (table, headers, inputFn) {
    loadScripts(function (err, testsString) {
      var tests = peppermint(testsString)
      console.log(tests)
      var results = runTests(tests, inputFn)
      var html = makeHtmlTable(results, headers)
      $(table).append(html)
    }) 
  }, makeHtmlTable = function (results, headers) {
    code = ["<table border=\"1\" style=\"border-collapse: collapse;\" cellpadding=\"5\"><tr>"]
    for (var i = 0; i < headers.length; i++) {
      var header = headers[i] 
      code.push("<th>" + header + "</th>")
    }
     
    code.push("<tr>")
    for (var i=0; i < results.length; i++) {
      var result = results[i]
      if (result.passed) {
        var color = "lightgreen"
      } else {
        var color = "pink"
      }
      code.push(
          "<td style=\"background-color:"+color+";\">" 
          + "<pre>"
          + result.in 
          + "</pre>"
          + "</td>"
      ) 
      code.push(
          "<td>" 
          + "<pre>"
          + result.in 
          + "</pre>"
          + "</td>"
      ) 
      code.push("<td>" + result.comment + "</td>") 
      if (result.passed == false) {
        code.push(
          "<td style=\"background-color:"+color+";\">"
          + "<pre>"
          + result.got 
          + "</pre></td>"
        ) 
      }
      code.push("</tr>")
    }
    code.push("</tr>")
    return code.join("\n")
  }

  return {outputTestsToTable: outputTestsToTable}
})
