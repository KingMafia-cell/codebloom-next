import { Tab } from '@/types/ide';

interface Props {
  activeTab: Tab | undefined;
  selectedAI: string;
}

export const StatusBar = ({ activeTab, selectedAI }: Props) => (
  <div className="flex items-center justify-between px-3 py-1 glass-strong border-t border-border/30 text-[10px] text-muted-foreground">
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-success" />
        Ready
      </span>
      {activeTab && <span className="uppercase">{activeTab.language}</span>}
    </div>
    <div className="flex items-center gap-3">
      <span>UTF-8</span>
      <span>Ln 1, Col 1</span>
      <span className="text-accent">{selectedAI === 'gpt4' ? 'GPT-4' : selectedAI === 'claude3' ? 'Claude 3' : selectedAI === 'gemini' ? 'Gemini' : 'Code Llama'}</span>
    </div>
  </div>
);
