/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import * as frontmatter from 'remark-frontmatter'
import * as parse from 'remark-parse'
import * as stringify from 'remark-stringify'
import * as unified from 'unified'
import { Node } from 'unist'

import { assertYAML, createYAML, isYAML } from '.'

describe('YAML', () => {
  it('should create node', function() {
    expect(
      unified()
        .use(stringify)
        .use(frontmatter, ['yaml'])
        .stringify(createYAML('key: value'))
    ).to.equal('---\nkey: value\n---')
  })

  it('should parse node', function() {
    const root = unified()
      .use(parse)
      .use(frontmatter, ['yaml'])
      .parse('---\nkey: value\n---')
    expect(root.children).to.exist.and.to.have.lengthOf(1)
    const yaml = (root.children as Node[])[0]
    expect(isYAML(root)).to.be.false
    expect(() => assertYAML(root)).to.throw(/Node is not a YAML/)
    expect(isYAML(yaml)).to.be.true
    expect(() => assertYAML(yaml)).not.to.throw()
  })
})
