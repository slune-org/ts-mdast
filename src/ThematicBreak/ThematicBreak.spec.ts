/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import * as parse from 'remark-parse'
import * as stringify from 'remark-stringify'
import * as unified from 'unified'
import { Node } from 'unist'

import { assertThematicBreak, createThematicBreak, isThematicBreak } from '.'

describe('ThematicBreak', () => {
  it('should create node', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createThematicBreak())
    ).to.equal('* * *')
  })

  it('should parse node', function() {
    const root = unified()
      .use(parse)
      .parse('* * *')
    expect(root.children).to.exist.and.to.have.lengthOf(1)
    const tbreak = (root.children as Node[])[0]
    expect(isThematicBreak(root)).to.be.false
    expect(() => assertThematicBreak(root)).to.throw(/Node is not a ThematicBreak/)
    expect(isThematicBreak(tbreak)).to.be.true
    expect(() => assertThematicBreak(tbreak)).not.to.throw()
  })
})
