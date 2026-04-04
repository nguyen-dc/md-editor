"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';
import { Bold, Italic, Heading1, Heading2, List, ListOrdered } from 'lucide-react';

// This is the menu bar sitting above your text editor
const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  return (
    <div className="flex gap-2 p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-300' : ''}`}
      >
        <Heading1 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-300' : ''}`}
      >
        <Heading2 size={18} />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1 my-auto"></div>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-300' : ''}`}
      >
        <Bold size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-300' : ''}`}
      >
        <Italic size={18} />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1 my-auto"></div>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-300' : ''}`}
      >
        <List size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-300' : ''}`}
      >
        <ListOrdered size={18} />
      </button>
    </div>
  );
};

// This is the main Editor Component you will import into your pages
export default function MdEditor({ initialMarkdown, onChange }: { initialMarkdown: string, onChange: (md: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown, // This tells Tiptap to read and output Markdown
    ],
    content: initialMarkdown,
    editorProps: {
      attributes: {
        // Tailwind classes to make the text area look good and behave like a document
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none p-4 min-h-[400px]',
      },
    },
    onUpdate: ({ editor }) => {
      // Whenever the user types, convert the content back to Markdown and send it up
      const markdownOutput = editor.getText();
      onChange(markdownOutput);
    },
  });

  return (
    <div className="border border-gray-300 rounded-lg shadow-sm bg-white">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}