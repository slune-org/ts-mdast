/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import * as parse from 'remark-parse'
import * as stringify from 'remark-stringify'
import * as unified from 'unified'
import { Node } from 'unist'

import { assertStrong, createStrong, isStrong } from '.'
import { createText } from '../Text'

describe('Strong', () => {
  it('should create node', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createStrong([createText('Dorothea Wierer')]))
    ).to.equal('**Dorothea Wierer**')
  })

  it('should create node, children defined later', function() {
    const paragraph = createStrong()
    paragraph.children.push(createText('Dorothea Wierer'))
    expect(
      unified()
        .use(stringify)
        .stringify(paragraph)
    ).to.equal('**Dorothea Wierer**')
  })

  it('should parse node', function() {
    const root = unified()
      .use(parse)
      .parse('**Dorothea Wierer**')
    expect(root.children).to.exist.and.to.have.lengthOf(1)
    const paragraph = (root.children as Node[])[0]
    expect(paragraph.children).to.exist.and.to.have.lengthOf(1)
    const strong = (paragraph.children as Node[])[0]
    expect(isStrong(root)).to.be.false
    expect(() => assertStrong(root)).to.throw(/Node is not a Strong/)
    expect(isStrong(strong)).to.be.true
    expect(() => assertStrong(strong)).not.to.throw()
  })
})
