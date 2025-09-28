import { DataNode, Element as H2Element, Node as H2Node, isTag, isText } from 'domhandler';
import { parseDocument } from 'htmlparser2';

const wrapInline = (marker: string, inner: string): string =>
  inner ? `${marker}${inner}${marker}` : '';

const REGEX_CACHE = {
  multipleNewlines: /\n{3,}/g,
  trailingWhitespace: /[ \t]+$/gm,
  whitespaceNewline: /\s+\n/g,
  leadingTrailingNewlines: /^\n+|\n+$/g
} as const;

const collapseInner = (text: string): string =>
  text.replace(REGEX_CACHE.whitespaceNewline, '\n').replace(REGEX_CACHE.multipleNewlines, '\n\n');

const trimLines = (text: string): string =>
  text.replace(REGEX_CACHE.trailingWhitespace, '');

function traverseH2(node: H2Node): string {
  if (!node) return '';
  if (isText(node)) {
    return (node as DataNode).data;
  }
  if (isTag(node)) {
    const el = node as H2Element;
    const tag = el.name;
    if (!el.children || el.children.length === 0) {
      return tag === 'br' ? '\n' : '';
    }
    const inner = el.children.map(traverseH2).join('');
    switch (tag) {
      case 'strong':
      case 'b':
        return wrapInline('*', inner);
      case 'em':
      case 'i':
      case 'u':
        return wrapInline('_', inner);
      case 's':
      case 'strike':
      case 'del':
        return wrapInline('~', inner);
      case 'code':
      case 'kbd':
      case 'samp':
      case 'var':
      case 'tt':
        return inner ? `\`${inner}\`` : '';
      case 'pre':
        return inner ? `\`\`\`\n${inner.replace(REGEX_CACHE.leadingTrailingNewlines, '')}\n\`\`\`` : '';
      case 'mark':
        return wrapInline('*', inner);
      case 'blockquote':
      case 'q':
      case 'cite':
        if (!inner) return '';
        return inner
          .split('\n')
          .map((line: string) => {
            const trimmedLine = line.trim();
            return trimmedLine ? `> ${trimmedLine}` : '>';
          })
          .join('\n');
      case 'ul':
        return el.children
          .filter((c: H2Node) => isTag(c) && (c as H2Element).name === 'li')
          .map((li: H2Node) => {
            const txt = traverseH2(li).trim();
            return txt ? `- ${txt}` : '';
          })
          .join('\n');
      case 'ol':
        return el.children
          .filter((c: H2Node) => isTag(c) && (c as H2Element).name === 'li')
          .map((li: H2Node, idx: number) => {
            const txt = traverseH2(li).trim();
            return txt ? `${idx + 1}. ${txt}` : '';
          })
          .join('\n');
      case 'li':
        return inner;
      case 'dl':
        return inner ? `${inner}\n` : '';
      case 'dt':
        return inner ? `*${inner}*\n` : '';
      case 'dd':
        return inner ? `- ${inner}\n` : '';
      case 'br':
        return '\n';
      case 'hr':
        return '\n---\n';
      case 'p':
      case 'div':
      case 'section':
      case 'article':
        const trimmed = collapseInner(inner).trim();
        return trimmed ? `${trimmed}\n\n` : '';
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return inner ? `*${inner}*\n\n` : '';
      case 'address':
        return inner ? `${inner}\n\n` : '';
      case 'table':
        return `\n${inner}\n`;
      case 'thead':
      case 'tbody':
      case 'tfoot':
        return inner;
      case 'tr':
        return `${inner}\n`;
      case 'th':
        return wrapInline('*', inner) + '\t';
      case 'td':
        return inner + '\t';
      case 'script':
      case 'style':
      case 'meta':
      case 'link':
      case 'head':
      case 'title':
      case 'img':
        return '';
      case 'abbr':
        return inner;
      case 'small':
        return inner;
      case 'sup':
        return `^${inner}`;
      case 'sub':
        return `_${inner}`;
      case 'ins':
        return wrapInline('_', inner);
      case 'time':
        return inner;
      case 'a':
        return inner;
      default:
        return inner;
    }
  }
  return '';
}

export function WAMessageFormatter(html: string): string {
  if (!html || typeof html !== 'string') return '';
  const trimmedHtml = html.trim();
  if (!trimmedHtml) return '';
  try {
    const dom = parseDocument(trimmedHtml, {
      lowerCaseTags: false,
      withStartIndices: false,
      withEndIndices: false
    });
    const results = dom.children.map(traverseH2).filter(Boolean);
    if (results.length === 0) return '';
    const output = results.join('');
    return trimLines(output)
      .replace(REGEX_CACHE.multipleNewlines, '\n\n')
      .replace(/^[ \t\r]+|[ \t\r]+$/g, '');
  } catch (error) {
    console.warn('WAMessageFormatter: Error parsing HTML:', error);
    return '';
  }
}

export default WAMessageFormatter;