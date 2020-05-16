import React from 'react'
import { b64, utf8 } from '@47ng/codec'
import vegemite from 'vegemite'
import { Key } from './types'
import {
  generateKey,
  importKeychain,
  serializeKey,
  parseKey,
  CloakKeychain,
  exportKeychain
} from '@47ng/cloak'

export interface State {
  keys: Key[]
  currentKeyFingerprint?: string
  masterKey: string
}

export interface EventMap {
  loadFromPaste: string
  resetKeychain: null
  rotateMasterKey: null
  createKey: null
  importKey: string
  deleteKey: string
  selectCurrentKey: string
}

export const store = vegemite<EventMap, State>({
  keys: [],
  masterKey: ''
})

store.listen(console.dir)

// --

store.on('loadFromPaste', async (state, pastedText) => {
  const newState = await loadFromEnv(pastedText)
  return newState || state
})

store.on('resetKeychain', state => {
  state.keys.length = 0
  state.currentKeyFingerprint = undefined
})

store.on('rotateMasterKey', state => {
  console.dir('rotate')
  state.masterKey = generateKey()
})

store.on('createKey', async state => {
  const key = generateKey()
  const parsed = await parseKey(key)
  const newKey: Key = {
    parsed,
    serialized: key,
    createdAt: Date.now()
  }
  state.keys.push(newKey)
  return state
})

store.on('importKey', async (state, key) => {
  const parsed = await parseKey(key)
  const newKey: Key = {
    parsed,
    serialized: key,
    createdAt: Date.now()
  }
  state.keys.push(newKey)
  return state
})

store.on('deleteKey', (state, deletedKeyFingerprint) => {
  state.keys = state.keys.filter(
    key => key.parsed.fingerprint !== deletedKeyFingerprint
  )
  if (state.currentKeyFingerprint === deletedKeyFingerprint) {
    state.currentKeyFingerprint = undefined
  }
})

store.on('selectCurrentKey', (state, currentKeyFingerprint) => {
  state.currentKeyFingerprint = currentKeyFingerprint
})

// --

export function useState() {
  const [state, setState] = React.useState(() => store.state)
  React.useEffect(() => {
    const off = store.listen(setState)
    loadFromHash().then(loaded => {
      if (!loaded) {
        // Generate a master key
        store.dispatch('rotateMasterKey', null)
      }
    })
    return off
  }, [])
  return state
}

export async function loadFromHash() {
  const { hash } = window.location
  try {
    const env = utf8.decode(b64.decode(hash))
    const state = await loadFromEnv(env)
    if (state) {
      store.set(state)
      return true
    }
  } catch {}
  return false
}

export async function loadFromEnv(env: string): Promise<State | null> {
  function find(name: string) {
    const regex1 = `${name}="(\\S*)"`
    const regex2 = `${name}=(\\S*)`
    const matches = env.match(regex1) || env.match(regex2)
    if (!matches) {
      return null
    }
    return matches[1]
  }
  const masterKey = find('CLOAK_MASTER_KEY')
  const keychain = find('CLOAK_KEYCHAIN')
  const currentKey = find('CLOAK_CURRENT_KEY')
  if (!masterKey || !keychain) {
    return null
  }
  const unlockedKeychain = await importKeychain(keychain, masterKey)
  const keys: Key[] = []
  for (const fingerprint of Object.keys(unlockedKeychain)) {
    const entry = unlockedKeychain[fingerprint]
    keys.push({
      parsed: entry.key,
      serialized: await serializeKey(entry.key),
      createdAt: unlockedKeychain[fingerprint].createdAt
    })
  }
  return {
    masterKey,
    keys,
    currentKeyFingerprint: currentKey || undefined
  }
}

export async function saveToEnv(state: State): Promise<string> {
  const cloakKeychain: CloakKeychain = state.keys.reduce<CloakKeychain>(
    (k, key) => ({
      ...k,
      [key.parsed.fingerprint]: {
        key: key.parsed,
        createdAt: key.createdAt
      }
    }),
    {}
  )
  const keychain = await exportKeychain(cloakKeychain, state.masterKey)
  return [
    `CLOAK_MASTER_KEY="${state.masterKey}"`,
    `CLOAK_KEYCHAIN="${keychain}"`,
    state.currentKeyFingerprint
      ? `CLOAK_CURRENT_KEY="${state.currentKeyFingerprint}"`
      : null
  ]
    .filter(Boolean)
    .join('\n')
}

export function getHashUrl(env: string) {
  if (typeof window === 'undefined') {
    return ''
  }
  const hash = b64.encode(utf8.encode(env))
  const url = new URL(window.location.toString())
  url.hash = hash
  return url.toString()
}
