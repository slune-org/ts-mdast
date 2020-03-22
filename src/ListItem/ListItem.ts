import { BlockContent, ListItem } from 'mdast'
import { Node } from 'unist'

interface Options {
  checked?: boolean
  spread?: boolean
}

/* eslint-disable @typescript-eslint/unified-signatures */

/**
 * @param checked - Whether the item is done (true), not done (false), or indeterminate or not applicable
 * (when not present).
 * @param spread - The item contains two or more children separated by a blank line (true), or not (false or
 * not present).
 * @param children - The children of the list item.
 * @returns The list item.
 */
export function createListItem(checked: boolean, spread: boolean, children?: BlockContent[]): ListItem

/**
 * @param checked - Whether the item is done (true), not done (false), or indeterminate or not applicable
 * (when not present).
 * @param children - The children of the list item.
 * @returns The list item.
 */
export function createListItem(checked: boolean, children?: BlockContent[]): ListItem

/**
 * @param children - The children of the list item.
 * @returns The list item.
 */
export function createListItem(children?: BlockContent[]): ListItem

/**
 * @param options - The options of the list item.
 * @param children - The children of the list item.
 * @returns The list item.
 */
export function createListItem(options: Options, children?: BlockContent[]): ListItem

/* eslint-enable @typescript-eslint/unified-signatures */

/*
 * Implementation.
 */
export function createListItem(
  checkedOrChildrenOrOptions?: boolean | BlockContent[] | Options,
  spreadOrChildren?: boolean | BlockContent[],
  children?: BlockContent[]
): ListItem {
  let options: Options & { children: BlockContent[] }
  if (checkedOrChildrenOrOptions === undefined) {
    options = { children: [] }
  } else if (typeof checkedOrChildrenOrOptions === 'boolean') {
    options = { checked: checkedOrChildrenOrOptions, children: [] }
  } else if (Array.isArray(checkedOrChildrenOrOptions)) {
    options = { children: checkedOrChildrenOrOptions }
  } else {
    options = { ...checkedOrChildrenOrOptions, children: [] }
  }
  if (spreadOrChildren !== undefined) {
    if (typeof spreadOrChildren === 'boolean') {
      options.spread = spreadOrChildren
    } else {
      options.children = spreadOrChildren
    }
  }
  if (children) {
    options.children = children
  }
  return { type: 'listItem', ...options }
}

/**
 * Type guard for ListItem.
 *
 * @param node - The node to test.
 * @returns True if node is ListItem.
 */
export function isListItem(node: Node): node is ListItem {
  return node.type === 'listItem'
}

/**
 * Type assertion for ListItem.
 *
 * @param node - The node to test.
 */
export function assertListItem(node: Node): asserts node is ListItem {
  if (!isListItem(node)) {
    throw new Error('Node is not a ListItem')
  }
}
