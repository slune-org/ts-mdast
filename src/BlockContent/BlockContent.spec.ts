/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import { Node } from 'unist'

import { assertBlockContent, isBlockContent } from '.'
import { createParagraph } from '../Paragraph'
import { createText } from '../Text'

describe('BlockContent', () => {
  it('should identify node', function() {
    const bad: Node = { type: 'unknown' }
    const good = createParagraph([createText('Homo homini lupus est')])
    expect(isBlockContent(bad)).to.be.false
    expect(() => assertBlockContent(bad)).to.throw(/Node is not a BlockContent/)
    expect(isBlockContent(good)).to.be.true
    expect(() => assertBlockContent(good)).not.to.throw()
  })
})
