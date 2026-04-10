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
  const [tabs, setTabs] = useState<Tab[]>(() => {
    const defaultTabs: Tab[] = [];
    const srcFolder = sampleFiles[0]?.children?.find(c => c.name === 'src');
    const indexFile = srcFolder?.children?.find(c => c.name === 'index.html');
    const addFile = srcFolder?.children?.find(c => c.name === 'add.js');
    if (indexFile?.content) defaultTabs.push({ id: indexFile.id, name: indexFile.name, language: 'html', content: indexFile.content, isActive: true, isDirty: false });
    if (addFile?.content) defaultTabs.push({ id: addFile.id, name: addFile.name, language: 'javascript', content: addFile.content, isActive: !indexFile, isDirty: false });
    return defaultTabs;
  });
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
