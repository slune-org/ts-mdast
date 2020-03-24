import { TopLevelContent } from 'mdast'
import { Node } from 'unist'

import { isBlockContent } from '../BlockContent'
import { isDefinitionContent } from '../DefinitionContent'
import { isFrontmatterContent } from '../FrontmatterContent'

/**
 * Type guard for TopLevelContent.
 *
 * @param node - The node to test.
 * @returns True if node is TopLevelContent.
 */
export function isTopLevelContent(node: Node): node is TopLevelContent {
  return isBlockContent(node) || isFrontmatterContent(node) || isDefinitionContent(node)
}

/**
 * Type assertion for TopLevelContent.
 *
 * @param node - The node to test.
 */
export function assertTopLevelContent(node: Node): asserts node is TopLevelContent {
  if (!isTopLevelContent(node)) {
    throw new Error('Node is not a TopLevelContent')
  }
}
