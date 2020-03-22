/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import * as parse from 'remark-parse'
import * as stringify from 'remark-stringify'
import * as unified from 'unified'
import { Node } from 'unist'

import { assertRoot, createRoot, isRoot } from '.'
import { createParagraph } from '../Paragraph'
import { createText } from '../Text'

const testedText = 'In the Age of Chaos, two factions battled for dominance.'

describe('Root', () => {
  it('should create node', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createRoot([createParagraph([createText(testedText)])]))
    ).to.equal(testedText + '\n')
  })

  it('should create node, children defined later', function() {
    const root = createRoot()
    root.children.push(createParagraph([createText(testedText)]))
    expect(
      unified()
        .use(stringify)
        .stringify(root)
    ).to.equal(testedText + '\n')
  })

  it('should parse node', function() {
    const root = unified()
      .use(parse)
      .parse(testedText)
    expect(root.children).to.exist.and.to.have.lengthOf(1)
    const paragraph = (root.children as Node[])[0]
    expect(isRoot(paragraph)).to.be.false
    expect(() => assertRoot(paragraph)).to.throw(/Node is not a Root/)
    expect(isRoot(root)).to.be.true
    expect(() => assertRoot(root)).not.to.throw()
  })
})
