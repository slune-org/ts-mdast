import { ImageReference, ReferenceType } from 'mdast'
import { Node } from 'unist'

interface Options {
  alt?: string
  label?: string
}

/**
 * @param identifier - The reference identifier.
 * @param referenceType - The reference type.
 * @param alt - The alternative text.
 * @param label - The original value of the normalized identifier field.
 * @returns The link reference.
 */
export function createImageReference(
  identifier: string,
  referenceType: ReferenceType,
  alt?: string,
  label?: string
): ImageReference

/**
 * @param identifier - The reference identifier.
 * @param referenceType - The reference type.
 * @param options - The options of the link reference.
 * @returns The link reference.
 */
export function createImageReference(
  identifier: string,
  referenceType: ReferenceType,
  options: Options
): ImageReference

/*
 * Implementation.
 */
export function createImageReference(
  identifier: string,
  referenceType: ReferenceType,
  altOrOptions?: string | Options,
  label?: string
): ImageReference {
  let options: Options
  if (altOrOptions === undefined) {
    options = {}
  } else if (typeof altOrOptions === 'string') {
    options = { alt: altOrOptions }
  } else {
    options = { ...altOrOptions }
  }
  if (label !== undefined) {
    options.label = label
  }
  return { type: 'imageReference', identifier, referenceType, ...options }
}

/**
 * Type guard for ImageReference.
 *
 * @param node - The node to test.
 * @returns True if node is ImageReference.
 */
export function isImageReference(node: Node): node is ImageReference {
  return node.type === 'imageReference'
}

/**
 * Type assertion for ImageReference.
 *
 * @param node - The node to test.
 */
export function assertImageReference(node: Node): asserts node is ImageReference {
  if (!isImageReference(node)) {
    throw new Error('Node is not an ImageReference')
  }
}
