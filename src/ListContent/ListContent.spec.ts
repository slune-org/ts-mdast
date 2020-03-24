/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import { Node } from 'unist'

import { assertListContent, isListContent } from '.'
import { createListItem } from '../ListItem'
import { createParagraph } from '../Paragraph'
import { createText } from '../Text'

describe('ListContent', () => {
  it('should identify node', function() {
    const bad: Node = { type: 'unknown' }
    const good = createListItem([createParagraph([createText('Homo homini lupus est')])])
    expect(isListContent(bad)).to.be.false
    expect(() => assertListContent(bad)).to.throw(/Node is not a ListContent/)
    expect(isListContent(good)).to.be.true
    expect(() => assertListContent(good)).not.to.throw()
  })
})
