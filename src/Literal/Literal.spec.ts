/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import { Node } from 'unist'

import { assertLiteral, isLiteral } from '.'
import { createText } from '../Text'

describe('Literal', () => {
  it('should identify node', function() {
    const bad: Node = { type: 'unknown' }
    const good = createText('Homo homini lupus est')
    expect(isLiteral(bad)).to.be.false
    expect(() => assertLiteral(bad)).to.throw(/Node is not a Literal/)
    expect(isLiteral(good)).to.be.true
    expect(() => assertLiteral(good)).not.to.throw()
  })
})
