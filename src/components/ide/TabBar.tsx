import { Tab } from '@/types/ide';
import { X } from 'lucide-react';
import { getFileIcon, getLanguageColor } from '@/data/sampleProject';

interface Props {
  tabs: Tab[];
  onSwitch: (id: string) => void;
  onClose: (id: string) => void;
}

export const TabBar = ({ tabs, onSwitch, onClose }: Props) => (
  <div className="flex overflow-x-auto scrollbar-hide glass-strong border-b border-border/30">
    {tabs.map(tab => (
      <button
        key={tab.id}
        onClick={() => onSwitch(tab.id)}
        className={`flex items-center gap-1.5 px-3 py-2 text-xs whitespace-nowrap border-r border-border/20 transition-all min-w-0 shrink-0 ${
          tab.isActive
            ? 'bg-card text-foreground border-b-2 border-b-primary'
            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'
        }`}
      >
        <span className="text-sm">{getFileIcon(tab.name)}</span>
        <span className="truncate max-w-[80px]">{tab.name}</span>
        {tab.isDirty && <span className="w-1.5 h-1.5 rounded-full bg-warning shrink-0" />}
        <span
          onClick={(e) => { e.stopPropagation(); onClose(tab.id); }}
          className="ml-1 p-0.5 rounded hover:bg-destructive/20 transition-colors shrink-0"
        >
          <X className="w-2.5 h-2.5" />
        </span>
      </button>
    ))}
  </div>
);
