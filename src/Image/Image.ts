import { Image } from 'mdast'
import { Node } from 'unist'

interface Options {
  alt?: string
  title?: string
}

/**
 * @param url - URL to the referenced resource.
 * @param alt - The alternative text.
 * @param title - Advisory information for the resource.
 * @returns The image.
 */
export function createImage(url: string, alt?: string, title?: string): Image

/**
 * @param url - URL to the referenced resource.
 * @param options - The options of the definition.
 * @returns The image.
 */
export function createImage(url: string, options: Options): Image

/*
 * Implementation.
 */
export function createImage(url: string, altOrOptions?: string | Options, title?: string): Image {
  let options: Options
  if (altOrOptions === undefined) {
    options = {}
  } else if (typeof altOrOptions === 'string') {
    options = { alt: altOrOptions }
  } else {
    options = { ...altOrOptions }
  }
  if (title !== undefined) {
    options.title = title
  }
  return { type: 'image', url, ...options }
}

/**
 * Type guard for Image.
 *
 * @param node - The node to test.
 * @returns True if node is Image.
 */
export function isImage(node: Node): node is Image {
  return node.type === 'image'
}

/**
 * Type assertion for Image.
 *
 * @param node - The node to test.
 */
export function assertImage(node: Node): asserts node is Image {
  if (!isImage(node)) {
    throw new Error('Node is not an Image')
  }
}
