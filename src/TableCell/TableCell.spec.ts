/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import * as parse from 'remark-parse'
import * as stringify from 'remark-stringify'
import * as unified from 'unified'
import { Node } from 'unist'

import { assertTableCell, createTableCell, isTableCell } from '.'
import { createText } from '../Text'

const cellText = 'A journey of thousand miles begins with a single step.'

describe('TableCell', () => {
  it('should create node', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createTableCell([createText(cellText)]))
    ).to.equal(cellText)
  })

  it('should create node, children defined later', function() {
    const tableCell = createTableCell()
    tableCell.children.push(createText(cellText))
    expect(
      unified()
        .use(stringify)
        .stringify(tableCell)
    ).to.equal(cellText)
  })

  it('should parse node', function() {
    const root = unified()
      .use(parse)
      .parse(`| |\n|--|\n|${cellText}|`)
    expect(root.children).to.exist.and.to.have.lengthOf(1)
    const table = (root.children as Node[])[0]
    expect(table.children).to.exist.and.to.have.lengthOf(2)
    const tableRow = (table.children as Node[])[1]
    expect(tableRow.children).to.exist.and.to.have.lengthOf(1)
    const tableCell = (tableRow.children as Node[])[0]
    expect(isTableCell(root)).to.be.false
    expect(() => assertTableCell(root)).to.throw(/Node is not a TableCell/)
    expect(isTableCell(tableCell)).to.be.true
    expect(() => assertTableCell(tableCell)).not.to.throw()
  })
})
