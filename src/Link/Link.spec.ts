/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import * as parse from 'remark-parse'
import * as stringify from 'remark-stringify'
import * as unified from 'unified'
import { Node } from 'unist'

import { assertLink, createLink, isLink } from '.'
import { createText } from '../Text'

const url = 'https://en.wikipedia.org/wiki/Neil_Gaiman'
const title = 'Niel Gaiman on Wikipedia'
const text = 'Neil Gaiman'

describe('Link', () => {
  it('should create node with title', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createLink(url, title, [createText(text)]))
    ).to.equal(`[${text}](${url} "${title}")`)
  })

  it('should create node with title, children defined later', function() {
    const list = createLink(url, title)
    list.children.push(createText(text))
    expect(
      unified()
        .use(stringify)
        .stringify(list)
    ).to.equal(`[${text}](${url} "${title}")`)
  })

  it('should create node with title as option', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createLink(url, { title }, [createText(text)]))
    ).to.equal(`[${text}](${url} "${title}")`)
  })

  it('should create node with title as option, children defined later', function() {
    const list = createLink(url, { title })
    list.children.push(createText(text))
    expect(
      unified()
        .use(stringify)
        .stringify(list)
    ).to.equal(`[${text}](${url} "${title}")`)
  })

  it('should create simple node', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createLink(url, [createText(text)]))
    ).to.equal(`[${text}](${url})`)
  })

  it('should create simple node, children defined later', function() {
    const list = createLink(url)
    list.children.push(createText(text))
    expect(
      unified()
        .use(stringify)
        .stringify(list)
    ).to.equal(`[${text}](${url})`)
  })

  it('should parse node', function() {
    const root = unified()
      .use(parse)
      .parse(`[${text}](${url})`)
    expect(root.children).to.exist.and.to.have.lengthOf(1)
    const paragraph = (root.children as Node[])[0]
    expect(paragraph.children).to.exist.and.to.have.lengthOf(1)
    const list = (paragraph.children as Node[])[0]
    expect(isLink(root)).to.be.false
    expect(() => assertLink(root)).to.throw(/Node is not a Link/)
    expect(isLink(list)).to.be.true
    expect(() => assertLink(list)).not.to.throw()
  })
})
