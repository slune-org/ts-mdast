import { YAML } from 'mdast'
import { Node } from 'unist'

/**
 * @param value - The content of the YAML.
 * @returns The YAML.
 */
export function createYAML(value: string): YAML {
  return { type: 'yaml', value }
}

/**
 * Type guard for YAML.
 *
 * @param node - The node to test.
 * @returns True if node is YAML.
 */
export function isYAML(node: Node): node is YAML {
  return node.type === 'yaml'
}

/**
 * Type assertion for YAML.
 *
 * @param node - The node to test.
 */
export function assertYAML(node: Node): asserts node is YAML {
  if (!isYAML(node)) {
    throw new Error('Node is not a YAML')
  }
}
