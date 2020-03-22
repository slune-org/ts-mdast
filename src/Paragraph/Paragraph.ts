import { Paragraph, PhrasingContent } from 'mdast'
import { Node } from 'unist'

/**
 * @param children - The children of the paragraph.
 * @returns The paragraph.
 */
export function createParagraph(children: PhrasingContent[] = []): Paragraph {
  return { type: 'paragraph', children }
}

/**
 * Type guard for Paragraph.
 *
 * @param node - The node to test.
 * @returns True if node is Paragraph.
 */
export function isParagraph(node: Node): node is Paragraph {
  return node.type === 'paragraph'
}

/**
 * Type assertion for Paragraph.
 *
 * @param node - The node to test.
 */
export function assertParagraph(node: Node): asserts node is Paragraph {
  if (!isParagraph(node)) {
    throw new Error('Node is not a Paragraph')
  }
}
