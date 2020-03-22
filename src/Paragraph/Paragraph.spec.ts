/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import * as parse from 'remark-parse'
import * as stringify from 'remark-stringify'
import * as unified from 'unified'
import { Node } from 'unist'

import { assertParagraph, createParagraph, isParagraph } from '.'
import { createText } from '../Text'

const paragraphText = 'Kiu tro certas pri sia vero , kreas inferon sur la tero'

describe('Paragraph', () => {
  it('should create node', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createParagraph([createText(paragraphText)]))
    ).to.equal(paragraphText)
  })

  it('should create node, children defined later', function() {
    const paragraph = createParagraph()
    paragraph.children.push(createText(paragraphText))
    expect(
      unified()
        .use(stringify)
        .stringify(paragraph)
    ).to.equal(paragraphText)
  })

  it('should parse node', function() {
    const root = unified()
      .use(parse)
      .parse(paragraphText)
    expect(root.children).to.exist.and.to.have.lengthOf(1)
    const paragraph = (root.children as Node[])[0]
    expect(isParagraph(root)).to.be.false
    expect(() => assertParagraph(root)).to.throw(/Node is not a Paragraph/)
    expect(isParagraph(paragraph)).to.be.true
    expect(() => assertParagraph(paragraph)).not.to.throw()
  })
})
