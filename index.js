var dezalgo = require('dezalgo')

module.exports = function (tasks, limit, cb) {
  if (cb) cb = dezalgo(cb)
  if (typeof limit !== 'number') throw new Error('second argument must be a Number')
  var results, len, pending, keys, isErrored
  if (Array.isArray(tasks)) {
    results = []
    pending = len = tasks.length
  } else {
    keys = Object.keys(tasks)
    results = {}
    pending = len = keys.length
  }

  function done (i, err, result) {
    results[i] = result
    if (err) isErrored = true
    if (--pending === 0 || err) {
      if (cb) cb(err, results)
      cb = null
    } else if (!isErrored && next < len) {
      var key
      if (keys) {
        key = keys[next]
        next += 1
        tasks[key](done.bind(undefined, key))
      } else {
        key = next
        next += 1
        tasks[key](done.bind(undefined, key))
      }
    }
  }

  var next = limit
  if (!pending) {
    // empty
    if (cb) cb(null, results)
    cb = null
  } else if (keys) {
    // object
    keys.some(function (key, i) {
      tasks[key](done.bind(undefined, key))
      if (i === limit - 1) return true // early return
    })
  } else {
    // array
    tasks.some(function (task, i) {
      task(done.bind(undefined, i))
      if (i === limit - 1) return true // early return
    })
  }
}
