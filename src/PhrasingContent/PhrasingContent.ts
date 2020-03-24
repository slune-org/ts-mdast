import { PhrasingContent } from 'mdast'
import { Node } from 'unist'

import { isLink } from '../Link'
import { isLinkReference } from '../LinkReference'
import { isStaticPhrasingContent } from '../StaticPhrasingContent'

/**
 * Type guard for PhrasingContent.
 *
 * @param node - The node to test.
 * @returns True if node is PhrasingContent.
 */
export function isPhrasingContent(node: Node): node is PhrasingContent {
  return isStaticPhrasingContent(node) || isLink(node) || isLinkReference(node)
}

/**
 * Type assertion for PhrasingContent.
 *
 * @param node - The node to test.
 */
export function assertPhrasingContent(node: Node): asserts node is PhrasingContent {
  if (!isPhrasingContent(node)) {
    throw new Error('Node is not a PhrasingContent')
  }
}
