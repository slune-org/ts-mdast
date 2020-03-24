/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import { Node } from 'unist'

import { assertRowContent, isRowContent } from '.'
import { createTableCell } from '../TableCell'
import { createText } from '../Text'

describe('RowContent', () => {
  it('should identify node', function() {
    const bad: Node = { type: 'unknown' }
    const good = createTableCell([createText('Homo homini lupus est')])
    expect(isRowContent(bad)).to.be.false
    expect(() => assertRowContent(bad)).to.throw(/Node is not a RowContent/)
    expect(isRowContent(good)).to.be.true
    expect(() => assertRowContent(good)).not.to.throw()
  })
})
