import { RowContent, TableRow } from 'mdast'
import { Node } from 'unist'

/**
 * @param children - The children of the table row.
 * @returns The table row.
 */
export function createTableRow(children: RowContent[] = []): TableRow {
  return { type: 'tableRow', children }
}

/**
 * Type guard for TableRow.
 *
 * @param node - The node to test.
 * @returns True if node is TableRow.
 */
export function isTableRow(node: Node): node is TableRow {
  return node.type === 'tableRow'
}

/**
 * Type assertion for TableRow.
 *
 * @param node - The node to test.
 */
export function assertTableRow(node: Node): asserts node is TableRow {
  if (!isTableRow(node)) {
    throw new Error('Node is not a TableRow')
  }
}
