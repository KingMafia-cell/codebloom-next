import { FileNode } from '@/types/ide';
import { getFileIcon } from '@/data/sampleProject';
import { ChevronRight, ChevronDown, FolderPlus } from 'lucide-react';

interface Props {
  files: FileNode[];
  onFileClick: (id: string) => void;
  onFolderToggle: (id: string) => void;
}

const FileTree = ({ nodes, depth, onFileClick, onFolderToggle }: { nodes: FileNode[]; depth: number } & Omit<Props, 'files'>) => (
  <div>
    {nodes.map(node => (
      <div key={node.id}>
        <button
          onClick={() => node.type === 'folder' ? onFolderToggle(node.id) : onFileClick(node.id)}
          className="w-full flex items-center gap-1.5 px-2 py-1.5 text-xs hover:bg-secondary/50 transition-colors rounded-sm group"
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          {node.type === 'folder' ? (
            <>
              {node.isOpen ? <ChevronDown className="w-3 h-3 text-muted-foreground" /> : <ChevronRight className="w-3 h-3 text-muted-foreground" />}
              <span className="text-sm">{node.isOpen ? '📂' : '📁'}</span>
            </>
          ) : (
            <>
              <span className="w-3" />
              <span className="text-sm">{getFileIcon(node.name)}</span>
            </>
          )}
          <span className={`truncate ${node.type === 'folder' ? 'font-medium text-foreground' : 'text-secondary-foreground'}`}>
            {node.name}
          </span>
        </button>
        {node.type === 'folder' && node.isOpen && node.children && (
          <FileTree nodes={node.children} depth={depth + 1} onFileClick={onFileClick} onFolderToggle={onFolderToggle} />
        )}
      </div>
    ))}
  </div>
);

export const FileExplorer = ({ files, onFileClick, onFolderToggle }: Props) => (
  <div className="h-full glass-strong animate-slide-in overflow-y-auto">
    <div className="flex items-center justify-between px-3 py-2.5 border-b border-border/50">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Explorer</span>
      <button className="p-1 hover:bg-secondary/50 rounded transition-colors">
        <FolderPlus className="w-3.5 h-3.5 text-muted-foreground" />
      </button>
    </div>
    <div className="py-1">
      <FileTree nodes={files} depth={0} onFileClick={onFileClick} onFolderToggle={onFolderToggle} />
    </div>
  </div>
);
