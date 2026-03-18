// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT NATIVE NODE MODULES

import { describe, it } from 'node:test'

import assert from 'node:assert'

// » IMPORT MODULES
import { TTLCache } from '../src/index.js'

// ━━ TEST ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

describe('TTLCache', () => {
    it('set/get should store and retrieve values', () => {
        const cache = new TTLCache<string>()
        cache.set('k1', 'v1', 1_000)

        assert.strictEqual(cache.get('k1'), 'v1')
    })

    it('delete should remove values', () => {
        const cache = new TTLCache<number>()
        cache.set('k2', 2, 1_000)
        cache.delete('k2')

        assert.strictEqual(cache.get('k2'), undefined)
    })
})
