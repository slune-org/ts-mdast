import { Definition } from 'mdast'
import { Node } from 'unist'

interface Options {
  label?: string
  title?: string
}

/**
 * @param identifier - Identifier of the definition, can match an identifier field on another node.
 * @param url - URL to the referenced resource.
 * @param label - The original value of the normalized identifier field.
 * @param title - Advisory information for the resource.
 * @returns The text.
 */
export function createDefinition(
  identifier: string,
  url: string,
  label?: string,
  title?: string
): Definition

/**
 * @param identifier - Identifier of the definition, can match an identifier field on another node.
 * @param url - URL to the referenced resource.
 * @param options - The options of the definition.
 * @returns The text.
 */
export function createDefinition(identifier: string, url: string, options: Options): Definition

/*
 * Implementation.
 */
export function createDefinition(
  identifier: string,
  url: string,
  labelOrOptions?: string | Options,
  title?: string
): Definition {
  let options: Options
  if (labelOrOptions === undefined) {
    options = {}
  } else if (typeof labelOrOptions === 'string') {
    options = { label: labelOrOptions }
  } else {
    options = { ...labelOrOptions }
  }
  if (title !== undefined) {
    options.title = title
  }
  return { type: 'definition', identifier, url, ...options }
}

/**
 * Type guard for Definition.
 *
 * @param node - The node to test.
 * @returns True if node is Definition.
 */
export function isDefinition(node: Node): node is Definition {
  return node.type === 'definition'
}

/**
 * Type assertion for Definition.
 *
 * @param node - The node to test.
 */
export function assertDefinition(node: Node): asserts node is Definition {
  if (!isDefinition(node)) {
    throw new Error('Node is not a Definition')
  }
}
