"use client";

import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { FieldLabel } from "./FieldLabel";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaQuoteRight,
  FaCode,
  FaImage,
  FaUndo,
  FaRedo,
  FaSpinner,
} from "react-icons/fa";
import {
  destroyCloudinaryAsset,
  isCloudinaryUrl,
  type UploadFolder,
} from "../../../features/upload/api";
import { useCloudinaryUpload } from "../../../features/upload/hooks/useCloudinaryUpload";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  label?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  minHeight?: string;
  imageFolder?: UploadFolder;
}

function cloudinarySrcs(html: string): string[] {
  const urls = new Set<string>();
  const matches = html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi);
  for (const match of matches) {
    if (isCloudinaryUrl(match[1])) urls.add(match[1]);
  }
  return [...urls];
}

export function RichTextEditor({
  content,
  onChange,
  label,
  error,
  required,
  placeholder = "Start typing...",
  minHeight = "180px",
  imageFolder,
}: RichTextEditorProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const htmlRef = useRef(content || "");
  const { uploadFile, isUploading, error: uploadError } = useCloudinaryUpload();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full rounded-md",
        },
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const removed = cloudinarySrcs(htmlRef.current).filter(
        (src) => !cloudinarySrcs(html).includes(src)
      );
      htmlRef.current = html;
      onChange(html);
      if (imageFolder) {
        removed.forEach((src) => {
          destroyCloudinaryAsset(src, "image").catch(() => {
            toast.error("Could not delete a removed image from Cloudinary");
          });
        });
      }
    },
    editorProps: {
      attributes: {
        class:
          "max-w-none px-4 py-3 text-sm text-gray-800 focus:outline-none [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:text-base [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (content !== current) {
      editor.commands.setContent(content || "", { emitUpdate: false });
      htmlRef.current = content || "";
    }
  }, [content, editor]);

  if (!editor) return null;

  const toolbarButtonClass = (isActive: boolean) =>
    `rounded-md p-2 text-sm transition-colors ${
      isActive
        ? "bg-customLightBlue2 text-white"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

  return (
    <div className="w-full space-y-1.5">
      {label && <FieldLabel required={required}>{label}</FieldLabel>}

      <div
        className={`overflow-hidden rounded-lg border ${
          error ? "border-red-400" : "border-gray-300"
        } focus-within:border-customLightBlue2 focus-within:ring-2 focus-within:ring-customLightBlue2`}
      >
        <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 px-2 py-1.5">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={toolbarButtonClass(editor.isActive("bold"))}
            title="Bold"
          >
            <FaBold className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={toolbarButtonClass(editor.isActive("italic"))}
            title="Italic"
          >
            <FaItalic className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={toolbarButtonClass(editor.isActive("strike"))}
            title="Strikethrough"
          >
            <FaStrikethrough className="h-3.5 w-3.5" />
          </button>
          <div className="mx-1 h-5 w-px bg-gray-300" />
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={toolbarButtonClass(editor.isActive("heading", { level: 2 }))}
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={toolbarButtonClass(editor.isActive("heading", { level: 3 }))}
            title="Heading 3"
          >
            H3
          </button>
          <div className="mx-1 h-5 w-px bg-gray-300" />
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={toolbarButtonClass(editor.isActive("bulletList"))}
            title="Bullet List"
          >
            <FaListUl className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={toolbarButtonClass(editor.isActive("orderedList"))}
            title="Ordered List"
          >
            <FaListOl className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={toolbarButtonClass(editor.isActive("blockquote"))}
            title="Blockquote"
          >
            <FaQuoteRight className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={toolbarButtonClass(editor.isActive("codeBlock"))}
            title="Code Block"
          >
            <FaCode className="h-3.5 w-3.5" />
          </button>
          {imageFolder && (
            <>
              <div className="mx-1 h-5 w-px bg-gray-300" />
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                disabled={isUploading}
                className={toolbarButtonClass(false)}
                title="Insert image"
              >
                {isUploading ? (
                  <FaSpinner className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <FaImage className="h-3.5 w-3.5" />
                )}
              </button>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
                className="hidden"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (!file || !imageFolder) return;
                  const url = await uploadFile(file, imageFolder, "image");
                  if (url) editor.chain().focus().setImage({ src: url }).run();
                  if (imageInputRef.current) imageInputRef.current.value = "";
                }}
              />
            </>
          )}
          <div className="mx-1 h-5 w-px bg-gray-300" />
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className={`rounded-md p-2 text-sm transition-colors ${
              !editor.can().undo()
                ? "cursor-not-allowed text-gray-300"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
            title="Undo"
          >
            <FaUndo className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className={`rounded-md p-2 text-sm transition-colors ${
              !editor.can().redo()
                ? "cursor-not-allowed text-gray-300"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
            title="Redo"
          >
            <FaRedo className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="relative" style={{ minHeight }}>
          <EditorContent editor={editor} />
          {editor.isEmpty && (
            <span className="pointer-events-none absolute left-4 top-3 text-sm text-gray-400">
              {placeholder}
            </span>
          )}
        </div>
      </div>

      {(error || uploadError) && (
        <p className="text-xs text-red-600">{error || uploadError}</p>
      )}
    </div>
  );
}
