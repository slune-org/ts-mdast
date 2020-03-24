/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import * as parse from 'remark-parse'
import * as stringify from 'remark-stringify'
import * as unified from 'unified'
import { Node } from 'unist'

import { assertLinkReference, createLinkReference, isLinkReference } from '.'
import { createText } from '../Text'

const label = 'Zamenhof'
const target = 'zamenhof'
const text = 'Ludwik Lejzer Zamenhof'

describe('LinkReference', () => {
  it('should create node with label', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createLinkReference(target, 'full', label, [createText(text)]))
    ).to.equal(`[${text}][${label}]`)
  })

  it('should create node with label, children defined later', function() {
    const list = createLinkReference(target, 'full', label)
    list.children.push(createText(text))
    expect(
      unified()
        .use(stringify)
        .stringify(list)
    ).to.equal(`[${text}][${label}]`)
  })

  it('should create node with label as option', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createLinkReference(target, 'full', { label }, [createText(text)]))
    ).to.equal(`[${text}][${label}]`)
  })

  it('should create node with label as option, children defined later', function() {
    const list = createLinkReference(target, 'full', { label })
    list.children.push(createText(text))
    expect(
      unified()
        .use(stringify)
        .stringify(list)
    ).to.equal(`[${text}][${label}]`)
  })

  it('should create simple node', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createLinkReference(target, 'full', [createText(text)]))
    ).to.equal(`[${text}][${target}]`)
  })

  it('should create simple node, children defined later', function() {
    const list = createLinkReference(target, 'full')
    list.children.push(createText(text))
    expect(
      unified()
        .use(stringify)
        .stringify(list)
    ).to.equal(`[${text}][${target}]`)
  })

  it('should parse node', function() {
    const root = unified()
      .use(parse)
      .parse(`[${text}][${label}]`)
    expect(root.children).to.exist.and.to.have.lengthOf(1)
    const paragraph = (root.children as Node[])[0]
    expect(paragraph.children).to.exist.and.to.have.lengthOf(1)
    const list = (paragraph.children as Node[])[0]
    expect(isLinkReference(root)).to.be.false
    expect(() => assertLinkReference(root)).to.throw(/Node is not a LinkReference/)
    expect(isLinkReference(list)).to.be.true
    expect(() => assertLinkReference(list)).not.to.throw()
  })
})
