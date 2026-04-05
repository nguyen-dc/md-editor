"use client";

import { useEditor, EditorContent, Extension } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import { Markdown, type MarkdownStorage } from 'tiptap-markdown';
import Placeholder from '@tiptap/extension-placeholder';
import GlobalDragHandle from 'tiptap-extension-global-drag-handle';
import { Bold, Italic, Heading1, Heading2, List, Quote } from 'lucide-react';

export default function MdEditor({ initialMarkdown, onChange }: { initialMarkdown: string, onChange: (md: string) => void }) {

  const ListFixExtension = Extension.create({
    name: 'listFix',

    addKeyboardShortcuts() {
      return {
        Enter: () => {
          // 1. Check if the user is currently inside a list
          if (this.editor.isActive('listItem')) {
            const { $from } = this.editor.state.selection;

            // 2. Check if the current line (paragraph inside the list) is completely empty
            if ($from.parent.textContent.length === 0) {

              // 3. Force Tiptap to "lift" the item (break out of the list)
              // Returning true tells Tiptap: "I handled this, stop doing default stuff."
              return this.editor.commands.liftListItem('listItem');
            }
          }

          // If the line is NOT empty, return false to let Tiptap do its normal Enter behavior
          return false;
        },
      };
    },
  });
  const editor = useEditor({
    // Enable immediatelyRender to prevent Next.js hydration mismatch errors
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Markdown,
      Placeholder.configure({
        placeholder: "Type '/' for commands",
        emptyEditorClass: 'is-editor-empty',
      }),
      GlobalDragHandle.configure({
        dragHandleWidth: 28,
        scrollTreshold: 100,
      }),
      ListFixExtension,
    ],
    content: initialMarkdown,
    editorProps: {
      attributes: {
        class: 'prose prose-stone max-w-none focus:outline-none min-h-[500px] px-12 py-8',
      },
    },
    onUpdate: ({ editor }) => {
      const markdown = (editor.storage as unknown as { markdown: MarkdownStorage })
        .markdown;
      onChange(markdown.getMarkdown());
    },
  });

  if (!editor) return null;

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200">
      <BubbleMenu
        editor={editor}
        options={{ placement: 'top' }}
        className="flex bg-gray-900 text-white rounded-lg shadow-xl overflow-hidden"
      >
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 hover:bg-gray-700 transition ${editor.isActive('heading', { level: 1 }) ? 'text-blue-400' : ''}`}
        >
          <Heading1 size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 hover:bg-gray-700 transition ${editor.isActive('heading', { level: 2 }) ? 'text-blue-400' : ''}`}
        >
          <Heading2 size={18} />
        </button>
        <div className="w-px bg-gray-700 my-2 mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 hover:bg-gray-700 transition ${editor.isActive('bold') ? 'text-blue-400' : ''}`}
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 hover:bg-gray-700 transition ${editor.isActive('italic') ? 'text-blue-400' : ''}`}
        >
          <Italic size={18} />
        </button>
        <div className="w-px bg-gray-700 my-2 mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 hover:bg-gray-700 transition ${editor.isActive('bulletList') ? 'text-blue-400' : ''}`}
        >
          <List size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 hover:bg-gray-700 transition ${editor.isActive('blockquote') ? 'text-blue-400' : ''}`}
        >
          <Quote size={18} />
        </button>
      </BubbleMenu>

      <EditorContent editor={editor} />
    </div>
  );
}