/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import * as parse from 'remark-parse'
import * as stringify from 'remark-stringify'
import * as unified from 'unified'
import { Node } from 'unist'

import { assertInlineCode, createInlineCode, isInlineCode } from '.'

describe('InlineCode', () => {
  it('should create node', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createInlineCode('format C:'))
    ).to.equal('`format C:`')
  })

  it('should parse node', function() {
    const root = unified()
      .use(parse)
      .parse('`format C:`')
    expect(root.children).to.exist.and.to.have.lengthOf(1)
    const paragraph = (root.children as Node[])[0]
    expect(paragraph.children).to.exist.and.to.have.lengthOf(1)
    const code = (paragraph.children as Node[])[0]
    expect(isInlineCode(root)).to.be.false
    expect(() => assertInlineCode(root)).to.throw(/Node is not an InlineCode/)
    expect(isInlineCode(code)).to.be.true
    expect(() => assertInlineCode(code)).not.to.throw()
  })
})
