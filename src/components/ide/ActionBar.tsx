const symbols = [
  { label: '{', value: '{' },
  { label: '}', value: '}' },
  { label: '[', value: '[' },
  { label: ']', value: ']' },
  { label: '<', value: '<' },
  { label: '>', value: '>' },
  { label: '/', value: '/' },
  { label: ';', value: ';' },
  { label: '=', value: '=' },
  { label: '(', value: '(' },
  { label: ')', value: ')' },
  { label: '"', value: '"' },
  { label: ':', value: ':' },
  { label: '.', value: '.' },
  { label: 'Tab', value: '\t' },
];

export const ActionBar = () => (
  <div className="glass-strong border-t border-border/30 px-1 py-1.5 flex overflow-x-auto scrollbar-hide gap-1">
    {symbols.map((sym) => (
      <button
        key={sym.label}
        className="px-2.5 py-1.5 text-xs font-mono rounded-md bg-secondary/50 text-secondary-foreground hover:bg-primary/20 hover:text-primary active:scale-95 transition-all shrink-0 min-w-[32px]"
      >
        {sym.label}
      </button>
    ))}
  </div>
);
