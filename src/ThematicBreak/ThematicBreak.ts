import { ThematicBreak } from 'mdast'
import { Node } from 'unist'

/**
 * @returns The thematic break.
 */
export function createThematicBreak(): ThematicBreak {
  return { type: 'thematicBreak' }
}

/**
 * Type guard for ThematicBreak.
 *
 * @param node - The node to test.
 * @returns True if node is ThematicBreak.
 */
export function isThematicBreak(node: Node): node is ThematicBreak {
  return node.type === 'thematicBreak'
}

/**
 * Type assertion for ThematicBreak.
 *
 * @param node - The node to test.
 */
export function assertThematicBreak(node: Node): asserts node is ThematicBreak {
  if (!isThematicBreak(node)) {
    throw new Error('Node is not a ThematicBreak')
  }
}
