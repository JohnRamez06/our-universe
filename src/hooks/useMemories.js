import * as memories from '../services/memories.service'
import useRealtime from './useRealtime'

export default function useMemories() {
  return useRealtime(memories)
}
