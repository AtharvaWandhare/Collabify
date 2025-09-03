"use client";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Level } from "@tiptap/extension-heading";
import { useEditorStore } from "@/store/use-editor-store";
import {
    AlignCenterIcon,
    AlignJustifyIcon,
    AlignLeftIcon,
    AlignRightIcon,
    BoldIcon,
    ChevronDownIcon,
    Highlighter,
    ImageIcon,
    ItalicIcon,
    Link2,
    ListCollapseIcon,
    ListIcon,
    ListOrderedIcon,
    ListTodoIcon,
    LucideIcon,
    MessageSquarePlusIcon,
    MinusIcon,
    PlusIcon,
    PrinterIcon,
    Redo2Icon,
    RemoveFormattingIcon,
    SearchIcon,
    SpellCheckIcon,
    Underline,
    Undo2Icon,
    UploadIcon
} from "lucide-react";
import { ReactElement, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ColorResult, SketchPicker } from "react-color";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function LineHeightButton() {
    const { editor } = useEditorStore();

    const lineHeights = [
        { label: "Default", value: "normal" },
        { label: "Single", value: "1" },
        { label: "1.15", value: "1.15" },
        { label: "1.5", value: "1.5" },
        { label: "Double", value: "2" }
    ]

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                        <ListCollapseIcon className="size-4" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                    {lineHeights.map(({ label, value }) => (
                        // <DropdownMenuItem key={value}>
                        <button
                            key={value}
                            onClick={() => editor?.chain().focus().setLineHeight(value).run()}
                            className={cn(
                                "flex items-center gap-x-2 py-1 px-2 rounded-sm hover:bg-neutral-200/80",
                                editor?.getAttributes("paragraph").lineHeight === value && "bg-neutral-200/80"
                            )}
                        >
                            {/* <Icon className="size-4" /> */}
                            <span className="text-sm">{label}</span>
                        </button>
                        // <DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

function FontSizeButton() {
    const { editor } = useEditorStore();

    const currentFontSize = editor?.getAttributes("textStyle").fontSize ? editor?.getAttributes("textStyle").fontSize.replace("px", "") : "16";

    const [fontSize, setFontSize] = useState(currentFontSize);
    const [inputValue, setInputValue] = useState(fontSize);
    const [isEditing, setIsEditing] = useState(false);

    const updateFontSize = (newSize: string) => {
        const size = parseInt(newSize);
        if (!isNaN(size) && size > 0) {
            editor?.chain().focus().setFontSize(`${size}px`).run();
            setFontSize(newSize);
            setInputValue(newSize);
            setIsEditing(false);
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleInputBlur = () => {
        updateFontSize(inputValue);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            updateFontSize(inputValue);
            editor?.commands.focus();
        }
    }

    const increment = () => {
        const newSize = parseInt(fontSize) + 1;
        updateFontSize(newSize.toString());
    }

    const decrement = () => {
        const newSize = parseInt(fontSize) - 1;
        if (newSize > 0) {
            updateFontSize(newSize.toString());
        }
    }

    return (
        <>
            <div className="flex items-center gap-x-0.5">
                <button
                    className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
                    onClick={decrement}
                >
                    <MinusIcon className="size-4" />
                </button>
                {isEditing ? (
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onKeyDown={handleKeyDown}
                        className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transparent focus:outline-none focus:ring-0"
                    />
                ) : (
                    <button
                        className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transparent cursor-text"
                        onClick={() => {
                            setIsEditing(true);
                            setFontSize(currentFontSize);
                            setInputValue(currentFontSize);
                        }}
                    >
                        {currentFontSize}
                    </button>
                )}
                <button
                    className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
                    onClick={increment}
                >
                    <PlusIcon className="size-4" />
                </button>
            </div>
        </>
    )
}

function ListButton() {
    const { editor } = useEditorStore();

    const lists = [
        {
            label: "Bullet List",
            icon: ListIcon,
            isActive: () => editor?.isActive("bulletList"),
            onClick: () => editor?.chain().focus().toggleBulletList().run()
        },
        {
            label: "Ordered List",
            icon: ListOrderedIcon,
            isActive: () => editor?.isActive("orderedList"),
            onClick: () => editor?.chain().focus().toggleOrderedList().run()
        },
    ]

    const getCurrentList = () => {
        if (editor?.isActive("bulletList")) return ListIcon;
        if (editor?.isActive("orderedList")) return ListOrderedIcon;
        return ListIcon; // default
    };

    const CurrentListIcon = getCurrentList();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                        <CurrentListIcon className="size-4" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                    {lists.map(({ label, icon: Icon, onClick, isActive }) => (
                        <button
                            key={label}
                            onClick={onClick}
                            className={cn(
                                "flex items-center gap-x-2 py-1 px-2 rounded-sm hover:bg-neutral-200/80",
                                isActive() && "bg-neutral-200/80"
                            )}
                        >
                            <Icon className="size-4" />
                            <span className="text-sm">{label}</span>
                        </button>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

function AlignButton() {
    const { editor } = useEditorStore();

    const alignments = [
        { label: "Align Left", value: "left", icon: AlignLeftIcon },
        { label: "Align Center", value: "center", icon: AlignCenterIcon },
        { label: "Align Right", value: "right", icon: AlignRightIcon },
        { label: "Align Justify", value: "justify", icon: AlignJustifyIcon }
    ]

    const getCurrentAlignment = () => {
        if (editor?.isActive({ textAlign: "left" })) return AlignLeftIcon;
        if (editor?.isActive({ textAlign: "center" })) return AlignCenterIcon;
        if (editor?.isActive({ textAlign: "right" })) return AlignRightIcon;
        if (editor?.isActive({ textAlign: "justify" })) return AlignJustifyIcon;
        return AlignLeftIcon; // default
    };

    const CurrentAlignIcon = getCurrentAlignment();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                        <CurrentAlignIcon className="size-4" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                    {alignments.map(({ label, value, icon: Icon }) => (
                        // <DropdownMenuItem key={value}>
                        <button
                            key={value}
                            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
                            className={cn(
                                "flex items-center gap-x-2 py-1 px-2 rounded-sm hover:bg-neutral-200/80",
                                editor?.isActive({ textAlign: value }) && "bg-neutral-200/80"
                            )}
                        >
                            <Icon className="size-4" />
                            <span className="text-sm">{label}</span>
                        </button>
                        // <DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

function ImageButton() {
    const { editor } = useEditorStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState(editor?.getAttributes("image").src || "");

    const onChange = (src: string) => {
        editor?.chain().focus().setImage({ src }).run();
        setImageUrl("")
    }

    const onUpload = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const src = (e.target as FileReader).result as string;
                    onChange(src);
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    }

    const handleImageUrlSubmit = () => {
        if (imageUrl) {
            onChange(imageUrl);
            setImageUrl("");
            setIsDialogOpen(false);
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                        <ImageIcon className="size-4" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={onUpload}>
                        <UploadIcon className="size-4 mr-2" />
                        Upload
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                        <SearchIcon className="size-4 mr-2" />
                        Paste Image Url
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Paste Image URL</DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder="https://example.com/image.png"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleImageUrlSubmit();
                            }
                        }}
                    />
                    <DialogFooter>
                        <Button onClick={handleImageUrlSubmit}>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )

}

function LinkButton() {
    const { editor } = useEditorStore();
    const [value, setValue] = useState(editor?.getAttributes("link").href || "");

    const onChange = (href: string) => {
        editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
        setValue("")
    }

    return (
        <>
            <DropdownMenu onOpenChange={(open) => {
                if (open) {
                    setValue(editor?.getAttributes("link").href || "");
                }
            }}>
                <DropdownMenuTrigger asChild>
                    <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                        <Link2 className="size-4" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
                    <Input
                        placeholder="https://example.com"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                onChange(value);
                            }
                        }}
                    />
                    <Button onClick={() => onChange(value)}>Apply</Button>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )

}

function HighlightColorButton() {
    const { editor } = useEditorStore();

    const value = editor?.getAttributes("highlight").color || "#FFFF00";

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({ color: color.hex }).run();
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                        <Highlighter className="size-4" />
                        <div style={{ backgroundColor: value }} className="h-1 w-full" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-0">
                    <SketchPicker color={value} onChange={onChange} />
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

function TextColorButton() {
    const { editor } = useEditorStore();

    const value = editor?.getAttributes("textStyle").color || "#000000";

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setColor(color.hex).run();
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                        <span className="text-xs">A</span>
                        <div style={{ backgroundColor: value }} className="h-1 w-full" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-0">
                    <SketchPicker color={value} onChange={onChange} />
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

function HeadingLevelButton(): ReactElement {
    const { editor } = useEditorStore();
    const headings = [
        { label: "Normal", value: 0, fontSize: "16px" },
        { label: "Heading 1", value: 1, fontSize: "32px" },
        { label: "Heading 2", value: 2, fontSize: "24px" },
        { label: "Heading 3", value: 3, fontSize: "20px" },
        { label: "Heading 4", value: 4, fontSize: "18px" },
        { label: "Heading 5", value: 5, fontSize: "16px" },
    ];

    const getCurrentHeading = () => {
        for (let level = 1; level <= 5; level++) {
            if (editor?.isActive("heading", { level })) {
                return `Heading ${level}`;
            }
        }
        return "Normal";
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="h-7 min-w-4 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                        <span className="truncate">{getCurrentHeading()}</span>
                        <ChevronDownIcon className="ml-2 size-4 shrink-0" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {headings.map(({ value, label, fontSize }) => (
                        <DropdownMenuItem asChild key={value}>
                            <button
                                style={{ fontSize }}
                                onClick={() => {
                                    if (value === 0) {
                                        editor?.chain().focus().setParagraph().run();
                                    } else {
                                        editor?.chain().focus().toggleHeading({ level: value as Level }).run();
                                    }
                                }}
                                className={cn(
                                    "flex items-center gap-x-2 py-1 rounded-sm hover:bg-neutral-200/80",
                                    value === 0 && !editor?.isActive("heading") || editor?.isActive("heading", { level: value }) && "bg-neutral-200/80"
                                )}
                            >
                                {label}
                            </button>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu >
        </>
    )
}

function FontFamilyButton(): ReactElement {
    const { editor } = useEditorStore();

    const fonts = [
        { label: "Arial", value: "Arial" },
        { label: "Courier New", value: "Courier New" },
        { label: "Georgia", value: "Georgia" },
        { label: "Times New Roman", value: "Times New Roman" },
        { label: "Verdana", value: "Verdana" },
        { label: "Inter", value: "Inter" },
        { label: "Comic Sans", value: "Comic Sans MS" },
        { label: "monospace", value: "monospace" },
        { label: "cursive", value: "cursive" },
        { label: "Exo 2", value: "Exo 2" },
    ];

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                        <span className="truncate">{editor?.getAttributes("textStyle").fontFamily || "Arial"}</span>
                        <ChevronDownIcon className="ml-2 size-4 shrink-0" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                    {fonts.map(({ value, label }) => (
                        <DropdownMenuItem asChild key={value}>
                            <button
                                key={value}
                                onClick={() => editor?.chain().focus().setFontFamily(value).run()}
                                className={cn(
                                    "flex items-center gap-x-2 py-1 rounded-sm hover:bg-neutral-200/80",
                                    editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
                                )}
                                style={{ fontFamily: value }}
                            >
                                <span className="text-sm">
                                    {label}
                                </span>
                            </button>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

interface ToolBarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
}

function ToolBarButton({ onClick, isActive, icon: Icon }: ToolBarButtonProps): ReactElement {
    return (
        <button
            onClick={onClick}
            className={cn(
                "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
                isActive && "bg-neutral-200/80"
            )}
        >
            <Icon className="size-4" />
        </button>
    );
}

export default function Toolbar() {

    const { editor } = useEditorStore()
    console.log("ToolBar Editor: ", { editor });

    const sections: {
        label: string; icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean;
    }[][] = [
            [
                {
                    label: "Undo",
                    icon: Undo2Icon,
                    onClick: () => editor?.chain().focus().undo().run(),
                },
                {
                    label: "Redo",
                    icon: Redo2Icon,
                    onClick: () => editor?.chain().focus().redo().run(),
                },
                {
                    label: "Spell Check",
                    icon: SpellCheckIcon,
                    onClick: () => {
                        const current = editor?.view.dom.getAttribute("spellcheck");
                        const next = current === "true" ? "false" : "true";
                        editor?.view.dom.setAttribute("spellcheck", next);
                    },
                },
                {
                    label: "Print",
                    icon: PrinterIcon,
                    onClick: () => window.print()
                }
            ],
            [
                {
                    label: "Bold",
                    icon: BoldIcon,
                    onClick: () => editor?.chain().focus().toggleBold().run(),
                    isActive: editor?.isActive("bold")
                },
                {
                    label: "Italic",
                    icon: ItalicIcon,
                    onClick: () => editor?.chain().focus().toggleItalic().run(),
                    isActive: editor?.isActive("italic")
                },
                {
                    label: "Underline",
                    icon: Underline,
                    onClick: () => editor?.chain().focus().toggleUnderline().run(),
                    isActive: editor?.isActive("underline")
                }
            ],
            [
                {
                    label: "Comment",
                    icon: MessageSquarePlusIcon,
                    onClick: () => console.log("Add Comment Clicked"),
                    isActive: false
                },
                {
                    label: "List Todo",
                    icon: ListTodoIcon,
                    onClick: () => editor?.chain().focus().toggleTaskList().run(),
                    isActive: editor?.isActive("taskList")
                },
                {
                    label: "Remove Formatting",
                    icon: RemoveFormattingIcon,
                    onClick: () => editor?.chain().focus().unsetAllMarks().run()
                }
            ]
        ];

    return (
        <>
            <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto print:hidden">
                {sections[0].map((item) => <ToolBarButton key={item.label} {...item} />)}
                <Separator orientation="vertical" className="mx-1 min-h-5 bg-neutral-500" />

                <HeadingLevelButton />
                <Separator orientation="vertical" className="mx-1 min-h-5 bg-neutral-500" />

                <FontFamilyButton />
                <Separator orientation="vertical" className="mx-1 min-h-5 bg-neutral-500" />

                <FontSizeButton />
                <Separator orientation="vertical" className="mx-1 min-h-5 bg-neutral-500" />

                {sections[1].map((item) => <ToolBarButton key={item.label} {...item} />)}
                <Separator orientation="vertical" className="mx-1 min-h-5 bg-neutral-500" />

                <TextColorButton />
                <Separator orientation="vertical" className="mx-1 min-h-5 bg-neutral-500" />

                <HighlightColorButton />
                <Separator orientation="vertical" className="mx-1 min-h-5 bg-neutral-500" />

                <LinkButton />
                <Separator orientation="vertical" className="mx-1 min-h-5 bg-neutral-500" />

                {sections[2].map((item) => <ToolBarButton key={item.label} {...item} />)}
                <Separator orientation="vertical" className="mx-1 min-h-5 bg-neutral-500" />

                <ImageButton />
                <Separator orientation="vertical" className="mx-1 min-h-5 bg-neutral-500" />

                <AlignButton />
                <Separator orientation="vertical" className="mx-1 min-h-5 bg-neutral-500" />

                <ListButton />
                <Separator orientation="vertical" className="mx-1 min-h-5 bg-neutral-500" />

                <LineHeightButton />
                <Separator orientation="vertical" className="mx-1 min-h-5 bg-neutral-500" />
            </div>
        </>
    );
}