/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import * as parse from 'remark-parse'
import * as stringify from 'remark-stringify'
import * as unified from 'unified'
import { Node } from 'unist'

import { assertImage, createImage, isImage } from '.'

const url =
  'https://en.wikipedia.org/wiki/Emilia_Clarke#/media/File:Emilia_Clarke_by_Gage_Skidmore_2_(cropped).jpg'
const alt = 'Emilia Clarke'
const title = 'Emilia Clarke on Wikipedia'

describe('Image', () => {
  it('should create node with alt and title', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createImage(url, alt, title))
    ).to.equal(`![${alt}](${url} "${title}")`)
  })

  it('should create node with alt', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createImage(url, alt))
    ).to.equal(`![${alt}](${url})`)
  })

  it('should create node with title as option', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createImage(url, { title }))
    ).to.equal(`![](${url} "${title}")`)
  })

  it('should create simple node', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createImage(url))
    ).to.equal(`![](${url})`)
  })

  it('should parse node', function() {
    const root = unified()
      .use(parse)
      .parse(`![${alt}](${url} "${title}")`)
    expect(root.children).to.exist.and.to.have.lengthOf(1)
    const paragraph = (root.children as Node[])[0]
    expect(paragraph.children).to.exist.and.to.have.lengthOf(1)
    const image = (paragraph.children as Node[])[0]
    expect(isImage(root)).to.be.false
    expect(() => assertImage(root)).to.throw(/Node is not an Image/)
    expect(isImage(image)).to.be.true
    expect(() => assertImage(image)).not.to.throw()
  })
})
