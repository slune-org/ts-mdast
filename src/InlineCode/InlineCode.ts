import { InlineCode } from 'mdast'
import { Node } from 'unist'

/**
 * @param value - The value of the inline code.
 * @returns The inline code.
 */
export function createInlineCode(value: string): InlineCode {
  return { type: 'inlineCode', value }
}

/**
 * Type guard for InlineCode.
 *
 * @param node - The node to test.
 * @returns True if node is InlineCode.
 */
export function isInlineCode(node: Node): node is InlineCode {
  return node.type === 'inlineCode'
}

/**
 * Type assertion for InlineCode.
 *
 * @param node - The node to test.
 */
export function assertInlineCode(node: Node): asserts node is InlineCode {
  if (!isInlineCode(node)) {
    throw new Error('Node is not an InlineCode')
  }
}
