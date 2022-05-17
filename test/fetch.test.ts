import { expect, it, test } from 'vitest'

test('fetch', () => {
  it('should be not throw error', async () => {
    expect(async () => {
      return fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json())
    }).not.toThrow()
  })

  expect(fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json())).resolves.toBeInstanceOf(
    Object
  )
})
