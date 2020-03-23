[![npm package](https://badge.fury.io/js/ts-mdast.svg)](https://www.npmjs.com/package/ts-mdast)
[![License](https://img.shields.io/github/license/slune-org/ts-mdast.svg)](https://github.com/slune-org/ts-mdast/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/slune-org/ts-mdast.svg?branch=master)](https://travis-ci.org/slune-org/ts-mdast)
[![Coverage Status](https://coveralls.io/repos/github/slune-org/ts-mdast/badge.svg?branch=master)](https://coveralls.io/github/slune-org/ts-mdast?branch=master)
[![Issues](https://img.shields.io/github/issues/slune-org/ts-mdast.svg)](https://github.com/slune-org/ts-mdast/issues)

# ts-mdast - Typescript utilities for Markdown Abstract Syntax Tree

This package provides utilities to work with `Markdown` abstract syntax tree (_MDAST_). It contains:

- functions to create the different node types (also useful in pure _Javascript_);
- type guard and assertion functions to ensure the node is of expected type (especially useful with _Typescript_).

This package also re-export all types of `@types/mdast` and type of `@types/unist` which are useful for `Markdown`. It is therefore not necessary to include those packages if you are using this one.

# Language/langue

Documents, messages, code (including variable names and comments), are in English.

Anyway, because Slune is French firm, all documents and important messages must also be provided in French. Other translations are welcome.

:fr: Une version française de ce document se trouve [ici](doc/fr/README.md).

# Installation

Installation is done using `npm install` command:

```bash
$ npm install --save ts-mdast
```

# Usage

For each _NodeType_ node type, the package contains :

- an `assertNodeType(node: Node)` function raising an exception if `node` is not of type *NodeType* ;
- an `isNodeType(node: Node)` function returning `true` if `node` is of type *NodeType* ;
- a `createNodeType(...)` function creating a node of type _NodeType_.

The first two functions are understood by _Typescript_ which is after able to control the node type in an appropriate way.

The creation function is used this as following:

    createNodeType(mandatory1, mandatory2 [, optional1 [, optional2 [, optional3]] | {optional1, optional2, optional3}] [, children])

where `mandatory_` represent the mandatory parameters, `optional_` the optional parameters and `children` an array with child nodes. Following calls are therefore possible:

```typescript
createNodeType(mandatory1, mandatory2, optional1, [child1, child2])
createNodeType(mandatory1, mandatory2, optional1, optional2)
createNodeType(mandatory1, mandatory2, { optional1, optional3 })
createNodeType(mandatory1, mandatory2, { optional2, optional3 }, [child1, child2])
createNodeType(mandatory1, mandatory2, [child1, child2])
```

The array containing children is directly used in the node and can therefore be modified after node creation:

```typescript
const children: Content[] = []
createNodeType(mandatory1, mandatory2, children)
children.push(createNodeType(mandatory1, mandatory2))
```

**Notes:**

- The `createNodeType(...)` function only exists for concrete nodes (not on `Content` nor `BlockContent` for example).
- All node types do not have mandatory parameters, optional parameters or child nodes.

## Nodes

### Parent

Reference: [Parent](https://github.com/syntax-tree/mdast#parent)

TODO

### Literal

Reference: [Literal](https://github.com/syntax-tree/mdast#literal)

TODO

### Root

Reference: [Root](https://github.com/syntax-tree/mdast#root)

Type assertion:

```typescript
function assertRoot(node: Node): asserts node is Root
```

Type guard:

```typescript
function isRoot(node: Node): node is Root
```

Creation:

```typescript
function createRoot(children?: Content[]): Root
```

### Paragraph

Reference: [Paragraph](https://github.com/syntax-tree/mdast#paragraph)

Type assertion:

```typescript
function assertParagraph(node: Node): asserts node is Paragraph
```

Type guard:

```typescript
function isParagraph(node: Node): node is Paragraph
```

Creation:

```typescript
function createParagraph(children?: PhrasingContent[]): Paragraph
```

### Heading

Reference: [Heading](https://github.com/syntax-tree/mdast#heading)

Type assertion:

```typescript
function assertHeading(node: Node): asserts node is Heading
```

Type guard:

```typescript
function isHeading(node: Node): node is Heading
```

Creation:

```typescript
function createHeading(depth: 1 | 2 | 3 | 4 | 5 | 6, children?: PhrasingContent[])
```

### ThematicBreak

Reference: [ThematicBreak](https://github.com/syntax-tree/mdast#thematicbreak)

Type assertion:

```typescript
function assertThematicBreak(node: Node): asserts node is ThematicBreak
```

Type guard:

```typescript
function isThematicBreak(node: Node): node is ThematicBreak
```

Creation:

```typescript
function createThematicBreak(): ThematicBreak
```

### Blockquote

Reference: [Blockquote](https://github.com/syntax-tree/mdast#blockquote)

Type assertion:

```typescript
function assertBlockquote(node: Node): asserts node is Blockquote
```

Type guard:

```typescript
function isBlockquote(node: Node): node is Blockquote
```

Creation:

```typescript
function createBlockquote(children?: BlockContent[]): Blockquote
```

### List

Reference: [List](https://github.com/syntax-tree/mdast#list)

Type assertion:

```typescript
function assertList(node: Node): asserts node is List
```

Type guard:

```typescript
function isList(node: Node): node is List
```

Creation:

```typescript
function createList(ordered: boolean, start: number, spread: boolean, children?: ListContent[]): List
function createList(ordered: boolean, start: number, children?: ListContent[]): List
function createList(ordered: boolean, children?: ListContent[]): List
function createList(children?: ListContent[]): List
function createList(
  options: { ordered?: boolean; start?: number; spread?: boolean },
  children?: ListContent[]
): List
```

### ListItem

Reference: [ListItem](https://github.com/syntax-tree/mdast#listitem)

Type assertion:

```typescript
function assertListItem(node: Node): asserts node is ListItem
```

Type guard:

```typescript
function isListItem(node: Node): node is ListItem
```

Creation:

```typescript
function createListItem(checked: boolean, spread: boolean, children?: BlockContent[]): ListItem
function createListItem(checked: boolean, children?: BlockContent[]): ListItem
function createListItem(children?: BlockContent[]): ListItem
function createListItem(
  options: { checked?: boolean; spread?: boolean },
  children?: BlockContent[]
): ListItem
```

### Table

Reference: [Table](https://github.com/syntax-tree/mdast#table)

Type assertion:

```typescript
function assertTable(node: Node): asserts node is Table
```

Type guard:

```typescript
function isTable(node: Node): node is Table
```

Creation:

```typescript
function createTable(align: AlignType[], children?: TableContent[]): Table
function createTable(children?: TableContent[]): Table
function createTable(options: { align?: AlignType[] }, children?: TableContent[]): Table
```

### TableRow

Reference: [TableRow](https://github.com/syntax-tree/mdast#tablerow)

Type assertion:

```typescript
function assertTableRow(node: Node): asserts node is TableRow
```

Type guard:

```typescript
function isTableRow(node: Node): node is TableRow
```

Creation:

```typescript
function createTableRow(children?: RowContent[]): TableRow
```

### TableCell

Reference: [TableCell](https://github.com/syntax-tree/mdast#tablecell)

Type assertion:

```typescript
function assertTableCell(node: Node): asserts node is TableCell
```

Type guard:

```typescript
function isTableCell(node: Node): node is TableCell
```

Creation:

```typescript
function createTableCell(children?: PhrasingContent[]): TableCell
```

### HTML

Reference: [HTML](https://github.com/syntax-tree/mdast#html)

Type assertion:

```typescript
function assertHTML(node: Node): asserts node is HTML
```

Type guard:

```typescript
function isHTML(node: Node): node is HTML
```

Creation:

```typescript
function createHTML(value: string): HTML
```

### Code

Reference: [Code](https://github.com/syntax-tree/mdast#code)

Type assertion:

```typescript
function assertCode(node: Node): asserts node is Code
```

Type guard:

```typescript
function isCode(node: Node): node is Code
```

Creation:

```typescript
function createCode(value: string, lang?: string, meta?: string): Code
function createCode(value: string, options: { lang?: string; meta?: string }): Code
```

### YAML

Reference: [YAML](https://github.com/syntax-tree/mdast#yaml)

Type assertion:

```typescript
function assertYAML(node: Node): asserts node is YAML
```

Type guard:

```typescript
function isYAML(node: Node): node is YAML
```

Creation:

```typescript
function createYAML(value: string): YAML
```

### Definition

Reference: [Definition](https://github.com/syntax-tree/mdast#definition)

Type assertion:

```typescript
function assertDefinition(node: Node): asserts node is Definition
```

Type guard:

```typescript
function isDefinition(node: Node): node is Definition
```

Creation:

```typescript
function createDefinition(identifier: string, url: string, label?: string, title?: string): Definition
function createDefinition(
  identifier: string,
  url: string,
  options: { label?: string; title?: string }
): Definition
```

### FootnoteDefinition

Reference: [FootnoteDefinition](https://github.com/syntax-tree/mdast#footnotedefinition)

Type assertion:

```typescript
function assertFootnoteDefinition(node: Node): asserts node is FootnoteDefinition
```

Type guard:

```typescript
function isFootnoteDefinition(node: Node): node is FootnoteDefinition
```

Creation:

```typescript
function createFootnoteDefinition(
  identifier: string,
  label: string,
  children?: BlockContent[]
): FootnoteDefinition
function createFootnoteDefinition(identifier: string, children?: BlockContent[]): FootnoteDefinition
function createFootnoteDefinition(
  identifier: string,
  options: { label?: string },
  children?: BlockContent[]
): FootnoteDefinition
```

# Contributing

Even though we cannot guarantee a response time, please feel free to file an issue if you have any question or problem using the package.

_Pull Requests_ are welcome. You can, of course, submit corrections or improvements for code, but do not hesitate to also improve documentation, even for small spell or grammar errors.
