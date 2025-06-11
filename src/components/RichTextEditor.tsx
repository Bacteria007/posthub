import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@/components/ui/button';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Strikethrough,
  Code,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
  title: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ onClick, isActive, children, title }) => (
  <Button
    type="button"
    variant={isActive ? 'default' : 'ghost'}
    size="sm"
    onClick={onClick}
    title={title}
    className={cn(
      'transition-all duration-200 hover:scale-105',
      isActive && 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
    )}
  >
    {children}
  </Button>
);

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  placeholder = "Start writing your masterpiece...",
  className
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc ml-5',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal ml-5',
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: 'border-l-4 border-gray-300 pl-4 italic',
          },
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      console.log('Editor Content:', editor.getHTML()); // Debug log
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl mx-auto focus:outline-none max-w-none',
      },
    },
  });

  if (!editor) return null;

  const iconSize = 'size-4';

  const setOrderedList = () => {
    editor.chain().focus().toggleOrderedList().run();
    console.log('Ordered List Toggled, Is Active:', editor.isActive('orderedList')); // Debug log
  };

  return (
    <div className={cn("w-full mx-auto", className)}>
      <div className="rounded-md border border-gray-200 bg-white overflow-hidden">

        {/* Toolbar */}
        <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="px-4 py-3 flex flex-wrap gap-1">
            {/* Text Formatting */}
            <div className="flex gap-1 mr-3">
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive('bold')}
                title="Bold"
              >
                <Bold className={iconSize} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive('italic')}
                title="Italic"
              >
                <Italic className={iconSize} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                isActive={editor.isActive('strike')}
                title="Strikethrough"
              >
                <Strikethrough className={iconSize} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleCode().run()}
                isActive={editor.isActive('code')}
                title="Inline Code"
              >
                <Code className={iconSize} />
              </ToolbarButton>
            </div>

            {/* Lists */}
            <div className="flex gap-1 mr-3">
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editor.isActive('bulletList')}
                title="Bullet List"
              >
                <List className={iconSize} />
              </ToolbarButton>
              <ToolbarButton
                onClick={setOrderedList}
                isActive={editor.isActive('orderedList')}
                title="Numbered List"
              >
                <ListOrdered className={iconSize} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                isActive={editor.isActive('blockquote')}
                title="Quote"
              >
                <Quote className={iconSize} />
              </ToolbarButton>
            </div>
          </div>
        </div>

        {/* Editor Content */}
        <div className="relative">
          <EditorContent
            autoFocus={true}
            editor={editor}
            className="h-[200px] overflow-y-auto px-6 py-6 focus:outline-none bg-gradient-to-br from-white to-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;