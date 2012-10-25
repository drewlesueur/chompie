poorModule("chompie", function () {
  // todo: implement tail-calls with an instruction list and a while loop
  peppermint = poorModule("peppermint-expressions")
  _ = poorModule("underscore")

  var line = [0]
  var scope = instructionSet
  var instructions = []

  var sampleCode = "set: a 1" + "\n" +
    "set: b 2" + "\n" +
    "set: c add: a b" + "\n" + 
    'get("set"): d 3 4'

  var sampleCode = "10"

  var scope = {
    hi: "hello world"
  }

  var codeStack = [code]
  var i = 0

  var instructionSet = {
    "flingCatapult": function () {
       
    }, "say": function () {
    
    }, "next": function () {
      
    }, "get": function (key) {
      ret = scope[key]
      
    }, "evalString": function (code, scope) {

    }, "do": function (code, scope, next) {
       
    }

  }

  var ret = null
  var code = []
  var codeStack = []
  var get = function () {
    if (isChFunc(scope)) {
       
    } else {
      ret = scope[arg][arg]
      // you could chain scope too
    }
  }

  var handleString = function () {
    var str0 = code.substr(0, 1)
    var str = code.substr(1)
    if (str0 == "'") {
      ret = str
    } else {
      get()
    }
  }

  var call = function () {
    
  }
  var cheval = function (code, scope) {
    while (true) {
      if (_.isArray(code)) {
        codeStack.push(code)            
        code = code[0]
        args = code
        call()
      } else {
        handleString()
      }

    }
    return ret
  }

  return function (code, scope) {
    if (_.isString(code)) code = peppermint(code);
    code.unshift("do")
    return cheval(code, scope)
  }    
})
