/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import * as parse from 'remark-parse'
import * as stringify from 'remark-stringify'
import * as unified from 'unified'
import { Node } from 'unist'

import { assertHTML, createHTML, isHTML } from '.'

describe('HTML', () => {
  it('should create node', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createHTML('<div>'))
    ).to.equal('<div>')
  })

  it('should parse node', function() {
    const root = unified()
      .use(parse)
      .parse('<div>>')
    expect(root.children).to.exist.and.to.have.lengthOf(1)
    const html = (root.children as Node[])[0]
    expect(isHTML(root)).to.be.false
    expect(() => assertHTML(root)).to.throw(/Node is not a HTML/)
    expect(isHTML(html)).to.be.true
    expect(() => assertHTML(html)).not.to.throw()
  })
})
