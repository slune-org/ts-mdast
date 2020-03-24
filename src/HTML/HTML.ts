import { HTML } from 'mdast'
import { Node } from 'unist'

/**
 * @param value - The HTML content.
 * @returns The HTML.
 */
export function createHTML(value: string): HTML {
  return { type: 'html', value }
}

/**
 * Type guard for HTML.
 *
 * @param node - The node to test.
 * @returns True if node is HTML.
 */
export function isHTML(node: Node): node is HTML {
  return node.type === 'html'
}

/**
 * Type assertion for HTML.
 *
 * @param node - The node to test.
 */
export function assertHTML(node: Node): asserts node is HTML {
  if (!isHTML(node)) {
    throw new Error('Node is not a HTML')
  }
}
