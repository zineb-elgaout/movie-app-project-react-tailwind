import React from 'react';
import EditorSideBar from './editorSideBar';
import Topbar from '../admin/Topbar';

const EditorLayout = ({ children }) => (
  <div className="flex h-screen bg-gray-900 overflow-hidden">
    <EditorSideBar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <Topbar />
      <main className="flex-1 overflow-y-auto pxy-6 ">
        {children}
      </main>
    </div>
  </div>
);
export default EditorLayout;