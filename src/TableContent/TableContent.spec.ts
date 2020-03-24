/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import { Node } from 'unist'

import { assertTableContent, isTableContent } from '.'
import { createTableCell } from '../TableCell'
import { createTableRow } from '../TableRow'
import { createText } from '../Text'

describe('TableContent', () => {
  it('should identify node', function() {
    const bad: Node = { type: 'unknown' }
    const good = createTableRow([createTableCell([createText('Homo homini lupus est')])])
    expect(isTableContent(bad)).to.be.false
    expect(() => assertTableContent(bad)).to.throw(/Node is not a TableContent/)
    expect(isTableContent(good)).to.be.true
    expect(() => assertTableContent(good)).not.to.throw()
  })
})
