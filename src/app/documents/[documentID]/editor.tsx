'use client';
import { ReactElement } from 'react';
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TableKit } from "@tiptap/extension-table";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image"
import { FontFamily, TextStyle, Color } from '@tiptap/extension-text-style';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align'

import { useEditorStore } from "@/store/use-editor-store";
import { FontSizeExtension } from '@/extensions/font-size';
import { LineHeightExtension } from '@/extensions/line-height';
import { Ruler } from './Ruler';

export default function Editor(): ReactElement {
    const { setEditor } = useEditorStore();
    const editor = useEditor({
        onCreate({ editor }) {
            setEditor(editor);
        },
        onDestroy() {
            setEditor(null);
        },
        onUpdate({ editor }) {
            setEditor(editor);
        },
        onSelectionUpdate({ editor }) {
            setEditor(editor);
        },
        onTransaction({ editor }) {
            setEditor(editor);
        },
        onFocus({ editor }) {
            setEditor(editor);
        },
        onBlur({ editor }) {
            setEditor(editor);
        },
        onContentError({ editor }) {
            setEditor(editor);
        },
        editorProps: {
            attributes: {
                style: "padding-left: 56px; padding-right: 56px;",
                class: 'focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pl-14 pb-10 cursor-text'
            }
        },
        extensions: [
            StarterKit,
            Underline,
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            TableKit,
            Image,
            ImageResize,
            FontFamily,
            TextStyle,
            Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
            Color,
            Highlight.configure({ multicolor: true }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: 'https',
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            FontSizeExtension,
            LineHeightExtension
        ],
        content: `
            <p>Hello World! 🌎️</p>
            <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>
        <ul data-type="taskList">
          <li data-type="taskItem" data-checked="true">A list item</li>
          <li data-type="taskItem" data-checked="false">And another one</li>
        </ul>
        `,
        // Don't render immediately on the server to avoid SSR issues
        immediatelyRender: false,
    });

    return (
        <>
            <div className='size-full overflow-x-auto bg-[#F9FDFD] px-4 print:p-0 print:bg-white print:overflow-visible'>
                <Ruler />
                <div className='min-w-max flex justify-center w-[816px] py-y print:py-0 mx-auto print:w-full print:min-w-0'>
                    <EditorContent editor={editor} />
                </div>
            </div>
        </>
    );
}