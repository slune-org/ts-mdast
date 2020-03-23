import { AlignType, Table, TableContent } from 'mdast'
import { Node } from 'unist'

interface Options {
  align?: AlignType[]
}

/**
 * Check if parameter it align types.
 *
 * @param parameter - The parameter to test.
 * @returns True if align types.
 */
function isAlignTypes(parameter: AlignType[] | TableContent[] | Options): parameter is AlignType[] {
  return (
    Array.isArray(parameter) &&
    parameter.every((item: AlignType | TableContent) => item === null || typeof item === 'string')
  )
}

/* eslint-disable @typescript-eslint/unified-signatures */

/**
 * @param align - List of how cells in columns are aligned.
 * @param children - The children of the table.
 * @returns The table.
 */
export function createTable(align: AlignType[], children?: TableContent[]): Table

/**
 * @param children - The children of the table.
 * @returns The table.
 */
export function createTable(children?: TableContent[]): Table

/**
 * @param options - The options of the table.
 * @param children - The children of the table.
 * @returns The table.
 */
export function createTable(options: Options, children?: TableContent[]): Table

/* eslint-enable @typescript-eslint/unified-signatures */

/*
 * Implementation.
 */
export function createTable(
  alignOrChildrenOrOptions?: AlignType[] | TableContent[] | Options,
  children?: TableContent[]
): Table {
  let options: Options & { children: TableContent[] }
  if (alignOrChildrenOrOptions === undefined) {
    options = { children: [] }
  } else if (isAlignTypes(alignOrChildrenOrOptions)) {
    options = { align: alignOrChildrenOrOptions, children: [] }
  } else if (Array.isArray(alignOrChildrenOrOptions)) {
    options = { children: alignOrChildrenOrOptions }
  } else {
    options = { ...alignOrChildrenOrOptions, children: [] }
  }
  if (children) {
    options.children = children
  }
  return { type: 'table', ...options }
}

/**
 * Type guard for Table.
 *
 * @param node - The node to test.
 * @returns True if node is Table.
 */
export function isTable(node: Node): node is Table {
  return node.type === 'table'
}

/**
 * Type assertion for Table.
 *
 * @param node - The node to test.
 */
export function assertTable(node: Node): asserts node is Table {
  if (!isTable(node)) {
    throw new Error('Node is not a Table')
  }
}
