/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import { Node } from 'unist'

import { assertTopLevelContent, isTopLevelContent } from '.'
import { createParagraph } from '../Paragraph'
import { createText } from '../Text'

describe('TopLevelContent', () => {
  it('should identify node', function() {
    const bad: Node = { type: 'unknown' }
    const good = createParagraph([createText('Homo homini lupus est')])
    expect(isTopLevelContent(bad)).to.be.false
    expect(() => assertTopLevelContent(bad)).to.throw(/Node is not a TopLevelContent/)
    expect(isTopLevelContent(good)).to.be.true
    expect(() => assertTopLevelContent(good)).not.to.throw()
  })
})
