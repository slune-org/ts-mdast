/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import { Node } from 'unist'

import { assertParent, isParent } from '.'
import { createParagraph } from '../Paragraph'
import { createText } from '../Text'

describe('Parent', () => {
  it('should identify node', function() {
    const bad: Node = { type: 'unknown' }
    const good = createParagraph([createText('Homo homini lupus est')])
    expect(isParent(bad)).to.be.false
    expect(() => assertParent(bad)).to.throw(/Node is not a Parent/)
    expect(isParent(good)).to.be.true
    expect(() => assertParent(good)).not.to.throw()
  })
})
