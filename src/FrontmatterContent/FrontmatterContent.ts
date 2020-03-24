import { FrontmatterContent } from 'mdast'
import { Node } from 'unist'

import { isYAML } from '../YAML'

/**
 * Type guard for FrontmatterContent.
 *
 * @param node - The node to test.
 * @returns True if node is FrontmatterContent.
 */
export function isFrontmatterContent(node: Node): node is FrontmatterContent {
  return isYAML(node)
}

/**
 * Type assertion for FrontmatterContent.
 *
 * @param node - The node to test.
 */
export function assertFrontmatterContent(node: Node): asserts node is FrontmatterContent {
  if (!isFrontmatterContent(node)) {
    throw new Error('Node is not a FrontmatterContent')
  }
}
