const dummy = require('../utils/list_helper').dummy

test('Dummy test', () => {
  const blogs = []
  const result = dummy(blogs)
  expect(result).toBe(1)
})