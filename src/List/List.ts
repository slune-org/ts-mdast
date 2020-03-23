import { List, ListContent } from 'mdast'
import { Node } from 'unist'

interface Options {
  ordered?: boolean
  start?: number
  spread?: boolean
}

/* eslint-disable @typescript-eslint/unified-signatures */

/**
 * @param ordered - The items have been intentionally ordered (true), or the order is not important (false
 * or not present).
 * @param start - When the ordered field is true, the starting number of the list.
 * @param spread - One or more of its children are separated with a blank line from its siblings (true), or
 * not (false or not present).
 * @param children - The children of the list.
 * @returns The list.
 */
export function createList(ordered: boolean, start: number, spread: boolean, children?: ListContent[]): List

/**
 * @param ordered - The items have been intentionally ordered (true), or the order is not important (false
 * or not present).
 * @param start - When the ordered field is true, the starting number of the list.
 * @param children - The children of the list.
 * @returns The list.
 */
export function createList(ordered: boolean, start: number, children?: ListContent[]): List

/**
 * @param ordered - The items have been intentionally ordered (true), or the order is not important (false
 * or not present).
 * @param children - The children of the list.
 * @returns The list.
 */
export function createList(ordered: boolean, children?: ListContent[]): List

/**
 * @param children - The children of the list.
 * @returns The list.
 */
export function createList(children?: ListContent[]): List

/**
 * @param options - The options of the list item.
 * @param children - The children of the list.
 * @returns The list.
 */
export function createList(options: Options, children?: ListContent[]): List

/* eslint-enable @typescript-eslint/unified-signatures */

/*
 * Implementation.
 */
export function createList(
  orderedOrChildrenOrOptions?: boolean | ListContent[] | Options,
  startOrChildren?: number | ListContent[],
  spreadOrChildren?: boolean | ListContent[],
  children?: ListContent[]
): List {
  let options: Options & { children: ListContent[] }
  if (orderedOrChildrenOrOptions === undefined) {
    options = { children: [] }
  } else if (typeof orderedOrChildrenOrOptions === 'boolean') {
    options = { ordered: orderedOrChildrenOrOptions, children: [] }
  } else if (Array.isArray(orderedOrChildrenOrOptions)) {
    options = { children: orderedOrChildrenOrOptions }
  } else {
    options = { ...orderedOrChildrenOrOptions, children: [] }
  }
  if (startOrChildren !== undefined) {
    if (typeof startOrChildren === 'number') {
      options.start = startOrChildren
    } else {
      options.children = startOrChildren
    }
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
  return { type: 'list', ...options }
}

/**
 * Type guard for List.
 *
 * @param node - The node to test.
 * @returns True if node is List.
 */
export function isList(node: Node): node is List {
  return node.type === 'list'
}

/**
 * Type assertion for List.
 *
 * @param node - The node to test.
 */
export function assertList(node: Node): asserts node is List {
  if (!isList(node)) {
    throw new Error('Node is not a List')
  }
}
