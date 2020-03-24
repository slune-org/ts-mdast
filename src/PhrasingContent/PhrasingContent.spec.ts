/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import { Node } from 'unist'

import { assertPhrasingContent, isPhrasingContent } from '.'
import { createText } from '../Text'

describe('PhrasingContent', () => {
  it('should identify node', function() {
    const bad: Node = { type: 'unknown' }
    const good = createText('Homo homini lupus est')
    expect(isPhrasingContent(bad)).to.be.false
    expect(() => assertPhrasingContent(bad)).to.throw(/Node is not a PhrasingContent/)
    expect(isPhrasingContent(good)).to.be.true
    expect(() => assertPhrasingContent(good)).not.to.throw()
  })
})
