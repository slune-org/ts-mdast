/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import * as parse from 'remark-parse'
import * as stringify from 'remark-stringify'
import * as unified from 'unified'
import { Node } from 'unist'

import { assertTable, createTable, isTable } from '.'
import { createTableCell } from '../TableCell'
import { createTableRow } from '../TableRow'
import { createText } from '../Text'

const text1 = 'Those who can, do'
const text2 = 'Those who can’t, teach'
const children = () =>
  Array.of(text1, text2).map(text => createTableRow([createTableCell([createText(text)])]))

describe('Table', () => {
  it('should create node with align', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createTable(['right'], children()))
    ).to.equal(`|      ${text1} |\n| ---------------------: |\n| ${text2} |`)
  })

  it('should create node with align, children defined later', function() {
    const list = createTable(['center'])
    list.children.push(...children())
    expect(
      unified()
        .use(stringify)
        .stringify(list)
    ).to.equal(`|    ${text1}   |\n| :--------------------: |\n| ${text2} |`)
  })

  it('should create node with align as option', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createTable({ align: [null, 'left'] }, children()))
    ).to.equal(`| ${text1}      |\n| ---------------------- |\n| ${text2} |`)
  })

  it('should create node with align as option, children defined later', function() {
    const list = createTable({ align: ['left'] })
    list.children.push(...children())
    expect(
      unified()
        .use(stringify)
        .stringify(list)
    ).to.equal(`| ${text1}      |\n| :--------------------- |\n| ${text2} |`)
  })

  it('should create simple node', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createTable(children()))
    ).to.equal(`| ${text1}      |\n| ---------------------- |\n| ${text2} |`)
  })

  it('should create simple node, children defined later', function() {
    const listItem = createTable()
    listItem.children.push(...children())
    expect(
      unified()
        .use(stringify)
        .stringify(listItem)
    ).to.equal(`| ${text1}      |\n| ---------------------- |\n| ${text2} |`)
  })

  it('should parse node', function() {
    const root = unified()
      .use(parse)
      .parse(`| |\n|--|\n|${text1}|\n|${text2}|`)
    expect(root.children).to.exist.and.to.have.lengthOf(1)
    const table = (root.children as Node[])[0]
    expect(isTable(root)).to.be.false
    expect(() => assertTable(root)).to.throw(/Node is not a Table/)
    expect(isTable(table)).to.be.true
    expect(() => assertTable(table)).not.to.throw()
  })
})
