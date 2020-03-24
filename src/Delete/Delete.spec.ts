/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import * as parse from 'remark-parse'
import * as stringify from 'remark-stringify'
import * as unified from 'unified'
import { Node } from 'unist'

import { assertDelete, createDelete, isDelete } from '.'
import { createText } from '../Text'

describe('Delete', () => {
  it('should create node', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createDelete([createText('Regina Oja')]))
    ).to.equal('~~Regina Oja~~')
  })

  it('should create node, children defined later', function() {
    const paragraph = createDelete()
    paragraph.children.push(createText('Regina Oja'))
    expect(
      unified()
        .use(stringify)
        .stringify(paragraph)
    ).to.equal('~~Regina Oja~~')
  })

  it('should parse node', function() {
    const root = unified()
      .use(parse)
      .parse('~~Regina Oja~~')
    expect(root.children).to.exist.and.to.have.lengthOf(1)
    const paragraph = (root.children as Node[])[0]
    expect(paragraph.children).to.exist.and.to.have.lengthOf(1)
    const deleteNode = (paragraph.children as Node[])[0]
    expect(isDelete(root)).to.be.false
    expect(() => assertDelete(root)).to.throw(/Node is not a Delete/)
    expect(isDelete(deleteNode)).to.be.true
    expect(() => assertDelete(deleteNode)).not.to.throw()
  })
})
