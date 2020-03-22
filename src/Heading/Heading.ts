import { Heading, PhrasingContent } from 'mdast'
import { Node } from 'unist'

/**
 * @param depth - The depth of the heading.
 * @param children - The children of the heading.
 * @returns The heading.
 */
export function createHeading(depth: 1 | 2 | 3 | 4 | 5 | 6, children: PhrasingContent[] = []): Heading {
  return { type: 'heading', depth, children }
}

/**
 * Type guard for Heading.
 *
 * @param node - The node to test.
 * @returns True if node is Heading.
 */
export function isHeading(node: Node): node is Heading {
  return node.type === 'heading'
}

/**
 * Type assertion for Heading.
 *
 * @param node - The node to test.
 */
export function assertHeading(node: Node): asserts node is Heading {
  if (!isHeading(node)) {
    throw new Error('Node is not a Heading')
  }
}
