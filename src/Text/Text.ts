import { Text } from 'mdast'
import { Node } from 'unist'

/**
 * @param value - The value of the text.
 * @returns The text.
 */
export function createText(value: string): Text {
  return { type: 'text', value }
}

/**
 * Type guard for Text.
 *
 * @param node - The node to test.
 * @returns True if node is Text.
 */
export function isText(node: Node): node is Text {
  return node.type === 'text'
}

/**
 * Type assertion for Text.
 *
 * @param node - The node to test.
 */
export function assertText(node: Node): asserts node is Text {
  if (!isText(node)) {
    throw new Error('Node is not a Text')
  }
}
