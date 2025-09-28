# WhatsApp Message Formatter

[![npm version](https://badge.fury.io/js/wa-message-formatter.svg)](https://badge.fury.io/js/wa-message-formatter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A fast and efficient npm package that converts HTML to WhatsApp's formatted message text while preserving formatting such as `Bold`, `Italic`, `Strikethrough`, `Monospace`, `Bulleted lists`, `Numbered lists`, `Quote`, `Inline code` and more.

## Features

- 🚀 **Fast & Efficient**: Optimized for performance with minimal overhead
- 📝 **Complete WhatsApp Formatting**: Supports all WhatsApp text formatting options. [Read WhatsApp's Message Formatting Guide](https://faq.whatsapp.com/539178204879377/?cms_platform=web)
- 🔧 **TypeScript Support**: Fully typed with comprehensive TypeScript definitions
- 🔄 **Nested Formatting**: Handles complex nested HTML structures
- 🛡️ **Error Handling**: Graceful error handling for malformed HTML

## Installation

```bash
npm install wa-message-formatter
```

or

```bash
bun add wa-message-formatter
```

or

```bash
pnpm add wa-message-formatter
```

## Quick Start

```javascript
import WAMessageFormatter from "wa-message-formatter";

const html = "<strong>Hello</strong> <em>World</em>!";
const formatted = WAMessageFormatter(html);
console.log(formatted); // Output: *Hello* _World_!
```

## Supported HTML Tags and WhatsApp Formatting

This package supports a comprehensive set of HTML tags and converts them to appropriate WhatsApp formatting:

### Text Formatting

| HTML Tags                  | WhatsApp Format | Example Output    | Description                                  |
| -------------------------- | --------------- | ----------------- | -------------------------------------------- |
| `<strong>`, `<b>`          | `*text*`        | **bold text**     | Bold formatting                              |
| `<em>`, `<i>`, `<u>`       | `_text_`        | _italic text_     | Italic formatting (underline maps to italic) |
| `<s>`, `<strike>`, `<del>` | `~text~`        | ~~strikethrough~~ | Strikethrough formatting                     |
| `<ins>`                    | `_text_`        | _inserted text_   | Inserted text (maps to italic)               |
| `<mark>`                   | `*text*`        | **highlighted**   | Highlighted text (maps to bold)              |

### Code Formatting

| HTML Tags                                    | WhatsApp Format | Example Output | Description           |
| -------------------------------------------- | --------------- | -------------- | --------------------- |
| `<code>`, `<kbd>`, `<samp>`, `<var>`, `<tt>` | `` `text` ``    | `monospace`    | Inline code/monospace |
| `<pre>`                                      | ` ```text``` `  | `code block`   | Code blocks           |

### Block Elements

| HTML Tags                                | WhatsApp Format   | Example Output | Description                            |
| ---------------------------------------- | ----------------- | -------------- | -------------------------------------- |
| `<p>`, `<div>`, `<section>`, `<article>` | Text with spacing | Paragraph text | Block containers with paragraph breaks |
| `<h1>` to `<h6>`                         | `*text*`          | **heading**    | All headings map to bold               |
| `<address>`                              | Text with spacing | Address text   | Address blocks                         |

### List Elements

| HTML Tags              | WhatsApp Format         | Example Output        | Description      |
| ---------------------- | ----------------------- | --------------------- | ---------------- |
| `<ul><li>`             | `- item`                | • bulleted list       | Unordered lists  |
| `<ol><li>`             | `1. item`               | 1. numbered list      | Ordered lists    |
| `<dl>`, `<dt>`, `<dd>` | `*term*` `- definition` | **term** - definition | Definition lists |

### Quote Elements

| HTML Tags                       | WhatsApp Format | Example Output | Description      |
| ------------------------------- | --------------- | -------------- | ---------------- |
| `<blockquote>`, `<q>`, `<cite>` | `> text`        | > quoted text  | Quote formatting |

### Line Breaks & Layout

| HTML Tags | WhatsApp Format | Example Output | Description       |
| --------- | --------------- | -------------- | ----------------- |
| `<br>`    | `\n`            | Line break     | Single line break |
| `<hr>`    | `\n---\n`       | ---            | Horizontal rule   |

### Table Elements

| HTML Tags                                  | WhatsApp Format     | Example Output | Description          |
| ------------------------------------------ | ------------------- | -------------- | -------------------- |
| `<table>`, `<thead>`, `<tbody>`, `<tfoot>` | Structured text     | Table content  | Basic table support  |
| `<tr>`                                     | Row with line break | Row content    | Table rows           |
| `<th>`                                     | `*text*` + tab      | **header**     | Table headers (bold) |
| `<td>`                                     | Text + tab          | Cell content   | Table cells          |

### Special Elements

| HTML Tags                     | WhatsApp Format | Example Output   | Description                         |
| ----------------------------- | --------------- | ---------------- | ----------------------------------- |
| `<sup>`                       | `^text`         | text^superscript | Superscript                         |
| `<sub>`                       | `_text`         | text_subscript   | Subscript                           |
| `<abbr>`, `<small>`, `<time>` | `text`          | Plain text       | Preserves text content              |
| `<a>`                         | `text`          | Link text        | Links (URL removed, text preserved) |

### Ignored Elements

These elements are completely removed from the output:

- `<script>`, `<style>` - Scripts and styles
- `<meta>`, `<link>`, `<head>`, `<title>` - Metadata elements
- `<img>` - Images (WhatsApp doesn't support inline images in text)

## Usage Examples

### Basic Formatting

```javascript
import WAMessageFormatter from "wa-message-formatter";

// Bold text
WAMessageFormatter("<strong>Important message</strong>");
// Output: *Important message*

// Italic text
WAMessageFormatter("<em>Emphasized text</em>");
// Output: _Emphasized text_

// Strikethrough
WAMessageFormatter("<s>Deleted text</s>");
// Output: ~Deleted text~

// Inline code
WAMessageFormatter('<code>console.log("Hello")</code>');
// Output: `console.log("Hello")`
```

### Nested Formatting

```javascript
// Bold + Italic
WAMessageFormatter("<strong><em>Bold and italic</em></strong>");
// Output: *_Bold and italic_*

// Complex nesting
WAMessageFormatter("<strong>Bold <em>with italic</em> text</strong>");
// Output: *Bold _with italic_ text*
```

### Lists

```javascript
// Unordered list
const ul = `
<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
`;
WAMessageFormatter(ul);
// Output:
// - First item
// - Second item
// - Third item

// Ordered list
const ol = `
<ol>
  <li>Step one</li>
  <li>Step two</li>
  <li>Step three</li>
</ol>
`;
WAMessageFormatter(ol);
// Output:
// 1. Step one
// 2. Step two
// 3. Step three
```

### Quotes

```javascript
// Blockquote
WAMessageFormatter("<blockquote>This is a quoted message</blockquote>");
// Output: > This is a quoted message

// Multi-line quote
const quote = `
<blockquote>
  Line one of the quote<br>
  Line two of the quote
</blockquote>
`;
WAMessageFormatter(quote);
// Output:
// > Line one of the quote
// > Line two of the quote
```

### Code Blocks

````javascript
// Code block
const code = `
<pre>
function hello() {
  console.log("Hello World!");
}
</pre>
`;
WAMessageFormatter(code);
// Output:
// ```
// function hello() {
//   console.log("Hello World!");
// }
// ```
````

### Table Formatting

```javascript
// Simple table
const table = `
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John</td>
      <td>30</td>
      <td>Developer</td>
    </tr>
    <tr>
      <td>Jane</td>
      <td>25</td>
      <td>Designer</td>
    </tr>
  </tbody>
</table>
`;
WAMessageFormatter(table);
// Output:
// *Name*  *Age*  *Role*
// John    30     Developer
// Jane    25     Designer
```

### Special Text Elements

```javascript
// Superscript and subscript
WAMessageFormatter("E = mc<sup>2</sup> and H<sub>2</sub>O");
// Output: E = mc^2 and H_2O

// Definition lists
const definition = `
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
  <dt>CSS</dt>
  <dd>Cascading Style Sheets</dd>
</dl>
`;
WAMessageFormatter(definition);
// Output:
// *HTML*
// - HyperText Markup Language
// *CSS*
// - Cascading Style Sheets
```

### Complex Examples

````javascript
// Email-like content
const email = `
<div>
  <p><strong>Subject:</strong> Meeting Reminder</p>
  <p><em>From:</em> john@example.com</p>
  <blockquote>
    <p>Hi team,</p>
    <p>Don't forget our meeting at <strong>2 PM</strong>.</p>
    <p>Agenda:</p>
    <ol>
      <li>Project updates</li>
      <li>Budget review</li>
      <li>Next steps</li>
    </ol>
  </blockquote>
</div>
`;

console.log(WAMessageFormatter(email));
// Output:
// *Subject:* Meeting Reminder
//
// _From:_ john@example.com
//
// > Hi team,
// >
// > Don't forget our meeting at *2 PM*.
// >
// > Agenda:
// >
// > 1. Project updates
// > 2. Budget review
// > 3. Next steps

// Mixed content with all features
const mixed = `
<div>
  <h2>Project Report</h2>
  <p>Status: <mark>In Progress</mark></p>
  <p>Formula: E = mc<sup>2</sup></p>
  <p>Chemical: H<sub>2</sub>O</p>
  <hr>
  <blockquote>
    <p>Progress has been <strong>excellent</strong> this week!</p>
  </blockquote>
  <pre>
function calculate() {
  return 42;
}
  </pre>
</div>
`;

console.log(WAMessageFormatter(mixed));
// Output:
// *Project Report*
//
// Status: *In Progress*
//
// Formula: E = mc^2
//
// Chemical: H_2O
//
// ---
//
// > Progress has been *excellent* this week!
//
// ```
// function calculate() {
//   return 42;
// }
// ```
````

## API Reference

### `WAMessageFormatter(html: string): string`

Converts HTML string to WhatsApp formatted text.

**Parameters:**

- `html` (string): The HTML string to convert

**Returns:**

- `string`: WhatsApp formatted text

**Throws:**

- Returns empty string for invalid input or parsing errors

### Exports

The module provides both default and named exports:

```javascript
// ES6 import (default export)
import WAMessageFormatter from "wa-message-formatter";

// ES6 import (named export)
import { WAMessageFormatter } from "wa-message-formatter";

// CommonJS require
const WAMessageFormatter = require("wa-message-formatter").default;
// or
const { WAMessageFormatter } = require("wa-message-formatter");
```

## TypeScript Support

This package includes comprehensive TypeScript definitions:

```typescript
import WAMessageFormatter from "wa-message-formatter";

const html: string = "<strong>Hello World</strong>";
const result: string = WAMessageFormatter(html);
```

## Error Handling

The formatter gracefully handles various edge cases:

- **Invalid HTML**: Malformed HTML is parsed as best as possible
- **Empty input**: Returns empty string for null, undefined, or empty input
- **Unsupported tags**: Ignores unknown tags while preserving content
- **Script/Style tags**: Completely removes `<script>` and `<style>` content
- **Images**: Ignores `<img>` tags (WhatsApp doesn't support inline images in text)

## Performance

- ⚡ **Optimized parsing**: Uses efficient HTML parsing
- 🔄 **Minimal string operations**: Reduces unnecessary string concatenations
- 💾 **Regex caching**: Pre-compiled regex patterns for better performance
- 📈 **Scalable**: Handles large documents efficiently

## Browser Compatibility

This package is designed for both browser and Node.js environments.

## Changelog

### 0.0.1

- Initial release
- Full WhatsApp formatting support with comprehensive HTML tag coverage
- TypeScript definitions with strict type safety
- Support for nested formatting combinations
- Table formatting support
- Special elements (superscript, subscript, definitions)
- Performance optimizations with regex caching
- Comprehensive test suite with edge case handling
- Graceful error handling for malformed HTML
- Both ES6 and CommonJS export support

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Related

- [WhatsApp Message Formatting Guide](https://faq.whatsapp.com/539178204879377/?cms_platform=web)

---

Made with ❤️ by [Harshal Katakiya](https://github.com/Harshalkatakiya)
