import { RowContent } from 'mdast'
import { Node } from 'unist'

import { isTableCell } from '../TableCell'

/**
 * Type guard for RowContent.
 *
 * @param node - The node to test.
 * @returns True if node is RowContent.
 */
export function isRowContent(node: Node): node is RowContent {
  return isTableCell(node)
}

/**
 * Type assertion for RowContent.
 *
 * @param node - The node to test.
 */
export function assertRowContent(node: Node): asserts node is RowContent {
  if (!isRowContent(node)) {
    throw new Error('Node is not a RowContent')
  }
}
