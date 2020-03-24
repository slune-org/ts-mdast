/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import * as parse from 'remark-parse'
import * as stringify from 'remark-stringify'
import * as unified from 'unified'
import { Node } from 'unist'

import { assertImageReference, createImageReference, isImageReference } from '.'

const label = 'Alba'
const target = 'alba'
const alt = 'Jessica Alba'

describe('ImageReference', () => {
  it('should create node with alt and label', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createImageReference(target, 'full', alt, label))
    ).to.equal(`![${alt}][${label}]`)
  })

  it('should create node with alt', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createImageReference(target, 'full', alt))
    ).to.equal(`![${alt}][${target}]`)
  })

  it('should create node with label as option', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createImageReference(target, 'full', { label }))
    ).to.equal(`![][${label}]`)
  })

  it('should create simple node', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createImageReference(target, 'full'))
    ).to.equal(`![][${target}]`)
  })

  it('should parse node', function() {
    const root = unified()
      .use(parse)
      .parse(`![${alt}][${label}]`)
    expect(root.children).to.exist.and.to.have.lengthOf(1)
    const paragraph = (root.children as Node[])[0]
    expect(paragraph.children).to.exist.and.to.have.lengthOf(1)
    const reference = (paragraph.children as Node[])[0]
    expect(isImageReference(root)).to.be.false
    expect(() => assertImageReference(root)).to.throw(/Node is not an ImageReference/)
    expect(isImageReference(reference)).to.be.true
    expect(() => assertImageReference(reference)).not.to.throw()
  })
})
