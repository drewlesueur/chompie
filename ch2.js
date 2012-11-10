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
    if (starts_with(chunk, "'")) {
      chunks[i] = chunk.substring(1)
    } else {
      
    }
  }, starts_with = function (str, sub){
    if (!str) return false 
    return str.substr(0,sub.length) == sub
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
      handle_leaf_chunk()
    }
  }, step_into = function () { 
      stack_chunks()
      stack_i()
      into_chunk()
      reset_i()
  }, step_outof = function () {
    if (chunks_stack_is_empty()) {
      
      return break_signal
    }

    unstack_chunks()
    unstack_i()
    update_chunk()
    call()
    inc_i()
  
      
  }, handle_chunk = function () {
    if (is_last_chunk()) {
      return step_outof()
    }
    update_chunk()

    if (chunk_is_array()) {
      step_into()
    } else {
      call()
      inc_i()
      //used to while loop and step out of
      //but i only want 1 loop 
      
    }
  }, update_chunk = function () {
    chunk = chunks[i]
  }, inc_i = function () { i += 1
  }, chunk_is_null = function () { return  chunk == null
  }, is_last_chunk = function () { return i == chunks.length
  }, chunks_stack_is_empty = function () { return chunks_stack.length == 0
  }, unstack_chunks = function () { chunks = chunks_stack.pop()
  }, unstack_i = function () { i = i_stack.pop()
  }
  if (!chunks_is_array()) {
    chunks = p(chunks) // use peppermint expressions
  }
  while (true) {
    if (handle_chunk() == break_signal) break;
  }
}})

t = p("set: 'a add: (sub 5 3) 2\nadd: 3 4")
c = poorModule("chompie")
c(t)
//alert(t)
