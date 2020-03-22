/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import * as parse from 'remark-parse'
import * as stringify from 'remark-stringify'
import * as unified from 'unified'
import { Node } from 'unist'

import { assertBlockquote, createBlockquote, isBlockquote } from '.'
import { createParagraph } from '../Paragraph'
import { createText } from '../Text'

const quoteText =
  'I am for a single calendar for the entire world, just as I am for a single currency' +
  ' for all peoples and for an auxiliary language such as Esperanto for people everywhere.'

describe('Blockquote', () => {
  it('should create node', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createBlockquote([createParagraph([createText(quoteText)])]))
    ).to.equal('> ' + quoteText)
  })

  it('should create node, children defined later', function() {
    const blockquote = createBlockquote()
    blockquote.children.push(createParagraph([createText(quoteText)]))
    expect(
      unified()
        .use(stringify)
        .stringify(blockquote)
    ).to.equal('> ' + quoteText)
  })

  it('should parse node', function() {
    const root = unified()
      .use(parse)
      .parse('> ' + quoteText)
    expect(root.children).to.exist.and.to.have.lengthOf(1)
    const blockquote = (root.children as Node[])[0]
    expect(isBlockquote(root)).to.be.false
    expect(() => assertBlockquote(root)).to.throw(/Node is not a Blockquote/)
    expect(isBlockquote(blockquote)).to.be.true
    expect(() => assertBlockquote(blockquote)).not.to.throw()
  })
})
