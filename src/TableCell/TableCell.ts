import { TableCell, PhrasingContent } from 'mdast'
import { Node } from 'unist'

/**
 * @param children - The children of the table cell.
 * @returns The table cell.
 */
export function createTableCell(children: PhrasingContent[] = []): TableCell {
  return { type: 'tableCell', children }
}

/**
 * Type guard for TableCell.
 *
 * @param node - The node to test.
 * @returns True if node is TableCell.
 */
export function isTableCell(node: Node): node is TableCell {
  return node.type === 'tableCell'
}

/**
 * Type assertion for TableCell.
 *
 * @param node - The node to test.
 */
export function assertTableCell(node: Node): asserts node is TableCell {
  if (!isTableCell(node)) {
    throw new Error('Node is not a TableCell')
  }
}
