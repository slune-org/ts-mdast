/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import { Node } from 'unist'

import { assertFrontmatterContent, isFrontmatterContent } from '.'
import { createYAML } from '../YAML'

describe('FrontmatterContent', () => {
  it('should identify node', function() {
    const bad: Node = { type: 'unknown' }
    const good = createYAML('key: value')
    expect(isFrontmatterContent(bad)).to.be.false
    expect(() => assertFrontmatterContent(bad)).to.throw(/Node is not a FrontmatterContent/)
    expect(isFrontmatterContent(good)).to.be.true
    expect(() => assertFrontmatterContent(good)).not.to.throw()
  })
})
