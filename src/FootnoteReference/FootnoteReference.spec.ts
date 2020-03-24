/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import * as stringify from 'remark-stringify'
import * as unified from 'unified'
import { Node } from 'unist'

import { assertFootnoteReference, createFootnoteReference, isFootnoteReference } from '.'
import { createRoot } from '../Root'

const label = 'VGer'
const target = 'vger'

describe('FootnoteReference', () => {
  it('should create node with label', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createFootnoteReference(target, label))
    ).to.equal(`[^${label}]`)
  })

  it('should create node with label as option', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createFootnoteReference(target, { label }))
    ).to.equal(`[^${label}]`)
  })

  it('should create simple node', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createFootnoteReference(target))
    ).to.equal(`[^${target}]`)
  })

  it('should parse node', function() {
    const root = createRoot([createFootnoteReference(target)])
    expect(root.children).to.exist.and.to.have.lengthOf(1)
    const reference = (root.children as Node[])[0]
    expect(isFootnoteReference(root)).to.be.false
    expect(() => assertFootnoteReference(root)).to.throw(/Node is not a FootnoteReference/)
    expect(isFootnoteReference(reference)).to.be.true
    expect(() => assertFootnoteReference(reference)).not.to.throw()
  })
})
