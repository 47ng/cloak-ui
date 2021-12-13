import { ParsedCloakKey } from '@47ng/cloak'

export interface Key {
  parsed: ParsedCloakKey
  serialized: string
  createdAt: number
  label?: string
}
