/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import { Node } from 'unist'

import { assertContent, isContent } from '.'
import { createParagraph } from '../Paragraph'
import { createText } from '../Text'

describe('Content', () => {
  it('should identify node', function() {
    const bad: Node = { type: 'unknown' }
    const good = createParagraph([createText('Homo homini lupus est')])
    expect(isContent(bad)).to.be.false
    expect(() => assertContent(bad)).to.throw(/Node is not a Content/)
    expect(isContent(good)).to.be.true
    expect(() => assertContent(good)).not.to.throw()
  })
})
