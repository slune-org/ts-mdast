import { Footnote, PhrasingContent } from 'mdast'
import { Node } from 'unist'

/*
 * Implementation.
 */
export function createFootnote(children: PhrasingContent[] = []): Footnote {
  return { type: 'footnote', children }
}

/**
 * Type guard for Footnote.
 *
 * @param node - The node to test.
 * @returns True if node is Footnote.
 */
export function isFootnote(node: Node): node is Footnote {
  return node.type === 'footnote'
}
