import { PanelView } from '@/types/ide';
import { FolderTree, Search, Brain, Play, TerminalSquare, Sun, Moon } from 'lucide-react';

interface Props {
  activePanel: PanelView;
  onTogglePanel: (panel: PanelView) => void;
  onToggleAI: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const tools = [
  { id: 'explorer' as PanelView, icon: FolderTree, label: 'Explorer' },
  { id: 'search' as PanelView, icon: Search, label: 'Search' },
];

export const Toolbar = ({ activePanel, onTogglePanel, onToggleAI, theme, onToggleTheme }: Props) => (
  <div className="flex items-center justify-between px-2 py-1.5 glass-strong border-b border-border/30">
    <div className="flex items-center gap-1">
      {tools.map(tool => (
        <button
          key={tool.id}
          onClick={() => onTogglePanel(tool.id)}
          className={`p-2 rounded-lg transition-all ${
            activePanel === tool.id ? 'bg-primary/15 text-primary glow-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
          }`}
          title={tool.label}
        >
          <tool.icon className="w-4.5 h-4.5" />
        </button>
      ))}
    </div>

    <div className="flex items-center gap-0.5">
      <button
        onClick={onToggleTheme}
        className="p-2 rounded-lg text-warning hover:bg-warning/10 transition-all"
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>
      <button
        onClick={onToggleAI}
        className="p-2 rounded-lg text-accent hover:bg-accent/10 transition-all glow-accent"
        title="AI Assistant"
      >
        <Brain className="w-5 h-5" />
      </button>
      <button className="p-2 rounded-lg text-success hover:bg-success/10 transition-all" title="Run">
        <Play className="w-4 h-4" />
      </button>
      <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all" title="Terminal">
        <TerminalSquare className="w-4 h-4" />
      </button>
    </div>
  </div>
);
