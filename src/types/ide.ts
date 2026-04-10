export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  language?: string;
  content?: string;
  isOpen?: boolean;
}

export interface Tab {
  id: string;
  name: string;
  language: string;
  content: string;
  isActive: boolean;
  isDirty: boolean;
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  icon: string;
  color: string;
}

export type PanelView = 'explorer' | 'search' | 'ai' | 'settings' | null;
