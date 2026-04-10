import { FileNode, AIModel } from '@/types/ide';

export const sampleFiles: FileNode[] = [
  {
    id: '1', name: 'my-project', type: 'folder', isOpen: true, children: [
      {
        id: '2', name: 'src', type: 'folder', isOpen: true, children: [
          {
            id: '3', name: 'components', type: 'folder', isOpen: false, children: [
              { id: '4', name: 'Header.tsx', type: 'file', language: 'tsx', content: `import React from 'react';\n\nexport const Header = () => {\n  return (\n    <header className="header">\n      <h1>My App</h1>\n      <nav>\n        <a href="/">Home</a>\n        <a href="/about">About</a>\n      </nav>\n    </header>\n  );\n};` },
              { id: '5', name: 'Footer.tsx', type: 'file', language: 'tsx', content: `export const Footer = () => (\n  <footer>\n    <p>&copy; 2026 My App</p>\n  </footer>\n);` },
            ]
          },
          { id: '6', name: 'index.html', type: 'file', language: 'html', content: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My App</title>\n  <script src="add.js"></script>\n  <script src="jquery.js"></script>\n</head>\n<body>\n  <p>Result will be displayed here</p>\n  <input id="inp1"><br>\n  <input id="inp2"><br>\n  <button class="btn">CLICK</button>\n</body>\n</html>` },
          { id: '7', name: 'add.js', type: 'file', language: 'javascript', content: `function add(a, b) {\n  return a + b;\n}\n\ndocument.querySelector('.btn')\n  .addEventListener('click', () => {\n    const a = +document.getElementById('inp1').value;\n    const b = +document.getElementById('inp2').value;\n    const result = add(a, b);\n    document.querySelector('p').textContent = result;\n  });` },
          { id: '8', name: 'styles.css', type: 'file', language: 'css', content: `* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: 'Inter', sans-serif;\n  background: #0f1419;\n  color: #e6e1cf;\n}\n\n.btn {\n  padding: 8px 24px;\n  background: #0ea5e9;\n  border: none;\n  border-radius: 6px;\n  color: white;\n  cursor: pointer;\n}` },
        ]
      },
      {
        id: '9', name: 'server', type: 'folder', isOpen: false, children: [
          { id: '10', name: 'app.py', type: 'file', language: 'python', content: `from flask import Flask, jsonify\n\napp = Flask(__name__)\n\n@app.route('/api/data')\ndef get_data():\n    return jsonify({"message": "Hello!"})\n\nif __name__ == '__main__':\n    app.run(debug=True)` },
          { id: '11', name: 'requirements.txt', type: 'file', language: 'text', content: `flask==3.0.0\nrequests==2.31.0\ngunicorn==21.2.0` },
        ]
      },
      { id: '12', name: 'README.md', type: 'file', language: 'markdown', content: `# My Project\n\nA full-stack web application.\n\n## Getting Started\n\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n\n## Features\n- Responsive UI\n- REST API\n- Real-time updates` },
      { id: '13', name: 'package.json', type: 'file', language: 'json', content: `{\n  "name": "my-project",\n  "version": "1.0.0",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build"\n  },\n  "dependencies": {\n    "react": "^18.3.1"\n  }\n}` },
    ]
  }
];

export const aiModels: AIModel[] = [
  { id: 'gpt4', name: 'GPT-4', provider: 'OpenAI', icon: '🧠', color: 'hsl(145 70% 50%)' },
  { id: 'claude3', name: 'Claude 3', provider: 'Anthropic', icon: '🔮', color: 'hsl(270 80% 65%)' },
  { id: 'gemini', name: 'Gemini', provider: 'Google', icon: '✨', color: 'hsl(200 100% 55%)' },
  { id: 'codellama', name: 'Code Llama', provider: 'Meta', icon: '🦙', color: 'hsl(38 95% 60%)' },
];

export const getLanguageColor = (lang: string): string => {
  const colors: Record<string, string> = {
    html: '#e34c26',
    css: '#563d7c',
    javascript: '#f7df1e',
    typescript: '#3178c6',
    tsx: '#3178c6',
    python: '#3572A5',
    json: '#292929',
    markdown: '#083fa1',
    text: '#888',
  };
  return colors[lang] || '#888';
};

export const getFileIcon = (name: string): string => {
  const ext = name.split('.').pop()?.toLowerCase();
  const icons: Record<string, string> = {
    html: '🌐', css: '🎨', js: '⚡', ts: '💎', tsx: '⚛️',
    py: '🐍', json: '📋', md: '📝', txt: '📄',
  };
  return icons[ext || ''] || '📄';
};
