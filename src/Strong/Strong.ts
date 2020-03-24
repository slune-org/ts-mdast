import { PhrasingContent, Strong } from 'mdast'
import { Node } from 'unist'

/**
 * @param children - The strong content.
 * @returns The strong.
 */
export function createStrong(children: PhrasingContent[] = []): Strong {
  return { type: 'strong', children }
}

/**
 * Type guard for Strong.
 *
 * @param node - The node to test.
 * @returns True if node is Strong.
 */
export function isStrong(node: Node): node is Strong {
  return node.type === 'strong'
}

/**
 * Type assertion for Strong.
 *
 * @param node - The node to test.
 */
export function assertStrong(node: Node): asserts node is Strong {
  if (!isStrong(node)) {
    throw new Error('Node is not a Strong')
  }
}
