import { Link, StaticPhrasingContent } from 'mdast'
import { Node } from 'unist'

interface Options {
  title?: string
}

/* eslint-disable @typescript-eslint/unified-signatures */

/**
 * @param url - URL to the referenced resource.
 * @param title - Advisory information for the resource.
 * @param children - The children of the link.
 * @returns The link.
 */
export function createLink(url: string, title: string, children?: StaticPhrasingContent[]): Link

/**
 * @param url - URL to the referenced resource.
 * @param children - The children of the link.
 * @returns The link.
 */
export function createLink(url: string, children?: StaticPhrasingContent[]): Link

/**
 * @param url - URL to the referenced resource.
 * @param options - The options of the definition.
 * @param children - The children of the link.
 * @returns The link.
 */
export function createLink(url: string, options: Options, children?: StaticPhrasingContent[]): Link

/* eslint-enable @typescript-eslint/unified-signatures */

/*
 * Implementation.
 */
export function createLink(
  url: string,
  titleOrChildrenOrOptions?: string | StaticPhrasingContent[] | Options,
  children?: StaticPhrasingContent[]
): Link {
  let options: Options & { children: StaticPhrasingContent[] }
  if (titleOrChildrenOrOptions === undefined) {
    options = { children: [] }
  } else if (typeof titleOrChildrenOrOptions === 'string') {
    options = { title: titleOrChildrenOrOptions, children: [] }
  } else if (Array.isArray(titleOrChildrenOrOptions)) {
    options = { children: titleOrChildrenOrOptions }
  } else {
    options = { ...titleOrChildrenOrOptions, children: [] }
  }
  if (children) {
    options.children = children
  }
  return { type: 'link', url, ...options }
}

/**
 * Type guard for Link.
 *
 * @param node - The node to test.
 * @returns True if node is Link.
 */
export function isLink(node: Node): node is Link {
  return node.type === 'link'
}

/**
 * Type assertion for Link.
 *
 * @param node - The node to test.
 */
export function assertLink(node: Node): asserts node is Link {
  if (!isLink(node)) {
    throw new Error('Node is not a Link')
  }
}
