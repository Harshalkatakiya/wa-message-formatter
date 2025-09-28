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

| HTML Tags                                    | WhatsApp Format | Example Output    |
| -------------------------------------------- | --------------- | ----------------- |
| `<strong>`, `<b>`                            | `*text*`        | **bold text**     |
| `<em>`, `<i>`, `<u>`                         | `_text_`        | _italic text_     |
| `<s>`, `<strike>`, `<del>`                   | `~text~`        | ~~strikethrough~~ |
| `<code>`, `<kbd>`, `<samp>`, `<var>`, `<tt>` | `` `text` ``    | `monospace`       |
| `<pre>`                                      | ` ```text``` `  | `code block`      |
| `<blockquote>`, `<q>`, `<cite>`              | `> text`        | > quoted text     |
| `<ul><li>`                                   | `- item`        | • bulleted list   |
| `<ol><li>`                                   | `1. item`       | 1. numbered list  |
| `<h1>` to `<h6>`                             | `*text*`        | **heading**       |
| `<br>`, `<hr>`                               | Line breaks     |                   |
| `<mark>`                                     | `*text*`        | **highlighted**   |

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

### Complex Examples

```javascript
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
```

## API Reference

### `WAMessageFormatter(html: string): string`

Converts HTML string to WhatsApp formatted text.

**Parameters:**

- `html` (string): The HTML string to convert

**Returns:**

- `string`: WhatsApp formatted text

**Throws:**

- Returns empty string for invalid input or parsing errors

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
- Full WhatsApp formatting support
- TypeScript definitions
- Comprehensive test suite
- Performance optimizations

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Related

- [WhatsApp Message Formatting Guide](https://faq.whatsapp.com/539178204879377/?cms_platform=web)

---

Made with ❤️ by [Harshal Katakiya](https://github.com/Harshalkatakiya)
