/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import { Node } from 'unist'

import { assertDefinitionContent, isDefinitionContent } from '.'
import { createDefinition } from '../Definition'

describe('DefinitionContent', () => {
  it('should identify node', function() {
    const bad: Node = { type: 'unknown' }
    const good = createDefinition('example', 'https://example.com')
    expect(isDefinitionContent(bad)).to.be.false
    expect(() => assertDefinitionContent(bad)).to.throw(/Node is not a DefinitionContent/)
    expect(isDefinitionContent(good)).to.be.true
    expect(() => assertDefinitionContent(good)).not.to.throw()
  })
})
