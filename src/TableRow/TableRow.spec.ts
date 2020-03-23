/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import * as parse from 'remark-parse'
import * as stringify from 'remark-stringify'
import * as unified from 'unified'
import { Node } from 'unist'

import { assertTableRow, createTableRow, isTableRow } from '.'
import { createTable } from '../Table'
import { createTableCell } from '../TableCell'
import { createText } from '../Text'

const cellText = 'Those who want rain must also accept the mud.'
const result = `| ${cellText} |\n| --------------------------------------------- |`

describe('TableRow', () => {
  it('should create node', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createTable([createTableRow([createTableCell([createText(cellText)])])]))
    ).to.equal(result)
  })

  it('should create node, children defined later', function() {
    const tableRow = createTableRow()
    tableRow.children.push(createTableCell([createText(cellText)]))
    expect(
      unified()
        .use(stringify)
        .stringify(createTable([tableRow]))
    ).to.equal(result)
  })

  it('should parse node', function() {
    const root = unified()
      .use(parse)
      .parse(`| |\n|--|\n|${cellText}|`)
    expect(root.children).to.exist.and.to.have.lengthOf(1)
    const table = (root.children as Node[])[0]
    expect(table.children).to.exist.and.to.have.lengthOf(2)
    const tableRow = (table.children as Node[])[1]
    expect(isTableRow(root)).to.be.false
    expect(() => assertTableRow(root)).to.throw(/Node is not a TableRow/)
    expect(isTableRow(tableRow)).to.be.true
    expect(() => assertTableRow(tableRow)).not.to.throw()
  })
})
