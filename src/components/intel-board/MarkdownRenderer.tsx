import React from 'react';

interface Props {
  content: string;
  compact?: boolean;
}

function inlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#e8ede2;font-weight:700">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code style="font-family:\'JetBrains Mono\',monospace;font-size:12px;background:rgba(255,255,255,0.07);padding:2px 6px;border-radius:4px;color:#c8a84e">$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#c8a84e;text-decoration:underline;text-underline-offset:3px">$1</a>');
}

const MarkdownRenderer: React.FC<Props> = ({ content, compact = false }) => {
  const lines = content.split('\n');
  const nodes: React.ReactNode[] = [];
  let key = 0;
  let listItems: string[] = [];
  let orderedItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      nodes.push(
        <ul key={key++} style={{ paddingLeft: 22, margin: '10px 0', color: 'var(--text-secondary, #8a9480)', fontSize: compact ? 13 : 15, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
          {listItems.map((item, i) => (
            <li key={i} style={{ marginBottom: 4 }} dangerouslySetInnerHTML={{ __html: inlineMarkdown(item) }} />
          ))}
        </ul>
      );
      listItems = [];
    }
    if (orderedItems.length > 0) {
      nodes.push(
        <ol key={key++} style={{ paddingLeft: 22, margin: '10px 0', color: 'var(--text-secondary, #8a9480)', fontSize: compact ? 13 : 15, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
          {orderedItems.map((item, i) => (
            <li key={i} style={{ marginBottom: 4 }} dangerouslySetInnerHTML={{ __html: inlineMarkdown(item) }} />
          ))}
        </ol>
      );
      orderedItems = [];
    }
  };

  for (const raw of lines) {
    const line = raw;

    if (line.startsWith('# ')) {
      flushList();
      nodes.push(
        <h2 key={key++} style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: compact ? 20 : 28, fontWeight: 400, color: 'var(--text-primary, #e8ede2)', margin: '24px 0 12px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
          {line.slice(2)}
        </h2>
      );
    } else if (line.startsWith('## ')) {
      flushList();
      nodes.push(
        <h3 key={key++} style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: compact ? 17 : 22, fontWeight: 400, color: 'var(--text-primary, #e8ede2)', margin: '20px 0 8px', lineHeight: 1.25, borderBottom: '1px solid rgba(200,168,78,0.15)', paddingBottom: 6 }}>
          {line.slice(3)}
        </h3>
      );
    } else if (line.startsWith('### ')) {
      flushList();
      nodes.push(
        <h4 key={key++} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: compact ? 14 : 17, fontWeight: 700, color: 'var(--text-primary, #e8ede2)', margin: '16px 0 6px' }}>
          {line.slice(4)}
        </h4>
      );
    } else if (line.startsWith('> ')) {
      flushList();
      nodes.push(
        <blockquote key={key++} style={{ margin: '16px 0', padding: '14px 20px', borderLeft: '4px solid #c8a84e', background: 'rgba(200,168,78,0.06)', borderRadius: '0 10px 10px 0', fontStyle: 'italic', color: 'var(--text-secondary, #8a9480)', fontSize: compact ? 13 : 15, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(line.slice(2)) }}
        />
      );
    } else if (line.startsWith('---')) {
      flushList();
      nodes.push(
        <hr key={key++} style={{ border: 'none', borderTop: '1px solid rgba(200,168,78,0.2)', margin: '24px 0' }} />
      );
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      listItems.push(line.slice(2));
    } else if (/^\d+\.\s/.test(line)) {
      orderedItems.push(line.replace(/^\d+\.\s/, ''));
    } else if (line.trim() === '') {
      flushList();
      nodes.push(<div key={key++} style={{ height: 8 }} />);
    } else {
      flushList();
      nodes.push(
        <p key={key++} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: compact ? 13 : 15, color: 'var(--text-secondary, #8a9480)', lineHeight: 1.8, margin: '6px 0' }}
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(line) }}
        />
      );
    }
  }
  flushList();

  return <div>{nodes}</div>;
};

export default MarkdownRenderer;
