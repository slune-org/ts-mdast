import { Content } from 'mdast'
import { Node } from 'unist'

import { isListContent } from '../ListContent'
import { isPhrasingContent } from '../PhrasingContent'
import { isRowContent } from '../RowContent'
import { isTableContent } from '../TableContent'
import { isTopLevelContent } from '../TopLevelContent'

/**
 * Type guard for Content.
 *
 * @param node - The node to test.
 * @returns True if node is Content.
 */
export function isContent(node: Node): node is Content {
  return (
    isTopLevelContent(node) ||
    isListContent(node) ||
    isTableContent(node) ||
    isRowContent(node) ||
    isPhrasingContent(node)
  )
}

/**
 * Type assertion for Content.
 *
 * @param node - The node to test.
 */
export function assertContent(node: Node): asserts node is Content {
  if (!isContent(node)) {
    throw new Error('Node is not a Content')
  }
}
