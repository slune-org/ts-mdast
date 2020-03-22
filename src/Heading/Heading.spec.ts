/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import * as parse from 'remark-parse'
import * as stringify from 'remark-stringify'
import * as unified from 'unified'
import { Node } from 'unist'

import { assertHeading, createHeading, isHeading } from '.'
import { createText } from '../Text'

const headingText = 'El deseo haze hermoso lo feo.'

describe('Heading', () => {
  it('should create node', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createHeading(1, [createText(headingText)]))
    ).to.equal('# ' + headingText)
  })

  it('should create node, children defined later', function() {
    const paragraph = createHeading(3)
    paragraph.children.push(createText(headingText))
    expect(
      unified()
        .use(stringify)
        .stringify(paragraph)
    ).to.equal('### ' + headingText)
  })

  it('should parse node', function() {
    const root = unified()
      .use(parse)
      .parse('## ' + headingText)
    expect(root.children).to.exist.and.to.have.lengthOf(1)
    const heading = (root.children as Node[])[0]
    expect(isHeading(root)).to.be.false
    expect(() => assertHeading(root)).to.throw(/Node is not a Heading/)
    expect(isHeading(heading)).to.be.true
    expect(() => assertHeading(heading)).not.to.throw()
  })
})
