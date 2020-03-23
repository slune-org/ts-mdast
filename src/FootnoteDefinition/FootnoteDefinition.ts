import { BlockContent, FootnoteDefinition } from 'mdast'
import { Node } from 'unist'

interface Options {
  label?: string
}

/* eslint-disable @typescript-eslint/unified-signatures */

/**
 * @param identifier - The footnote identifier.
 * @param label - Label for the footnote.
 * @param children - The footnote children.
 * @returns The paragraph.
 */
export function createFootnoteDefinition(
  identifier: string,
  label: string,
  children?: BlockContent[]
): FootnoteDefinition

/**
 * @param identifier - The footnote identifier.
 * @param children - The footnote children.
 */
export function createFootnoteDefinition(identifier: string, children?: BlockContent[]): FootnoteDefinition

/**
 * @param identifier - The footnote identifier.
 * @param options - The options of the footnote.
 * @param children - The footnote children.
 */
export function createFootnoteDefinition(
  identifier: string,
  options: Options,
  children?: BlockContent[]
): FootnoteDefinition

/* eslint-enable @typescript-eslint/unified-signatures */

/*
 * Implementation.
 */
export function createFootnoteDefinition(
  identifier: string,
  labelOrChildrenOrOptions?: string | BlockContent[] | Options,
  children?: BlockContent[]
): FootnoteDefinition {
  let options: Options & { children: BlockContent[] }
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
  return { type: 'footnoteDefinition', identifier, ...options }
}

/**
 * Type guard for FootnoteDefinition.
 *
 * @param node - The node to test.
 * @returns True if node is FootnoteDefinition.
 */
export function isFootnoteDefinition(node: Node): node is FootnoteDefinition {
  return node.type === 'footnoteDefinition'
}

/**
 * Type assertion for FootnoteDefinition.
 *
 * @param node - The node to test.
 */
export function assertFootnoteDefinition(node: Node): asserts node is FootnoteDefinition {
  if (!isFootnoteDefinition(node)) {
    throw new Error('Node is not a FootnoteDefinition')
  }
}
