# ts-mdast - Outils Typescript pour arbres syntaxiques abstraits Markdown

Ce paquet fourni des outils pour travailler avec des arbres syntaxiques abstraits de type `Markdown` (_MDAST_). Il contient :

- des fonctions pour créer les différents types de nœuds (également utiles en pure _Javascript_) ;
- des fonctions de contrôle de type et assertions pour garantir que le nœud est bien du type escompté (surtout utiles avec _Typescript_).

Ce paquet ré-exporte également tous les types de `@types/mdast` et les quelques types de `@types/unist` utiles pour `Markdown`. Il n'est donc pas nécessaire d'inclure ces paquets si vous utilisez celui-ci.

# Langue

Les documents et messages, le code (y compris les noms de variable et commentaires), sont en anglais.

Cependant, Slune étant une entreprise française, tous les documents et messages importants doivent également être fournis en français. Les autres traductions sont bienvenues.

# Installation

L’installation se fait avec la commande `npm install` :

```bash
$ npm install --save ts-mdast
```

# Utilisation

Pour chaque type de nœud _NodeType_, le paquet contient :

- une fonction `assertNodeType(node: Node)` qui lève une exception si `node` n'est pas de type *NodeType* ;
- une fonction `isNodeType(node: Node)` qui renvoie `true` si `node` est de type *NodeType* ;
- une fonction `createNodeType(...)` qui crée un nœud de type _NodeType_.

Les deux premières fonctions sont comprises par _Typescript_ qui est donc capable par la suite de contrôler le type de nœud de façon appropriée.

La fonction de création s'utilise ainsi :

    createNodeType(mandatory1, mandatory2 [, optional1 [, optional2 [, optional3]] | {optional1, optional2, optional3}] [, children])

où `mandatory_` représentent les paramètres obligatoires, `optional_` les paramètres optionnels et `children` un tableau avec les nœuds fils. Les appels suivants sont donc possibles :

```typescript
createNodeType(mandatory1, mandatory2, optional1, [child1, child2])
createNodeType(mandatory1, mandatory2, optional1, optional2)
createNodeType(mandatory1, mandatory2, { optional1, optional3 })
createNodeType(mandatory1, mandatory2, { optional2, optional3 }, [child1, child2])
createNodeType(mandatory1, mandatory2, [child1, child2])
```

Le tableau contenant les fils est utilisé directement dans le nœud et peut donc être modifié après la création du nœud :

```typescript
const children: Content[] = []
createNodeType(mandatory1, mandatory2, children)
children.push(createNodeType(mandatory1, mandatory2))
```

**Notes :**

- La fonction `createNodeType(...)` n'existe que sur les nœuds concrêts (pas sur `Content` ni sur `BlockContent` par exemple).
- Tous les types de nœud n'ont pas forcément de paramètres obligatoires, de paramètres optionnels ou de nœuds fils.

## Nœuds

### Parent

Référence : [Parent](https://github.com/syntax-tree/mdast#parent)

TODO

### Literal

Référence : [Literal](https://github.com/syntax-tree/mdast#literal)

TODO

### Root

Référence : [Root](https://github.com/syntax-tree/mdast#root)

Assertion de type :

```typescript
function assertRoot(node: Node): asserts node is Root
```

Contrôle de type :

```typescript
function isRoot(node: Node): node is Root
```

Création :

```typescript
function createRoot(children?: Content[]): Root
```

### Paragraph

Référence : [Paragraph](https://github.com/syntax-tree/mdast#paragraph)

Assertion de type :

```typescript
function assertParagraph(node: Node): asserts node is Paragraph
```

Contrôle de type :

```typescript
function isParagraph(node: Node): node is Paragraph
```

Création :

```typescript
function createParagraph(children?: PhrasingContent[]): Paragraph
```

### Heading

Référence : [Heading](https://github.com/syntax-tree/mdast#heading)

Assertion de type :

```typescript
function assertHeading(node: Node): asserts node is Heading
```

Contrôle de type :

```typescript
function isHeading(node: Node): node is Heading
```

Création :

```typescript
function createHeading(depth: 1 | 2 | 3 | 4 | 5 | 6, children?: PhrasingContent[])
```

### ThematicBreak

Référence : [ThematicBreak](https://github.com/syntax-tree/mdast#thematicbreak)

Assertion de type :

```typescript
function assertThematicBreak(node: Node): asserts node is ThematicBreak
```

Contrôle de type :

```typescript
function isThematicBreak(node: Node): node is ThematicBreak
```

Création :

```typescript
function createThematicBreak(): ThematicBreak
```

### Blockquote

Référence : [Blockquote](https://github.com/syntax-tree/mdast#blockquote)

Assertion de type :

```typescript
function assertBlockquote(node: Node): asserts node is Blockquote
```

Contrôle de type :

```typescript
function isBlockquote(node: Node): node is Blockquote
```

Création :

```typescript
function createBlockquote(children?: BlockContent[]): Blockquote
```

### List

Référence : [List](https://github.com/syntax-tree/mdast#list)

Assertion de type :

```typescript
function assertList(node: Node): asserts node is List
```

Contrôle de type :

```typescript
function isList(node: Node): node is List
```

Création :

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

Référence : [ListItem](https://github.com/syntax-tree/mdast#listitem)

Assertion de type :

```typescript
function assertListItem(node: Node): asserts node is ListItem
```

Contrôle de type :

```typescript
function isListItem(node: Node): node is ListItem
```

Création :

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

Référence : [Table](https://github.com/syntax-tree/mdast#table)

Assertion de type :

```typescript
function assertTable(node: Node): asserts node is Table
```

Contrôle de type :

```typescript
function isTable(node: Node): node is Table
```

Création :

```typescript
function createTable(align: AlignType[], children?: TableContent[]): Table
function createTable(children?: TableContent[]): Table
function createTable(options: { align?: AlignType[] }, children?: TableContent[]): Table
```

### TableRow

Référence : [TableRow](https://github.com/syntax-tree/mdast#tablerow)

Assertion de type :

```typescript
function assertTableRow(node: Node): asserts node is TableRow
```

Contrôle de type :

```typescript
function isTableRow(node: Node): node is TableRow
```

Création :

```typescript
function createTableRow(children?: RowContent[]): TableRow
```

### TableCell

Référence : [TableCell](https://github.com/syntax-tree/mdast#tablecell)

Assertion de type :

```typescript
function assertTableCell(node: Node): asserts node is TableCell
```

Contrôle de type :

```typescript
function isTableCell(node: Node): node is TableCell
```

Création :

```typescript
function createTableCell(children?: PhrasingContent[]): TableCell
```

### HTML

Référence : [HTML](https://github.com/syntax-tree/mdast#html)

Assertion de type :

```typescript
function assertHTML(node: Node): asserts node is HTML
```

Contrôle de type :

```typescript
function isHTML(node: Node): node is HTML
```

Création :

```typescript
function createHTML(value: string): HTML
```

### Code

Référence : [Code](https://github.com/syntax-tree/mdast#code)

Assertion de type :

```typescript
function assertCode(node: Node): asserts node is Code
```

Contrôle de type :

```typescript
function isCode(node: Node): node is Code
```

Création :

```typescript
function createCode(value: string, lang?: string, meta?: string): Code
function createCode(value: string, options: { lang?: string; meta?: string }): Code
```

### YAML

Référence : [YAML](https://github.com/syntax-tree/mdast#yaml)

Assertion de type :

```typescript
function assertYAML(node: Node): asserts node is YAML
```

Contrôle de type :

```typescript
function isYAML(node: Node): node is YAML
```

Création :

```typescript
function createYAML(value: string): YAML
```

### Definition

Référence : [Definition](https://github.com/syntax-tree/mdast#definition)

Assertion de type :

```typescript
function assertDefinition(node: Node): asserts node is Definition
```

Contrôle de type :

```typescript
function isDefinition(node: Node): node is Definition
```

Création :

```typescript
function createDefinition(identifier: string, url: string, label?: string, title?: string): Definition
function createDefinition(
  identifier: string,
  url: string,
  options: { label?: string; title?: string }
): Definition
```

### FootnoteDefinition

Référence : [FootnoteDefinition](https://github.com/syntax-tree/mdast#footnotedefinition)

Assertion de type :

```typescript
function assertFootnoteDefinition(node: Node): asserts node is FootnoteDefinition
```

Contrôle de type :

```typescript
function isFootnoteDefinition(node: Node): node is FootnoteDefinition
```

Création :

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

### Text

Référence : [Text](https://github.com/syntax-tree/mdast#text)

Assertion de type :

```typescript
function assertText(node: Node): asserts node is Text
```

Contrôle de type :

```typescript
function isText(node: Node): node is Text
```

Création :

```typescript
function createText(value: string): Text
```

### Emphasis

Référence : [Emphasis](https://github.com/syntax-tree/mdast#emphasis)

Assertion de type :

```typescript
function assertEmphasis(node: Node): asserts node is Emphasis
```

Contrôle de type :

```typescript
function isEmphasis(node: Node): node is Emphasis
```

Création :

```typescript
function createEmphasis(children?: PhrasingContent[]): Emphasis
```

### Strong

Référence : [Strong](https://github.com/syntax-tree/mdast#strong)

Assertion de type :

```typescript
function assertStrong(node: Node): asserts node is Strong
```

Contrôle de type :

```typescript
function isStrong(node: Node): node is Strong
```

Création :

```typescript
function createStrong(children?: PhrasingContent[]): Strong
```

### Delete

Référence : [Delete](https://github.com/syntax-tree/mdast#delete)

Assertion de type :

```typescript
function assertDelete(node: Node): asserts node is Delete
```

Contrôle de type :

```typescript
function isDelete(node: Node): node is Delete
```

Création :

```typescript
function createDelete(children?: PhrasingContent[]): Delete
```

# Contribuer

Bien que nous ne puissions pas garantir un temps de réponse, n’hésitez pas à ouvrir un incident si vous avez une question ou un problème pour utiliser ce paquet.

Les _Pull Requests_ sont bienvenues. Vous pouvez bien sûr soumettre des corrections ou améliorations de code, mais n’hésitez pas également à améliorer la documentation, même pour de petites fautes d’orthographe ou de grammaire.
