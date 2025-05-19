import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import A4Paper from "./a4Paper";

// Custom Toolbar with fixed positioning and keyboard shortcut comments
const CustomToolbar = () => (
  <div id="toolbar" style={{ position: "sticky", top: 100, zIndex: 100, background: "#fff" }}>
    <span className="ql-formats">
      <button className="ql-bold" title="Negrita (Ctrl+B)" />
      <button className="ql-italic" title="Cursiva (Ctrl+I)" />
      <button className="ql-underline" title="Subrayado (Ctrl+U)" />
      <button className="ql-strike" title="Tachado" />
    </span>

    <span className="ql-formats">
      <button className="ql-list" value="ordered" title="Lista ordenada" />
      <button className="ql-list" value="bullet" title="Lista con viñetas" />
    </span>

    <span className="ql-formats">
      <select className="ql-header">
        <option value="1" title="Título 1" />
        <option value="2" title="Título 2" />
        <option value="3" title="Título 3" />
        <option value="4" title="Título 4" />
        <option value="5" title="Título 5" />
        <option value="6" title="Título 6" />
      </select>

      <button className="ql-blockquote" title="Anotación" />
      <button className="ql-code-block" title="Bloque de código" />
    </span>

    <span className="ql-formats">
      <button className="ql-link" title="Insertar enlace" />
      <button className="ql-clean" title="Quitar formato" />
    </span>

    <span className="ql-formats">
      <select className="ql-font">
        <option value="" />
        <option value="serif" />
        <option value="monospace" />
      </select>
    </span>

    <span className="ql-formats">
      <select className="ql-size" title="Tamaño de fuente">
        <option value="small"></option>
        <option defaultValue></option>
        <option value="large"></option>
        <option value="huge"></option>
      </select>
    </span>

    <span className="ql-formats">
      <select className="ql-color" title="Color de letra" />
      <select className="ql-background" title="Color de fondo" />
    </span>

    {/* Text alignment */}
    <span className="ql-formats" title="Alineación">
      <select className="ql-align">
        <option defaultValue />
        <option value="center" />
        <option value="right" />
        <option value="justify" />
      </select>
    </span>
  </div>
);

// eslint-disable-next-line react/prop-types
export default function EditorArticulo({ value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* STICKY en el viewport */}
      <CustomToolbar />

      {/* Contenedor scrollable para el editor */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <A4Paper>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            modules={{ toolbar: { container: "#toolbar" } }}
            placeholder="Escribe tu artículo con estilo…"
          />
        </A4Paper>
      </div>
    </div>
  );
}
