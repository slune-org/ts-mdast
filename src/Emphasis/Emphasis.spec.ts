/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import * as parse from 'remark-parse'
import * as stringify from 'remark-stringify'
import * as unified from 'unified'
import { Node } from 'unist'

import { assertEmphasis, createEmphasis, isEmphasis } from '.'
import { createText } from '../Text'

describe('Emphasis', () => {
  it('should create node', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createEmphasis([createText('Tiril Eckhoff')]))
    ).to.equal('_Tiril Eckhoff_')
  })

  it('should create node, children defined later', function() {
    const paragraph = createEmphasis()
    paragraph.children.push(createText('Tiril Eckhoff'))
    expect(
      unified()
        .use(stringify)
        .stringify(paragraph)
    ).to.equal('_Tiril Eckhoff_')
  })

  it('should parse node', function() {
    const root = unified()
      .use(parse)
      .parse('_Tiril Eckhoff_')
    expect(root.children).to.exist.and.to.have.lengthOf(1)
    const paragraph = (root.children as Node[])[0]
    expect(paragraph.children).to.exist.and.to.have.lengthOf(1)
    const emphasis = (paragraph.children as Node[])[0]
    expect(isEmphasis(root)).to.be.false
    expect(() => assertEmphasis(root)).to.throw(/Node is not an Emphasis/)
    expect(isEmphasis(emphasis)).to.be.true
    expect(() => assertEmphasis(emphasis)).not.to.throw()
  })
})
