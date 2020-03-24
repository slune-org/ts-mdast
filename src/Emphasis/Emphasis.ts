import { Emphasis, PhrasingContent } from 'mdast'
import { Node } from 'unist'

/**
 * @param children - The emphasis content.
 * @returns The emphasis.
 */
export function createEmphasis(children: PhrasingContent[] = []): Emphasis {
  return { type: 'emphasis', children }
}

/**
 * Type guard for Emphasis.
 *
 * @param node - The node to test.
 * @returns True if node is Emphasis.
 */
export function isEmphasis(node: Node): node is Emphasis {
  return node.type === 'emphasis'
}

/**
 * Type assertion for Emphasis.
 *
 * @param node - The node to test.
 */
export function assertEmphasis(node: Node): asserts node is Emphasis {
  if (!isEmphasis(node)) {
    throw new Error('Node is not an Emphasis')
  }
}
