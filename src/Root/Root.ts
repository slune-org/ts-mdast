import { Content, Root } from 'mdast'
import { Node } from 'unist'

/**
 * @param children - The children of the root.
 * @returns The root.
 */
export function createRoot(children: Content[] = []): Root {
  return { type: 'root', children }
}

/**
 * Type guard for Root.
 *
 * @param node - The node to test.
 * @returns True if node is Root.
 */
export function isRoot(node: Node): node is Root {
  return node.type === 'root'
}

/**
 * Type assertion for Root.
 *
 * @param node - The node to test.
 */
export function assertRoot(node: Node): asserts node is Root {
  if (!isRoot(node)) {
    throw new Error('Node is not a Root')
  }
}
