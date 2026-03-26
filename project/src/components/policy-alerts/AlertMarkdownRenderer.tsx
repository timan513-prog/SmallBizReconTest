import React from 'react';

interface Props {
  content: string;
}

function parseMarkdown(text: string): React.ReactNode[] {
  const lines = text.split('\n');
  const nodes: React.ReactNode[] = [];
  let listItems: string[] = [];
  let key = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      nodes.push(
        <ul key={key++} style={{ paddingLeft: 20, margin: '10px 0', color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
          {listItems.map((item, i) => (
            <li key={i} style={{ marginBottom: 4 }} dangerouslySetInnerHTML={{ __html: inlineMarkdown(item) }} />
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  for (const raw of lines) {
    const line = raw;

    if (line.startsWith('## ')) {
      flushList();
      nodes.push(
        <h3 key={key++} style={{
          fontFamily: 'var(--font-display)',
          fontSize: 16,
          fontWeight: 400,
          color: 'var(--text-primary)',
          marginTop: 18,
          marginBottom: 6,
          borderBottom: '1px solid var(--border-primary)',
          paddingBottom: 4,
          letterSpacing: '-0.01em',
        }}>
          {line.slice(3)}
        </h3>
      );
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      listItems.push(line.slice(2));
    } else if (/^\d+\. /.test(line)) {
      listItems.push(line.replace(/^\d+\. /, ''));
    } else if (line.trim() === '') {
      flushList();
      nodes.push(<div key={key++} style={{ height: 6 }} />);
    } else {
      flushList();
      nodes.push(
        <p key={key++} style={{
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          margin: '6px 0',
        }} dangerouslySetInnerHTML={{ __html: inlineMarkdown(line) }} />
      );
    }
  }
  flushList();
  return nodes;
}

function inlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--text-primary);font-weight:600">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code style="font-family:JetBrains Mono,monospace;font-size:12px;background:rgba(255,255,255,0.06);padding:1px 5px;border-radius:3px">$1</code>');
}

const AlertMarkdownRenderer: React.FC<Props> = ({ content }) => {
  return (
    <div style={{ marginTop: 12 }}>
      {parseMarkdown(content)}
    </div>
  );
};

export default AlertMarkdownRenderer;
