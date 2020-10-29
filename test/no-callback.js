const parallelLimit = require('../')
const test = require('tape')

test('no callbacks at all (array)', function (t) {
  t.plan(2)

  const tasks = [
    function (cb) {
      t.pass('cb 1')
    },
    function (cb) {
      t.pass('cb 2')
    }
  ]

  parallelLimit(tasks, 2)
})

test('no callbacks at all (object)', function (t) {
  t.plan(2)

  const tasks = {
    one: function (cb) {
      t.pass('cb 1')
    },
    two: function (cb) {
      t.pass('cb 2')
    }
  }

  parallelLimit(tasks, 2)
})

test('no final callback (object)', function (t) {
  t.plan(2)

  const tasks = {
    one: function (cb) {
      t.pass('cb 1')
      cb()
    },
    two: function (cb) {
      t.pass('cb 2')
      cb()
    }
  }

  parallelLimit(tasks, 1)
})
