import { BlockContent } from 'mdast'
import { Node } from 'unist'

import { isBlockquote } from '../Blockquote'
import { isCode } from '../Code'
import { isHeading } from '../Heading'
import { isHTML } from '../HTML'
import { isList } from '../List'
import { isParagraph } from '../Paragraph'
import { isTable } from '../Table'
import { isThematicBreak } from '../ThematicBreak'

/**
 * Type guard for BlockContent.
 *
 * @param node - The node to test.
 * @returns True if node is BlockContent.
 */
export function isBlockContent(node: Node): node is BlockContent {
  return (
    isParagraph(node) ||
    isHeading(node) ||
    isThematicBreak(node) ||
    isBlockquote(node) ||
    isList(node) ||
    isTable(node) ||
    isHTML(node) ||
    isCode(node)
  )
}

/**
 * Type assertion for BlockContent.
 *
 * @param node - The node to test.
 */
export function assertBlockContent(node: Node): asserts node is BlockContent {
  if (!isBlockContent(node)) {
    throw new Error('Node is not a BlockContent')
  }
}
