import { TableContent } from 'mdast'
import { Node } from 'unist'

import { isTableRow } from '../TableRow'

/**
 * Type guard for TableContent.
 *
 * @param node - The node to test.
 * @returns True if node is TableContent.
 */
export function isTableContent(node: Node): node is TableContent {
  return isTableRow(node)
}

/**
 * Type assertion for TableContent.
 *
 * @param node - The node to test.
 */
export function assertTableContent(node: Node): asserts node is TableContent {
  if (!isTableContent(node)) {
    throw new Error('Node is not a TableContent')
  }
}
