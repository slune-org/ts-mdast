import { Parent } from 'mdast'
import { Node } from 'unist'

import { isContent } from '../Content'

/**
 * Type guard for Parent.
 *
 * @param node - The node to test.
 * @returns True if node is Parent.
 */
export function isParent(node: Node): node is Parent {
  return (
    'children' in node && Array.isArray(node.children) && node.children.every((n: Node) => isContent(n))
  )
}

/**
 * Type assertion for Parent.
 *
 * @param node - The node to test.
 */
export function assertParent(node: Node): asserts node is Parent {
  if (!isParent(node)) {
    throw new Error('Node is not a Parent')
  }
}
