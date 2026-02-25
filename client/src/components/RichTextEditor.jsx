import { lazy, Suspense, useMemo } from "react";

const JoditEditor = lazy(() => import("jodit-react"));

function RichTextEditor({
  value,
  onChange,
  onBlur,
  placeholder = "Start typing...",
}) {
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder,
      minHeight: 400,
      toolbar: true,
      spellcheck: true,
      language: "en",
      toolbarButtonSize: "medium",
      toolbarAdaptive: false,
      showCharsCounter: true,
      showWordsCounter: true,
      showXPathInStatusbar: false,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      buttons: [
        "source",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "|",
        "outdent",
        "indent",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "image",
        "table",
        "link",
        "|",
        "align",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
        "copyformat",
        "|",
        "symbol",
        "fullsize",
        "print",
      ],
      uploader: {
        insertImageAsBase64URI: true,
      },
      removeButtons: ["about"],
    }),
    [placeholder],
  );

  return (
    <Suspense
      fallback={
        <div className="h-96 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Loading editor...</span>
        </div>
      }
    >
      <JoditEditor
        value={value}
        config={config}
        onBlur={onBlur}
        onChange={onChange}
      />
    </Suspense>
  );
}

export default RichTextEditor;
