import { describe, it, expect } from 'vitest'
import { environment } from '@/env'

describe('dotenv', () => {
  it('should be defined', () => {
    expect(environment).toBeDefined()
  })

  it('should have MY_ENV_VARIABLE', () => {
    expect(environment.MY_ENV_VARIABLE).toBeDefined()
  })

  it('should have MY_ENV_VARIABLE with value "Hello, World!"', () => {
    expect(environment.MY_ENV_VARIABLE).toBe('Hello, World!')
  })
})
