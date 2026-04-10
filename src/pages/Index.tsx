import { useState } from 'react';
import { useIDE } from '@/hooks/useIDE';
import { useTheme } from '@/hooks/useTheme';
import { Toolbar } from '@/components/ide/Toolbar';
import { FileExplorer } from '@/components/ide/FileExplorer';
import { TabBar } from '@/components/ide/TabBar';
import { CodeEditor } from '@/components/ide/CodeEditor';
import { ActionBar } from '@/components/ide/ActionBar';
import { AIPanel } from '@/components/ide/AIPanel';
import { StatusBar } from '@/components/ide/StatusBar';
import { LockScreen } from '@/components/ide/LockScreen';

const Index = () => {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('ide-unlocked') === 'true');
  const { theme, toggleTheme } = useTheme();

  const {
    files, tabs, activeTab, activePanel, selectedAI, showAIChat,
    openFile, closeTab, switchTab, toggleFolder, togglePanel,
    setSelectedAI, setShowAIChat,
  } = useIDE();

  if (!unlocked) {
    return <LockScreen onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Toolbar
        activePanel={activePanel}
        onTogglePanel={togglePanel}
        onToggleAI={() => setShowAIChat(!showAIChat)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <div className="flex-1 flex overflow-hidden relative">
        {activePanel === 'explorer' && (
          <div className="w-64 shrink-0 border-r border-border/30 overflow-hidden">
            <FileExplorer files={files} onFileClick={openFile} onFolderToggle={toggleFolder} />
          </div>
        )}

        <div className="flex-1 flex flex-col min-w-0">
          {tabs.length > 0 && (
            <TabBar tabs={tabs} onSwitch={switchTab} onClose={closeTab} />
          )}
          <CodeEditor tab={activeTab} />
        </div>

        {showAIChat && (
          <div className="absolute inset-0 z-10 sm:relative sm:w-72 sm:shrink-0 sm:border-l sm:border-border/30">
            <AIPanel
              selectedAI={selectedAI}
              onSelectAI={setSelectedAI}
              onClose={() => setShowAIChat(false)}
              openTabs={tabs}
            />
          </div>
        )}
      </div>

      <ActionBar />
      <StatusBar activeTab={activeTab} selectedAI={selectedAI} />
    </div>
  );
};

export default Index;
