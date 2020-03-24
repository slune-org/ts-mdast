import { StaticPhrasingContent } from 'mdast'
import { Node } from 'unist'

import { isBreak } from '../Break'
import { isDelete } from '../Delete'
import { isEmphasis } from '../Emphasis'
import { isFootnote } from '../Footnote'
import { isFootnoteReference } from '../FootnoteReference'
import { isHTML } from '../HTML'
import { isImage } from '../Image'
import { isImageReference } from '../ImageReference'
import { isInlineCode } from '../InlineCode'
import { isStrong } from '../Strong'
import { isText } from '../Text'

/**
 * Type guard for StaticPhrasingContent.
 *
 * @param node - The node to test.
 * @returns True if node is StaticPhrasingContent.
 */
export function isStaticPhrasingContent(node: Node): node is StaticPhrasingContent {
  return (
    isText(node) ||
    isEmphasis(node) ||
    isStrong(node) ||
    isDelete(node) ||
    isHTML(node) ||
    isInlineCode(node) ||
    isBreak(node) ||
    isImage(node) ||
    isImageReference(node) ||
    isFootnote(node) ||
    isFootnoteReference(node)
  )
}

/**
 * Type assertion for StaticPhrasingContent.
 *
 * @param node - The node to test.
 */
export function assertStaticPhrasingContent(node: Node): asserts node is StaticPhrasingContent {
  if (!isStaticPhrasingContent(node)) {
    throw new Error('Node is not a StaticPhrasingContent')
  }
}
