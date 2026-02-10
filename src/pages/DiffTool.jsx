import React, { useState, useRef } from "react";
import { DiffEditor } from "@monaco-editor/react";

const languageMap = {
  js: "javascript",
  jsx: "javascript",
  ts: "typescript",
  java: "java",
  py: "python",
  json: "json",
  xml: "xml",
  html: "html",
  css: "css",
  yml: "yaml",
  yaml: "yaml",
  md: "markdown",
  sql: "sql",
  php: "php",
};

export default function DiffTool() {
  const [fileA, setFileA] = useState("");
  const [fileB, setFileB] = useState("");
  const [fileAName, setFileAName] = useState("File A");
  const [fileBName, setFileBName] = useState("File B");
  const [language, setLanguage] = useState("plaintext");

  const originalEditorRef = useRef(null);
  const modifiedEditorRef = useRef(null);

  const detectLanguage = (name) => {
    const ext = name.split(".").pop().toLowerCase();
    return languageMap[ext] || "plaintext";
  };

  const handleFile = (file, setter, nameSetter) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setter(e.target.result);
    reader.readAsText(file);
    nameSetter(file.name);
    setLanguage(detectLanguage(file.name));
  };

  const handleDrop = (e, setter, nameSetter) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file, setter, nameSetter);
  };

  const handleMount = (editor) => {
    originalEditorRef.current = editor.getOriginalEditor();
    modifiedEditorRef.current = editor.getModifiedEditor();
  };

  const applyLeftToRight = () => {
    const v = originalEditorRef.current.getValue();
    modifiedEditorRef.current.setValue(v);
    setFileB(v);
  };

  const applyRightToLeft = () => {
    const v = modifiedEditorRef.current.getValue();
    originalEditorRef.current.setValue(v);
    setFileA(v);
  };

  const revert = () => {
    originalEditorRef.current.setValue(fileA);
    modifiedEditorRef.current.setValue(fileB);
  };

  const saveMerged = () => {
    const content = modifiedEditorRef.current.getValue();
    const name = fileBName || "merged-file.txt";
    const parts = name.split(".");
    const extension = parts.pop();
    const base = parts[parts.length - 1];
    const finalName = `${base}.${extension}`;
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = finalName;
    link.click();
  };

  return (
    <div className="diff-tool-page">
      <h1>Code Compare &amp; Merge Tool</h1>
      <p className="subtitle">
        VS Code like diff &bull; Drag &amp; Drop &bull; Merge &bull; Revert
      </p>

      <div className="upload-row">
        <div
          className="drop-box"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, setFileA, setFileAName)}
        >
          <h3>{fileAName}</h3>
          <input
            type="file"
            onChange={(e) =>
              handleFile(e.target.files[0], setFileA, setFileAName)
            }
          />
          <div className="drop-label">Original File</div>
        </div>

        <div
          className="drop-box"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, setFileB, setFileBName)}
        >
          <h3>{fileBName}</h3>
          <input
            type="file"
            onChange={(e) =>
              handleFile(e.target.files[0], setFileB, setFileBName)
            }
          />
          <div className="drop-label">Comparing File</div>
        </div>
      </div>

      {fileA && fileB && (
        <div className="diff-actions">
          <button onClick={applyLeftToRight}>Apply Left &rarr; Right</button>
          <button onClick={applyRightToLeft}>Apply Right &rarr; Left</button>
          <button onClick={revert}>Revert</button>
          <button onClick={saveMerged}>Save Merged</button>
        </div>
      )}

      {fileA && fileB && (
        <div className="editor-wrapper">
          <DiffEditor
            height="500px"
            original={fileA}
            modified={fileB}
            language={language}
            theme="vs-dark"
            onMount={handleMount}
            options={{
              renderSideBySide: true,
              automaticLayout: true,
              lineNumbers: "on",
            }}
          />
        </div>
      )}
    </div>
  );
}
