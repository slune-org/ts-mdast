import { Code } from 'mdast'
import { Node } from 'unist'

interface Options {
  lang?: string
  meta?: string
}

/**
 * @param value - The content of the code.
 * @param lang - The language of computer code being marked up.
 * @param meta - If lang, custom information relating to the node.
 * @returns The code.
 */
export function createCode(value: string, lang?: string, meta?: string): Code

/**
 * @param value - The content of the code.
 * @param options - The options of the code.
 * @returns The code.
 */
export function createCode(value: string, options: Options): Code

/*
 * Implementation.
 */
export function createCode(value: string, langOrOptions?: string | Options, meta?: string): Code {
  let options: Options
  if (langOrOptions === undefined) {
    options = {}
  } else if (typeof langOrOptions === 'string') {
    options = { lang: langOrOptions }
  } else {
    options = { ...langOrOptions }
  }
  if (meta !== undefined) {
    options.meta = meta
  }
  return { type: 'code', value, ...options }
}

/**
 * Type guard for Code.
 *
 * @param node - The node to test.
 * @returns True if node is Code.
 */
export function isCode(node: Node): node is Code {
  return node.type === 'code'
}

/**
 * Type assertion for Code.
 *
 * @param node - The node to test.
 */
export function assertCode(node: Node): asserts node is Code {
  if (!isCode(node)) {
    throw new Error('Node is not a Code')
  }
}
