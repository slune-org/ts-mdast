import { FootnoteReference } from 'mdast'
import { Node } from 'unist'

interface Options {
  label?: string
}

/**
 * @param identifier - The reference identifier.
 * @param label - An optional label.
 * @returns The footnote reference.
 */
export function createFootnoteReference(identifier: string, label?: string): FootnoteReference

/**
 * @param identifier - The reference identifier.
 * @param options - The options of the footnote reference.
 * @returns The footnote reference.
 */
export function createFootnoteReference(identifier: string, options: Options): FootnoteReference

/*
 * Implementation.
 */
export function createFootnoteReference(
  identifier: string,
  labelOrOptions?: string | Options
): FootnoteReference {
  let options: Options
  if (labelOrOptions === undefined) {
    options = {}
  } else if (typeof labelOrOptions === 'string') {
    options = { label: labelOrOptions }
  } else {
    options = { ...labelOrOptions }
  }
  return { type: 'footnoteReference', identifier, ...options }
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

/**
 * Type assertion for FootnoteReference.
 *
 * @param node - The node to test.
 */
export function assertFootnoteReference(node: Node): asserts node is FootnoteReference {
  if (!isFootnoteReference(node)) {
    throw new Error('Node is not a FootnoteReference')
  }
}
