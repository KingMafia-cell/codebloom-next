import { useState } from 'react';
import { AIModel, Tab } from '@/types/ide';
import { aiModels } from '@/data/sampleProject';
import { Send, X, ChevronDown } from 'lucide-react';

interface Props {
  selectedAI: string;
  onSelectAI: (id: string) => void;
  onClose: () => void;
  openTabs: Tab[];
}

export const AIPanel = ({ selectedAI, onSelectAI, onClose, openTabs }: Props) => {
  const [message, setMessage] = useState('');
  const [showModels, setShowModels] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: 'Hello! I have access to your open files. How can I help you code today?' },
  ]);

  const currentModel = aiModels.find(m => m.id === selectedAI)!;

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages(prev => [
      ...prev,
      { role: 'user', content: message },
      { role: 'assistant', content: `Analyzing your code across ${openTabs.length} open file(s)... I can see ${openTabs.map(t => t.name).join(', ')}. Let me help with that!` },
    ]);
    setMessage('');
  };

  return (
    <div className="flex flex-col h-full glass-strong animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-border/30">
        <button
          onClick={() => setShowModels(!showModels)}
          className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-secondary/50 transition-colors"
        >
          <span className="text-lg">{currentModel.icon}</span>
          <span className="text-xs font-semibold">{currentModel.name}</span>
          <ChevronDown className="w-3 h-3 text-muted-foreground" />
        </button>
        <button onClick={onClose} className="p-1 rounded hover:bg-secondary/50 transition-colors">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Model Selector */}
      {showModels && (
        <div className="border-b border-border/30 p-2 space-y-1 animate-fade-in">
          {aiModels.map(model => (
            <button
              key={model.id}
              onClick={() => { onSelectAI(model.id); setShowModels(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all ${
                model.id === selectedAI ? 'bg-primary/10 text-primary glow-primary' : 'hover:bg-secondary/50 text-secondary-foreground'
              }`}
            >
              <span className="text-base">{model.icon}</span>
              <div className="text-left">
                <div className="font-semibold">{model.name}</div>
                <div className="text-[10px] text-muted-foreground">{model.provider}</div>
              </div>
              {model.id === selectedAI && <span className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse" />}
            </button>
          ))}
        </div>
      )}

      {/* Context indicator */}
      <div className="px-3 py-1.5 border-b border-border/20 flex items-center gap-1.5">
        <span className="text-[10px] text-muted-foreground">Context:</span>
        {openTabs.map(t => (
          <span key={t.id} className="text-[10px] px-1.5 py-0.5 rounded bg-secondary/50 text-secondary-foreground">{t.name}</span>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-hide">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
              msg.role === 'user'
                ? 'bg-primary/20 text-foreground rounded-br-sm'
                : 'bg-secondary/40 text-secondary-foreground rounded-bl-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-2 border-t border-border/30">
        <div className="flex items-center gap-2 bg-secondary/30 rounded-xl px-3 py-1.5">
          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your code..."
            className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground/50 outline-none"
          />
          <button
            onClick={handleSend}
            className="p-1.5 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
