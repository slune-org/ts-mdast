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

# Contribuer

Bien que nous ne puissions pas garantir un temps de réponse, n’hésitez pas à ouvrir un incident si vous avez une question ou un problème pour utiliser ce paquet.

Les _Pull Requests_ sont bienvenues. Vous pouvez bien sûr soumettre des corrections ou améliorations de code, mais n’hésitez pas également à améliorer la documentation, même pour de petites fautes d’orthographe ou de grammaire.
