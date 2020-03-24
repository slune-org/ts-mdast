import { Literal } from 'mdast'
import { Node } from 'unist'

/**
 * Type guard for Literal.
 *
 * @param node - The node to test.
 * @returns True if node is Literal.
 */
export function isLiteral(node: Node): node is Literal {
  return 'value' in node && typeof node.value === 'string'
}

/**
 * Type assertion for Literal.
 *
 * @param node - The node to test.
 */
export function assertLiteral(node: Node): asserts node is Literal {
  if (!isLiteral(node)) {
    throw new Error('Node is not a Literal')
  }
}
