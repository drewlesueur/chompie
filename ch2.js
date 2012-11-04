var p = poorModule("peppermint-expressions")
poorModule("chompie", function () { return function (chunks, scope) {
  scope = (scope || {})
  
  var scope_stack = {}
  , i = 0
  , chunks_stack = []
  , i_stack = []
  , chunk
  , break_signal = "xyzzy"
  
  var handle_leaf_chunk = function () {
    
  }, chunk_is_array = function(){ return _.isArray(chunk) 
  }, chunks_is_array = function(){ return _.isArray(chunks) 
  }, stack_chunks = function(){ chunks_stack.push(chunks)
  }, reset_i = function () { i = 0
  }, stack_i = function (){ i_stack.push(i)
  }, into_chunk = function () { chunks = chunk
  }, call = function () {
    if (chunk_is_array()) {
      chunks[i] = chunk[0] + "__"
      console.log("called", JSON.stringify(chunk))
    } else {
      console.log("get" + chunk)
    }
  }, step_into = function () { 
      stack_chunks()
      stack_i()
      into_chunk()
      reset_i()
  }, step_outof = function () {
      while (is_last_chunk()) {
        if (chunks_stack_is_empty()) {
          return break_signal
        }
        unstack_chunks()
        unstack_i()
        update_chunk()
        call()
        inc_i()
      }
  }, handle_chunk = function () {
    if (chunk_is_array()) {
      step_into()
    } else {
      handle_leaf_chunk()
      call()
      inc_i()
      return step_outof()
    }
  }, update_chunk = function () { chunk = chunks[i]
  }, inc_i = function () { i += 1
  }, is_last_chunk = function () { return i == chunks.length
  }, chunks_stack_is_empty = function () { return chunks_stack.length == 0
  }, unstack_chunks = function () { chunks = chunks_stack.pop()
  }, unstack_i = function () { i = i_stack.pop()
  }
  if (!chunks_is_array()) {
    chunks = p(chunks) // use peppermint expressions
  }
  while (true) {
    update_chunk()
    if (handle_chunk() == break_signal) break;
  }
}})

t = p("set: 'a add: (sub 5 3) 2\nadd: 3 4")
c = poorModule("chompie")
c(t)
//alert(t)
