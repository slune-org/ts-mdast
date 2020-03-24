import { LinkReference, ReferenceType, StaticPhrasingContent } from 'mdast'
import { Node } from 'unist'

interface Options {
  label?: string
}

/* eslint-disable @typescript-eslint/unified-signatures */

/**
 * @param identifier - The reference identifier.
 * @param referenceType - The reference type.
 * @param label - The original value of the normalized identifier field.
 * @param children - The children of the link reference.
 * @returns The link reference.
 */
export function createLinkReference(
  identifier: string,
  referenceType: ReferenceType,
  label: string,
  children?: StaticPhrasingContent[]
): LinkReference

/**
 * @param identifier - The reference identifier.
 * @param referenceType - The reference type.
 * @param children - The children of the link reference.
 * @returns The link reference.
 */
export function createLinkReference(
  identifier: string,
  referenceType: ReferenceType,
  children?: StaticPhrasingContent[]
): LinkReference

/**
 * @param identifier - The reference identifier.
 * @param referenceType - The reference type.
 * @param options - The options of the link reference.
 * @param children - The children of the link reference.
 * @returns The link reference.
 */
export function createLinkReference(
  identifier: string,
  referenceType: ReferenceType,
  options: Options,
  children?: StaticPhrasingContent[]
): LinkReference

/* eslint-enable @typescript-eslint/unified-signatures */

/*
 * Implementation.
 */
export function createLinkReference(
  identifier: string,
  referenceType: ReferenceType,
  labelOrChildrenOrOptions?: string | StaticPhrasingContent[] | Options,
  children?: StaticPhrasingContent[]
): LinkReference {
  let options: Options & { children: StaticPhrasingContent[] }
  if (labelOrChildrenOrOptions === undefined) {
    options = { children: [] }
  } else if (typeof labelOrChildrenOrOptions === 'string') {
    options = { label: labelOrChildrenOrOptions, children: [] }
  } else if (Array.isArray(labelOrChildrenOrOptions)) {
    options = { children: labelOrChildrenOrOptions }
  } else {
    options = { ...labelOrChildrenOrOptions, children: [] }
  }
  if (children) {
    options.children = children
  }
  return { type: 'linkReference', identifier, referenceType, ...options }
}

/**
 * Type guard for LinkReference.
 *
 * @param node - The node to test.
 * @returns True if node is LinkReference.
 */
export function isLinkReference(node: Node): node is LinkReference {
  return node.type === 'linkReference'
}

/**
 * Type assertion for LinkReference.
 *
 * @param node - The node to test.
 */
export function assertLinkReference(node: Node): asserts node is LinkReference {
  if (!isLinkReference(node)) {
    throw new Error('Node is not a LinkReference')
  }
}
