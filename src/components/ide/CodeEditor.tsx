import { Tab } from '@/types/ide';

interface Props {
  tab: Tab | undefined;
}

const syntaxHighlight = (line: string, language: string): JSX.Element[] => {
  const keywords: Record<string, string[]> = {
    html: ['DOCTYPE', 'html', 'head', 'body', 'div', 'span', 'script', 'meta', 'title', 'link', 'input', 'button', 'br', 'p', 'h1', 'nav', 'header', 'footer', 'a'],
    javascript: ['function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while', 'import', 'export', 'from', 'default', 'class', 'new', 'this', 'document', 'addEventListener'],
    typescript: ['function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while', 'import', 'export', 'from', 'default', 'interface', 'type', 'class'],
    tsx: ['function', 'const', 'let', 'return', 'import', 'export', 'from', 'interface', 'type'],
    python: ['def', 'class', 'import', 'from', 'return', 'if', 'else', 'elif', 'for', 'while', 'in', 'not', 'and', 'or', 'True', 'False', 'None', 'self', '__name__', '__main__'],
    css: ['margin', 'padding', 'background', 'color', 'font', 'border', 'display', 'flex', 'grid', 'position', 'width', 'height', 'cursor'],
  };

  const parts: JSX.Element[] = [];
  let remaining = line;
  let key = 0;

  // Strings
  const stringRegex = /(['"`])(.*?)\1/g;
  // Comments
  const commentRegex = /(\/\/.*$|#.*$|\/\*.*?\*\/)/;
  // HTML tags
  const tagRegex = /(<\/?[\w-]+|>|\/>)/g;

  const commentMatch = remaining.match(commentRegex);
  if (commentMatch && commentMatch.index !== undefined) {
    const before = remaining.slice(0, commentMatch.index);
    const comment = commentMatch[0];
    const after = remaining.slice(commentMatch.index + comment.length);
    parts.push(<span key={key++}>{renderTokens(before, keywords[language] || [])}</span>);
    parts.push(<span key={key++} className="text-muted-foreground/60 italic">{comment}</span>);
    parts.push(<span key={key++}>{after}</span>);
    return parts;
  }

  return [<span key={0}>{renderTokens(remaining, keywords[language] || [])}</span>];
};

const renderTokens = (text: string, keywords: string[]): JSX.Element[] => {
  const parts: JSX.Element[] = [];
  const regex = /(['"`])(.*?)\1|(<\/?[\w-]+|>|\/>)|(\b\w+\b)|([^\w'"`<>]+)/g;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    const [full, quote, strContent, tag, word] = match;
    if (quote) {
      parts.push(<span key={key++} className="text-warning">{full}</span>);
    } else if (tag) {
      parts.push(<span key={key++} className="text-destructive">{full}</span>);
    } else if (word && keywords.includes(word)) {
      parts.push(<span key={key++} className="text-accent">{full}</span>);
    } else if (word && /^\d+$/.test(word)) {
      parts.push(<span key={key++} className="text-success">{full}</span>);
    } else {
      parts.push(<span key={key++}>{full}</span>);
    }
  }
  return parts;
};

export const CodeEditor = ({ tab }: Props) => {
  if (!tab) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center space-y-3">
          <div className="text-4xl">⚡</div>
          <p className="text-sm font-medium">Open a file to start editing</p>
          <p className="text-xs text-muted-foreground/60">Use the explorer or tap a tab</p>
        </div>
      </div>
    );
  }

  const lines = tab.content.split('\n');

  return (
    <div className="flex-1 overflow-auto scrollbar-hide code-selection">
      <div className="min-w-max font-mono text-[13px] leading-6">
        {lines.map((line, i) => (
          <div key={i} className="flex hover:bg-secondary/20 transition-colors">
            <span className="w-10 shrink-0 text-right pr-3 text-muted-foreground/40 select-none text-[11px] leading-6">
              {i + 1}
            </span>
            <span className="flex-1 pr-4 whitespace-pre">
              {syntaxHighlight(line, tab.language)}
            </span>
          </div>
        ))}
        <div className="h-40" />
      </div>
    </div>
  );
};
