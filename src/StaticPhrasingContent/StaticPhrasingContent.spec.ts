/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import { Node } from 'unist'

import { assertStaticPhrasingContent, isStaticPhrasingContent } from '.'
import { createText } from '../Text'

describe('StaticPhrasingContent', () => {
  it('should identify node', function() {
    const bad: Node = { type: 'unknown' }
    const good = createText('Homo homini lupus est')
    expect(isStaticPhrasingContent(bad)).to.be.false
    expect(() => assertStaticPhrasingContent(bad)).to.throw(/Node is not a StaticPhrasingContent/)
    expect(isStaticPhrasingContent(good)).to.be.true
    expect(() => assertStaticPhrasingContent(good)).not.to.throw()
  })
})
