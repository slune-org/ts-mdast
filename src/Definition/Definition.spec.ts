/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai'
import * as parse from 'remark-parse'
import * as stringify from 'remark-stringify'
import * as unified from 'unified'
import { Node } from 'unist'

import { assertDefinition, createDefinition, isDefinition } from '.'

describe('Definition', () => {
  it('should create node with label and title', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createDefinition('example-id', 'http://example.com', 'ExampleId', 'Example'))
    ).to.equal('[ExampleId]: http://example.com "Example"')
  })

  it('should create node with label', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createDefinition('example-id', 'http://example.com', 'ExampleId'))
    ).to.equal('[ExampleId]: http://example.com')
  })

  it('should create node with title as option', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createDefinition('example-id', 'http://example.com', { title: 'Example' }))
    ).to.equal('[example-id]: http://example.com "Example"')
  })

  it('should create simple node', function() {
    expect(
      unified()
        .use(stringify)
        .stringify(createDefinition('example-id', 'http://example.com'))
    ).to.equal('[example-id]: http://example.com')
  })

  it('should parse node', function() {
    const root = unified()
      .use(parse)
      .parse('[example-id]: http://example.com')
    expect(root.children).to.exist.and.to.have.lengthOf(1)
    const definition = (root.children as Node[])[0]
    expect(isDefinition(root)).to.be.false
    expect(() => assertDefinition(root)).to.throw(/Node is not a Definition/)
    expect(isDefinition(definition)).to.be.true
    expect(() => assertDefinition(definition)).not.to.throw()
  })
})
