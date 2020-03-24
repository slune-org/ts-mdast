/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import * as stringify from 'remark-stringify'
import * as unified from 'unified'
import { Node } from 'unist'

import { assertFootnote, createFootnote, isFootnote } from '.'
import { createRoot } from '../Root'
import { createText } from '../Text'

const note = 'Malcolm Crowe is dead from the beginning'

describe('Footnote', () => {
  it('should create node', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createFootnote([createText(note)]))
    ).to.equal(`[^${note}]`)
  })

  it('should create node, children defined later', function() {
    const paragraph = createFootnote()
    paragraph.children.push(createText(note))
    expect(
      unified()
        .use(stringify)
        .stringify(paragraph)
    ).to.equal(`[^${note}]`)
  })

  it('should parse node', function() {
    const root = createRoot([createFootnote([createText(note)])])
    expect(root.children).to.exist.and.to.have.lengthOf(1)
    const footnote = (root.children as Node[])[0]
    expect(isFootnote(root)).to.be.false
    expect(() => assertFootnote(root)).to.throw(/Node is not a Footnote/)
    expect(isFootnote(footnote)).to.be.true
    expect(() => assertFootnote(footnote)).not.to.throw()
  })
})
