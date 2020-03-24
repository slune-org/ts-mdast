import { Delete, PhrasingContent } from 'mdast'
import { Node } from 'unist'

/**
 * @param children - The deleted content.
 * @returns The delete.
 */
export function createDelete(children: PhrasingContent[] = []): Delete {
  return { type: 'delete', children }
}

/**
 * Type guard for Delete.
 *
 * @param node - The node to test.
 * @returns True if node is Delete.
 */
export function isDelete(node: Node): node is Delete {
  return node.type === 'delete'
}

/**
 * Type assertion for Delete.
 *
 * @param node - The node to test.
 */
export function assertDelete(node: Node): asserts node is Delete {
  if (!isDelete(node)) {
    throw new Error('Node is not a Delete')
  }
}
