/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import * as parse from 'remark-parse'
import * as stringify from 'remark-stringify'
import * as unified from 'unified'
import { Node } from 'unist'

import { assertBreak, createBreak, isBreak } from '.'

describe('Break', () => {
  it('should create node', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createBreak())
    ).to.equal('  \n')
  })

  it('should parse node', function() {
    const root = unified()
      .use(parse)
      .parse('I’m sticking  \nwith you')
    expect(root.children).to.exist.and.to.have.lengthOf(1)
    const paragraph = (root.children as Node[])[0]
    expect(paragraph.children).to.exist.and.to.have.lengthOf(3)
    const breakNode = (paragraph.children as Node[])[1]
    expect(isBreak(root)).to.be.false
    expect(() => assertBreak(root)).to.throw(/Node is not a Break/)
    expect(isBreak(breakNode)).to.be.true
    expect(() => assertBreak(breakNode)).not.to.throw()
  })
})
