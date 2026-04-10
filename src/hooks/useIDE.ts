import { useState, useCallback } from 'react';
import { FileNode, Tab, PanelView } from '@/types/ide';
import { sampleFiles } from '@/data/sampleProject';

const findFile = (nodes: FileNode[], id: string): FileNode | null => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findFile(node.children, id);
      if (found) return found;
    }
  }
  return null;
};

export const useIDE = () => {
  const [files, setFiles] = useState<FileNode[]>(sampleFiles);
  const [tabs, setTabs] = useState<Tab[]>([
    { id: '6', name: 'index.html', language: 'html', content: sampleFiles[0].children![1].children![1].content!, isActive: true, isDirty: false },
    { id: '7', name: 'add.js', language: 'javascript', content: sampleFiles[0].children![1].children![2].content!, isActive: false, isDirty: false },
  ]);
  const [activePanel, setActivePanel] = useState<PanelView>(null);
  const [selectedAI, setSelectedAI] = useState('gemini');
  const [showAIChat, setShowAIChat] = useState(false);

  const activeTab = tabs.find(t => t.isActive);

  const openFile = useCallback((fileId: string) => {
    const file = findFile(files, fileId);
    if (!file || file.type !== 'file') return;

    setTabs(prev => {
      const exists = prev.find(t => t.id === fileId);
      if (exists) {
        return prev.map(t => ({ ...t, isActive: t.id === fileId }));
      }
      const ext = file.name.split('.').pop() || '';
      const langMap: Record<string, string> = { html: 'html', css: 'css', js: 'javascript', ts: 'typescript', tsx: 'tsx', py: 'python', json: 'json', md: 'markdown' };
      return [
        ...prev.map(t => ({ ...t, isActive: false })),
        { id: fileId, name: file.name, language: langMap[ext] || 'text', content: file.content || '', isActive: true, isDirty: false },
      ];
    });
    setActivePanel(null);
  }, [files]);

  const closeTab = useCallback((tabId: string) => {
    setTabs(prev => {
      const filtered = prev.filter(t => t.id !== tabId);
      if (filtered.length && !filtered.some(t => t.isActive)) {
        filtered[filtered.length - 1].isActive = true;
      }
      return filtered;
    });
  }, []);

  const switchTab = useCallback((tabId: string) => {
    setTabs(prev => prev.map(t => ({ ...t, isActive: t.id === tabId })));
  }, []);

  const toggleFolder = useCallback((folderId: string) => {
    const toggle = (nodes: FileNode[]): FileNode[] =>
      nodes.map(n => n.id === folderId ? { ...n, isOpen: !n.isOpen } : n.children ? { ...n, children: toggle(n.children) } : n);
    setFiles(toggle);
  }, []);

  const togglePanel = useCallback((panel: PanelView) => {
    setActivePanel(prev => prev === panel ? null : panel);
  }, []);

  return {
    files, tabs, activeTab, activePanel, selectedAI, showAIChat,
    openFile, closeTab, switchTab, toggleFolder, togglePanel,
    setSelectedAI, setShowAIChat,
  };
};
