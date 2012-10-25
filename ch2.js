var p = poorModule("peppermint-expressions")
t = p("set: 'a add: 1 2")

var c = function (code) {
  var get = function (x,scope) {
    if (_.isArray(scope)) {
      // array means custom function
      
    } else {
      if (x in scope) {
        cur[i] = scope[x]
      }
    }
  }
  var scope = {}
  var scopestack = {}
  var i = 0
  var len = code.length
  var stack = []
  var cur = code
  var istack = []
  var x
  while (true) {
    x = cur[i]
    if (_.isArray(x)) {
      stack.push(cur)
      istack.push(i)
      cur = x
      i = 0
    } else {
      if (x.substr(0,1) = "'") {
        cur[i] = x.substr(1)
      } else {
        get(x,scope)
        
      }
    }
    i += 1 
    if (i > cur.length) {
      //
      if (stack.lengh == 0) {
        break
      }
      cur = stack.pop()
      i = istack.pop()
    }
  }
}

//alert(t)