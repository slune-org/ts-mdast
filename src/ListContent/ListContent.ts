import { ListContent } from 'mdast'
import { Node } from 'unist'

import { isListItem } from '../ListItem'

/**
 * Type guard for ListContent.
 *
 * @param node - The node to test.
 * @returns True if node is ListContent.
 */
export function isListContent(node: Node): node is ListContent {
  return isListItem(node)
}

/**
 * Type assertion for ListContent.
 *
 * @param node - The node to test.
 */
export function assertListContent(node: Node): asserts node is ListContent {
  if (!isListContent(node)) {
    throw new Error('Node is not a ListContent')
  }
}
