/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import * as parse from 'remark-parse'
import * as stringify from 'remark-stringify'
import * as unified from 'unified'
import { Node } from 'unist'

import { assertList, createList, isList } from '.'
import { createListItem } from '../ListItem'
import { createParagraph } from '../Paragraph'
import { createText } from '../Text'

const ep1 = 'The Phantom Menace'
const ep2 = 'Attack of the Clones'
const ep3 = 'Revenge of the Sith'
const children = () =>
  Array.of(ep1, ep2, ep3).map(ep => createListItem([createParagraph([createText(ep)])]))

describe('List', () => {
  it('should create node with ordered, start and spread', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createList(true, 8, true, children()))
    ).to.equal(`8.  ${ep1}\n\n9.  ${ep2}\n\n10. ${ep3}`)
  })

  it('should create node with ordered, start and spread, children defined later', function() {
    const list = createList(true, 3, false)
    list.children.push(...children())
    expect(
      unified()
        .use(stringify)
        .stringify(list)
    ).to.equal(`3.  ${ep1}\n4.  ${ep2}\n5.  ${ep3}`)
  })

  it('should create node with ordered and start', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createList(true, 2, children()))
    ).to.equal(`2.  ${ep1}\n3.  ${ep2}\n4.  ${ep3}`)
  })

  it('should create node with ordered and start, children defined later', function() {
    const list = createList(false, 5)
    list.children.push(...children())
    expect(
      unified()
        .use(stringify)
        .stringify(list)
    ).to.equal(`-   ${ep1}\n-   ${ep2}\n-   ${ep3}`)
  })

  it('should create node with ordered', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createList(false, children()))
    ).to.equal(`-   ${ep1}\n-   ${ep2}\n-   ${ep3}`)
  })

  it('should create node with ordered, children defined later', function() {
    const list = createList(true)
    list.children.push(...children())
    expect(
      unified()
        .use(stringify)
        .stringify(list)
    ).to.equal(`1.  ${ep1}\n2.  ${ep2}\n3.  ${ep3}`)
  })

  it('should create node with ordered as option', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createList({ ordered: true, start: 4 }, children()))
    ).to.equal(`4.  ${ep1}\n5.  ${ep2}\n6.  ${ep3}`)
  })

  it('should create node with ordered as option, children defined later', function() {
    const list = createList({ ordered: true, start: 5 })
    list.children.push(...children())
    expect(
      unified()
        .use(stringify)
        .stringify(list)
    ).to.equal(`5.  ${ep1}\n6.  ${ep2}\n7.  ${ep3}`)
  })

  it('should create simple node', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createList(children()))
    ).to.equal(`-   ${ep1}\n-   ${ep2}\n-   ${ep3}`)
  })

  it('should create simple node, children defined later', function() {
    const list = createList()
    list.children.push(...children())
    expect(
      unified()
        .use(stringify)
        .stringify(list)
    ).to.equal(`-   ${ep1}\n-   ${ep2}\n-   ${ep3}`)
  })

  it('should parse node', function() {
    const root = unified()
      .use(parse)
      .parse(`-   ${ep1}\n-   ${ep2}\n-   ${ep3}`)
    expect(root.children).to.exist.and.to.have.lengthOf(1)
    const list = (root.children as Node[])[0]
    expect(isList(root)).to.be.false
    expect(() => assertList(root)).to.throw(/Node is not a List/)
    expect(isList(list)).to.be.true
    expect(() => assertList(list)).not.to.throw()
  })
})
