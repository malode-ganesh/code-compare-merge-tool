import React, { useState, useRef } from "react";
import { DiffEditor } from "@monaco-editor/react";
import { useEffect } from "react";


// Extension -> language map
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
};

export default function App() {
  const [fileA, setFileA] = useState("");
  const [fileB, setFileB] = useState("");
  const [fileAName, setFileAName] = useState("File A");
  const [fileBName, setFileBName] = useState("File B");
  const [language, setLanguage] = useState("plaintext");

  const originalEditorRef = useRef(null);
  const modifiedEditorRef = useRef(null);

  useEffect(() => {
    document.title = "Free Online Code Compare & Merge Tool | Ganesh Malode";
  }, []);

  // detect language
  const detectLanguage = (name) => {
    const ext = name.split(".").pop().toLowerCase();
    return languageMap[ext] || "plaintext";
  };

  // read file
  const handleFile = (file, setter, nameSetter) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setter(e.target.result);
    reader.readAsText(file);
    nameSetter(file.name);
    setLanguage(detectLanguage(file.name));
  };

  // drag & drop
  const handleDrop = (e, setter, nameSetter) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file, setter, nameSetter);
  };

  // capture editors
  const handleMount = (editor) => {
    originalEditorRef.current = editor.getOriginalEditor();
    modifiedEditorRef.current = editor.getModifiedEditor();
  };

  // apply left -> right
  const applyLeftToRight = () => {
    const v = originalEditorRef.current.getValue();
    modifiedEditorRef.current.setValue(v);
    setFileB(v);
  };

  // apply right -> left
  const applyRightToLeft = () => {
    const v = modifiedEditorRef.current.getValue();
    originalEditorRef.current.setValue(v);
    setFileA(v);
  };

  // revert
  const revert = () => {
    originalEditorRef.current.setValue(fileA);
    modifiedEditorRef.current.setValue(fileB);
  };

  // save merged
  const saveMerged = () => {
    const content = modifiedEditorRef.current.getValue();

    // derive clean filename from second file
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
    <div style={styles.page}>
      <h1 style={styles.title}>⚡ Code Compare & Merge Tool</h1>
      <p style={styles.subtitle}>VS Code like diff • Drag & Drop • Merge • Revert</p>

      {/* Upload boxes */}
      <div style={styles.uploadRow}>
        {/* <div style={{textAlign:'center', marginBottom:6, color:'#aaa'}}>Original File</div>
        <div style={{textAlign:'center', marginBottom:6, color:'#aaa'}}>Comparing File</div> */}
        <div
          style={styles.dropBox}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, setFileA, setFileAName)}
        >
          <h3>{fileAName}</h3>
          <input
            type="file"
            onChange={(e) => handleFile(e.target.files[0], setFileA, setFileAName)}
          />
          <div style={{textAlign:'center', marginBottom:6, color:'#aaa'}}>Original File</div>
        </div>

        <div
          style={styles.dropBox}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, setFileB, setFileBName)}
        >
          <h3>{fileBName}</h3>
          <input
            type="file"
            onChange={(e) => handleFile(e.target.files[0], setFileB, setFileBName)}
          />
          <div style={{textAlign:'center', marginBottom:6, color:'#aaa'}}>Comparing File</div>
        </div>
      </div>

      {/* Buttons */}
      {fileA && fileB && (
        <div style={styles.actions}>
          <button onClick={applyLeftToRight}>⬅ Apply Left → Right</button>
          <button onClick={applyRightToLeft}>Apply Right → Left ➡</button>
          <button onClick={revert}>♻ Revert</button>
          <button onClick={saveMerged}>💾 Save Merged</button>
        </div>
      )}

      {/* Diff Editor */}
      {fileA && fileB && (
        <div style={styles.editorWrapper}>
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

/* ------------------ STYLES ------------------ */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
    padding: 20,
    color: "white",
    fontFamily: "Segoe UI, sans-serif",
  },

  title: {
    textAlign: "center",
    fontSize: "clamp(22px, 4vw, 32px)",
    marginBottom: 5,
  },

  subtitle: {
    textAlign: "center",
    color: "#ddd",
    marginBottom: 25,
    fontSize: "clamp(14px, 3vw, 16px)",
  },

  uploadRow: {
    display: "flex",
    gap: 20,
    justifyContent: "center",
    marginBottom: 20,
    flexWrap: "wrap",       // ⭐ important
  },

  dropBox: {
    width: "min(100%, 260px)",   // ⭐ responsive width
    height: 130,
    border: "2px dashed #aaa",
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.05)",
  },

  actions: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginBottom: 15,
    flexWrap: "wrap",       // ⭐ wrap buttons on small screen
  },

  editorWrapper: {
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 0 20px rgba(0,0,0,0.6)",
  },
};

