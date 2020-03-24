/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import * as stringify from 'remark-stringify'
import * as unified from 'unified'
import { Node } from 'unist'

import { assertFootnoteDefinition, createFootnoteDefinition, isFootnoteDefinition } from '.'
import { createParagraph } from '../Paragraph'
import { createRoot } from '../Root'
import { createText } from '../Text'

const fntext = 'Tom Marvolo Riddle is actually Lord Voldemort'
const children = () => [createParagraph([createText(fntext)])]

describe('FootnoteDefinition', () => {
  it('should create node with label', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createFootnoteDefinition('riddle', 'Tom Riddle', children()))
    ).to.equal(`[^Tom Riddle]: ${fntext}`)
  })

  it('should create node with label, children defined later', function() {
    const fnDefinition = createFootnoteDefinition('riddle', 'Tom Riddle')
    fnDefinition.children.push(...children())
    expect(
      unified()
        .use(stringify)
        .stringify(fnDefinition)
    ).to.equal(`[^Tom Riddle]: ${fntext}`)
  })

  it('should create node with label as option', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createFootnoteDefinition('riddle', { label: 'Tom Riddle' }, children()))
    ).to.equal(`[^Tom Riddle]: ${fntext}`)
  })

  it('should create node with ordered as option, children defined later', function() {
    const fnDefinition = createFootnoteDefinition('riddle', { label: 'Tom Riddle' })
    fnDefinition.children.push(...children())
    expect(
      unified()
        .use(stringify)
        .stringify(fnDefinition)
    ).to.equal(`[^Tom Riddle]: ${fntext}`)
  })

  it('should create simple node', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createFootnoteDefinition('riddle', children()))
    ).to.equal(`[^riddle]: ${fntext}`)
  })

  it('should create simple node, children defined later', function() {
    const fnDefinition = createFootnoteDefinition('riddle')
    fnDefinition.children.push(...children())
    expect(
      unified()
        .use(stringify)
        .stringify(fnDefinition)
    ).to.equal(`[^riddle]: ${fntext}`)
  })

  it('should parse node', function() {
    // Cannot parse input to create a footnote
    const root = createRoot([createFootnoteDefinition('riddle', children())])
    expect(root.children).to.exist.and.to.have.lengthOf(1)
    const fnDefinition = (root.children as Node[])[0]
    expect(isFootnoteDefinition(root)).to.be.false
    expect(() => assertFootnoteDefinition(root)).to.throw(/Node is not a FootnoteDefinition/)
    expect(isFootnoteDefinition(fnDefinition)).to.be.true
    expect(() => assertFootnoteDefinition(fnDefinition)).not.to.throw()
  })
})
