/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import * as parse from 'remark-parse'
import * as stringify from 'remark-stringify'
import * as unified from 'unified'
import { Node } from 'unist'

import { assertCode, createCode, isCode } from '.'

const codeContent = 'const code = createCode()\nassertCode(code)'

describe('Code', () => {
  it('should create node with lang and meta', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createCode(codeContent, 'typescript', 'highlight-line="2"'))
    ).to.equal('```typescript highlight-line="2"\n' + codeContent + '\n```')
  })

  it('should create node with lang', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createCode(codeContent, 'typescript'))
    ).to.equal('```typescript\n' + codeContent + '\n```')
  })

  it('should create node with lang as option', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createCode(codeContent, { lang: 'typescript' }))
    ).to.equal('```typescript\n' + codeContent + '\n```')
  })

  it('should create simple node', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createCode(codeContent))
    ).to.equal('    ' + codeContent.split('\n').join('\n    '))
  })

  it('should parse node', function() {
    const root = unified()
      .use(parse)
      .parse('```typescript highlight-line="2"\n' + codeContent + '\n```')
    expect(root.children).to.exist.and.to.have.lengthOf(1)
    const code = (root.children as Node[])[0]
    expect(isCode(root)).to.be.false
    expect(() => assertCode(root)).to.throw(/Node is not a Code/)
    expect(isCode(code)).to.be.true
    expect(() => assertCode(code)).not.to.throw()
  })
})
