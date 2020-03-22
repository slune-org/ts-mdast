/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import * as parse from 'remark-parse'
import * as stringify from 'remark-stringify'
import * as unified from 'unified'
import { Node } from 'unist'

import { assertText, createText, isText } from '.'

describe('Text', () => {
  it('should create node', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createText('Alea jacta est'))
    ).to.equal('Alea jacta est')
  })

  it('should parse node', function() {
    const root = unified()
      .use(parse)
      .parse('Alea jacta est')
    expect(root.children).to.exist.and.to.have.lengthOf(1)
    const paragraph = (root.children as Node[])[0]
    expect(paragraph.children).to.exist.and.to.have.lengthOf(1)
    const text = (paragraph.children as Node[])[0]
    expect(isText(root)).to.be.false
    expect(() => assertText(root)).to.throw(/Node is not a Text/)
    expect(isText(text)).to.be.true
    expect(() => assertText(text)).not.to.throw()
  })
})
