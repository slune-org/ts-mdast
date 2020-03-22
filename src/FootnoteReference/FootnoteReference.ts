import { FootnoteReference } from 'mdast'
import { Node } from 'unist'

/**
 * @param identifier - The reference identifier.
 * @param label - An optional label.
 * @returns The footnote reference.
 */
export function createFootnoteReference(identifier: string, label?: string): FootnoteReference {
  return { type: 'footnoteReference', identifier, label }
}

/**
 * Type guard for FootnoteReference.
 *
 * @param node - The node to test.
 * @returns True if node is FootnoteReference.
 */
export function isFootnoteReference(node: Node): node is FootnoteReference {
  return node.type === 'footnoteReference'
}
