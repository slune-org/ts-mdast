/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import * as parse from 'remark-parse'
import * as stringify from 'remark-stringify'
import * as unified from 'unified'
import { Node } from 'unist'

import { assertListItem, createListItem, isListItem } from '.'
import { createParagraph } from '../Paragraph'
import { createText } from '../Text'

const jon = 'Jon Snow'
const daenerys = 'Daenerys Targaryen'

describe('ListItem', () => {
  it('should create node with check and spread', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(
          createListItem(true, true, [
            createParagraph([createText(jon)]),
            createParagraph([createText(daenerys)]),
          ])
        )
    ).to.equal(`-   [x] ${jon}\n\n    ${daenerys}`)
  })

  it('should create node with check and spread, children defined later', function() {
    const listItem = createListItem(true, true)
    listItem.children.push(createParagraph([createText(jon)]), createParagraph([createText(daenerys)]))
    expect(
      unified()
        .use(stringify)
        .stringify(listItem)
    ).to.equal(`-   [x] ${jon}\n\n    ${daenerys}`)
  })

  it('should create node with check', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createListItem(true, [createParagraph([createText(jon)])]))
    ).to.equal(`-   [x] ${jon}`)
  })

  it('should create node with no check', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createListItem(false, [createParagraph([createText(daenerys)])]))
    ).to.equal(`-   [ ] ${daenerys}`)
  })

  it('should create node with check, children defined later', function() {
    const listItem = createListItem(true)
    listItem.children.push(createParagraph([createText(jon)]))
    expect(
      unified()
        .use(stringify)
        .stringify(listItem)
    ).to.equal(`-   [x] ${jon}`)
  })

  it('should create node with no spread as option', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(
          createListItem({ spread: false }, [
            createParagraph([createText(jon)]),
            createParagraph([createText(daenerys)]),
          ])
        )
    ).to.equal(`-   ${jon}\n    ${daenerys}`)
  })

  it('should create simple node', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createListItem([createParagraph([createText(jon)])]))
    ).to.equal(`-   ${jon}`)
  })

  it('should create simple node, children defined later', function() {
    const listItem = createListItem()
    listItem.children.push(createParagraph([createText(jon)]))
    expect(
      unified()
        .use(stringify)
        .stringify(listItem)
    ).to.equal(`-   ${jon}`)
  })

  it('should parse node', function() {
    const root = unified()
      .use(parse)
      .parse(`-   [x] ${jon}\n\n    ${daenerys}`)
    expect(root.children).to.exist.and.to.have.lengthOf(1)
    const list = (root.children as Node[])[0]
    expect(list.children).to.exist.and.to.have.lengthOf(1)
    const listItem = (list.children as Node[])[0]
    expect(isListItem(root)).to.be.false
    expect(() => assertListItem(root)).to.throw(/Node is not a ListItem/)
    expect(isListItem(listItem)).to.be.true
    expect(() => assertListItem(listItem)).not.to.throw()
  })
})
