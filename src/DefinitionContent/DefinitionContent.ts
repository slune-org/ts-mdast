import { DefinitionContent } from 'mdast'
import { Node } from 'unist'

import { isDefinition } from '../Definition'
import { isFootnoteDefinition } from '../FootnoteDefinition'

/**
 * Type guard for DefinitionContent.
 *
 * @param node - The node to test.
 * @returns True if node is DefinitionContent.
 */
export function isDefinitionContent(node: Node): node is DefinitionContent {
  return isDefinition(node) || isFootnoteDefinition(node)
}

/**
 * Type assertion for DefinitionContent.
 *
 * @param node - The node to test.
 */
export function assertDefinitionContent(node: Node): asserts node is DefinitionContent {
  if (!isDefinitionContent(node)) {
    throw new Error('Node is not a DefinitionContent')
  }
}
