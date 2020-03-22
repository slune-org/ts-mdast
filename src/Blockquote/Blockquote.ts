import { BlockContent, Blockquote } from 'mdast'
import { Node } from 'unist'

/**
 * @param children - The children of the blockquote.
 * @returns The blockquote.
 */
export function createBlockquote(children: BlockContent[] = []): Blockquote {
  return { type: 'blockquote', children }
}

/**
 * Type guard for Blockquote.
 *
 * @param node - The node to test.
 * @returns True if node is Blockquote.
 */
export function isBlockquote(node: Node): node is Blockquote {
  return node.type === 'blockquote'
}

/**
 * Type assertion for Blockquote.
 *
 * @param node - The node to test.
 */
export function assertBlockquote(node: Node): asserts node is Blockquote {
  if (!isBlockquote(node)) {
    throw new Error('Node is not a Blockquote')
  }
}
