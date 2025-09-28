import WAMessageFormatter from '../src/index';

describe('WAMessageFormatter', () => {
    describe('Basic Formatting', () => {
        test('should handle bold text', () => {
            expect(WAMessageFormatter('<strong>bold text</strong>')).toBe('*bold text*');
            expect(WAMessageFormatter('<b>bold text</b>')).toBe('*bold text*');
        });

        test('should handle italic text', () => {
            expect(WAMessageFormatter('<em>italic text</em>')).toBe('_italic text_');
            expect(WAMessageFormatter('<i>italic text</i>')).toBe('_italic text_');
            expect(WAMessageFormatter('<u>underlined text</u>')).toBe('_underlined text_');
        });

        test('should handle strikethrough text', () => {
            expect(WAMessageFormatter('<s>strikethrough</s>')).toBe('~strikethrough~');
            expect(WAMessageFormatter('<strike>strikethrough</strike>')).toBe('~strikethrough~');
            expect(WAMessageFormatter('<del>deleted text</del>')).toBe('~deleted text~');
        });

        test('should handle inline code', () => {
            expect(WAMessageFormatter('<code>inline code</code>')).toBe('`inline code`');
            expect(WAMessageFormatter('<kbd>keyboard</kbd>')).toBe('`keyboard`');
            expect(WAMessageFormatter('<samp>sample</samp>')).toBe('`sample`');
            expect(WAMessageFormatter('<var>variable</var>')).toBe('`variable`');
            expect(WAMessageFormatter('<tt>teletype</tt>')).toBe('`teletype`');
        });

        test('should handle code blocks', () => {
            expect(WAMessageFormatter('<pre>code block</pre>')).toBe('```\ncode block\n```');
            expect(WAMessageFormatter('<pre>\n  indented code\n</pre>')).toBe('```\n  indented code\n```');
        });

        test('should handle highlighted text', () => {
            expect(WAMessageFormatter('<mark>highlighted</mark>')).toBe('*highlighted*');
        });
    });

    describe('Nested Formatting', () => {
        test('should handle bold + italic', () => {
            expect(WAMessageFormatter('<strong><em>bold italic</em></strong>')).toBe('*_bold italic_*');
            expect(WAMessageFormatter('<em><strong>italic bold</strong></em>')).toBe('_*italic bold*_');
        });

        test('should handle bold + strikethrough', () => {
            expect(WAMessageFormatter('<strong><s>bold strike</s></strong>')).toBe('*~bold strike~*');
        });

        test('should handle italic + strikethrough', () => {
            expect(WAMessageFormatter('<em><s>italic strike</s></em>')).toBe('_~italic strike~_');
        });

        test('should handle triple nested formatting', () => {
            expect(WAMessageFormatter('<strong><em><s>all three</s></em></strong>')).toBe('*_~all three~_*');
        });

        test('should handle code within formatting', () => {
            expect(WAMessageFormatter('<strong>Bold <code>code</code> text</strong>')).toBe('*Bold `code` text*');
        });
    });

    describe('Block Elements', () => {
        test('should handle paragraphs', () => {
            expect(WAMessageFormatter('<p>First paragraph</p><p>Second paragraph</p>'))
                .toBe('First paragraph\n\nSecond paragraph');
        });

        test('should handle divs', () => {
            expect(WAMessageFormatter('<div>First div</div><div>Second div</div>'))
                .toBe('First div\n\nSecond div');
        });

        test('should handle headings', () => {
            expect(WAMessageFormatter('<h1>Heading 1</h1>')).toBe('*Heading 1*\n\n');
            expect(WAMessageFormatter('<h2>Heading 2</h2>')).toBe('*Heading 2*\n\n');
            expect(WAMessageFormatter('<h3>Heading 3</h3>')).toBe('*Heading 3*\n\n');
        });

        test('should handle line breaks', () => {
            expect(WAMessageFormatter('Line 1<br>Line 2')).toBe('Line 1\nLine 2');
            expect(WAMessageFormatter('Line 1<br/>Line 2')).toBe('Line 1\nLine 2');
        });

        test('should handle horizontal rules', () => {
            expect(WAMessageFormatter('Before<hr>After')).toBe('Before\n---\nAfter');
        });
    });

    describe('Quotes and Citations', () => {
        test('should handle blockquotes', () => {
            expect(WAMessageFormatter('<blockquote>This is a quote</blockquote>'))
                .toBe('> This is a quote');
        });

        test('should handle multi-line quotes', () => {
            expect(WAMessageFormatter('<blockquote>Line 1<br>Line 2</blockquote>'))
                .toBe('> Line 1\n> Line 2');
        });

        test('should handle inline quotes', () => {
            expect(WAMessageFormatter('<q>quoted text</q>')).toBe('> quoted text');
        });

        test('should handle citations', () => {
            expect(WAMessageFormatter('<cite>Citation</cite>')).toBe('> Citation');
        });

        test('should handle empty quotes', () => {
            expect(WAMessageFormatter('<blockquote></blockquote>')).toBe('');
        });
    });

    describe('Lists', () => {
        test('should handle unordered lists', () => {
            const html = '<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>';
            expect(WAMessageFormatter(html)).toBe('- Item 1\n- Item 2\n- Item 3');
        });

        test('should handle ordered lists', () => {
            const html = '<ol><li>First</li><li>Second</li><li>Third</li></ol>';
            expect(WAMessageFormatter(html)).toBe('1. First\n2. Second\n3. Third');
        });

        test('should handle nested lists', () => {
            const html = '<ul><li>Item 1<ul><li>Nested 1</li><li>Nested 2</li></ul></li><li>Item 2</li></ul>';
            expect(WAMessageFormatter(html)).toBe('- Item 1- Nested 1\n- Nested 2\n- Item 2');
        });

        test('should handle definition lists', () => {
            const html = '<dl><dt>Term</dt><dd>Definition</dd></dl>';
            expect(WAMessageFormatter(html)).toBe('*Term*\n- Definition');
        });

        test('should handle empty lists', () => {
            expect(WAMessageFormatter('<ul></ul>')).toBe('');
            expect(WAMessageFormatter('<ol></ol>')).toBe('');
        });
    });

    describe('Edge Cases', () => {
        test('should handle empty input', () => {
            expect(WAMessageFormatter('')).toBe('');
            expect(WAMessageFormatter('   ')).toBe('');
        });

        test('should handle null/undefined input', () => {
            expect(WAMessageFormatter(null as any)).toBe('');
            expect(WAMessageFormatter(undefined as any)).toBe('');
        });

        test('should handle plain text', () => {
            expect(WAMessageFormatter('Plain text')).toBe('Plain text');
        });

        test('should handle mixed content', () => {
            const html = 'Plain text <strong>bold</strong> more text <em>italic</em>';
            expect(WAMessageFormatter(html)).toBe('Plain text *bold* more text _italic_');
        });

        test('should handle malformed HTML', () => {
            expect(WAMessageFormatter('<strong>unclosed tag')).toBe('*unclosed tag*');
            expect(WAMessageFormatter('unopened tag</strong>')).toBe('unopened tag');
        });

        test('should ignore unsupported tags', () => {
            expect(WAMessageFormatter('<span>text</span>')).toBe('text');
            expect(WAMessageFormatter('<custom-tag>text</custom-tag>')).toBe('text');
        });

        test('should ignore script and style tags', () => {
            expect(WAMessageFormatter('<script>alert("xss")</script>text')).toBe('text');
            expect(WAMessageFormatter('<style>body{color:red}</style>text')).toBe('text');
        });

        test('should ignore images', () => {
            expect(WAMessageFormatter('<img src="test.jpg" alt="test">text')).toBe('text');
        });

        test('should preserve link text only', () => {
            expect(WAMessageFormatter('<a href="https://example.com">Link text</a>')).toBe('Link text');
        });

        test('should handle empty formatting tags', () => {
            expect(WAMessageFormatter('<strong></strong>')).toBe('');
            expect(WAMessageFormatter('<em></em>')).toBe('');
            expect(WAMessageFormatter('<code></code>')).toBe('');
        });

        test('should collapse multiple newlines', () => {
            expect(WAMessageFormatter('<p>Para 1</p><p></p><p></p><p>Para 2</p>'))
                .toBe('Para 1\n\nPara 2');
        });

        test('should handle whitespace properly', () => {
            expect(WAMessageFormatter('<p>  Text with   spaces  </p>'))
                .toBe('Text with   spaces');
        });
    });

    describe('Complex Scenarios', () => {
        test('should handle complex nested structure', () => {
            const html = `
        <div>
          <h2>Title</h2>
          <p>This is <strong>bold <em>and italic</em></strong> text.</p>
          <blockquote>
            This is a quote with <code>inline code</code>.
          </blockquote>
          <ul>
            <li><strong>Bold item</strong></li>
            <li><em>Italic item</em> with <s>strikethrough</s></li>
          </ul>
        </div>
      `;

            const expected = '*Title*\n\nThis is *bold _and italic_* text.\n\n> This is a quote with `inline code`.\n\n- *Bold item*\n- _Italic item_ with ~strikethrough~';
            expect(WAMessageFormatter(html)).toBe(expected);
        });

        test('should handle email-like content', () => {
            const html = `
        <p><strong>Subject:</strong> Meeting Reminder</p>
        <p><em>From:</em> john@example.com</p>
        <blockquote>
          <p>Hi team,</p>
          <p>Don't forget about our meeting tomorrow at <strong>2 PM</strong>.</p>
          <p>Agenda:</p>
          <ol>
            <li>Project updates</li>
            <li>Budget review</li>
            <li>Next steps</li>
          </ol>
        </blockquote>
      `;

            const expected = '*Subject:* Meeting Reminder\n\n_From:_ john@example.com\n\n> Hi team,\n> \n> Don\'t forget about our meeting tomorrow at *2 PM*.\n> \n> Agenda:\n> \n> 1. Project updates\n> 2. Budget review\n> 3. Next steps';
            expect(WAMessageFormatter(html)).toBe(expected);
        });
    });

    describe('Performance', () => {
        test('should handle large documents efficiently', () => {
            const largeHtml = '<div>' + '<p>Text content</p>'.repeat(1000) + '</div>';
            const start = Date.now();
            const result = WAMessageFormatter(largeHtml);
            const end = Date.now();

            expect(result).toContain('Text content');
            expect(end - start).toBeLessThan(1000); // Should complete within 1 second
        });
    });
});