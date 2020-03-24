import { Break } from 'mdast'
import { Node } from 'unist'

/**
 * @returns The break.
 */
export function createBreak(): Break {
  return { type: 'break' }
}

/**
 * Type guard for Break.
 *
 * @param node - The node to test.
 * @returns True if node is Break.
 */
export function isBreak(node: Node): node is Break {
  return node.type === 'break'
}

/**
 * Type assertion for Break.
 *
 * @param node - The node to test.
 */
export function assertBreak(node: Node): asserts node is Break {
  if (!isBreak(node)) {
    throw new Error('Node is not a Break')
  }
}
