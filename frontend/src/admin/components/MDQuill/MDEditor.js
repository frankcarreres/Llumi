import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import A4Paper from "./a4Paper";

const CustomToolbar = () => (
  <div id="toolbar">
    <span className="ql-formats">
      <button className="ql-bold" title="Negrita (Ctrl+B)"></button>
      <button className="ql-italic" title="Cursiva (Ctrl+I)"></button>
      <button className="ql-underline" title="Subrayado"></button>
      <button className="ql-strike" title="Tachado"></button>
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered" title="Lista ordenada"></button>
      <button className="ql-list" value="bullet" title="Lista con viñetas"></button>
    </span>
    <span className="ql-formats">
      <button className="ql-header" value="1" title="Titulo 1"></button>
      <button className="ql-header" value="2" title="Titulo 2"></button>
      <button className="ql-blockquote" title="Anotación"></button>
      <button className="ql-code-block" title="Bloque de codigo"></button>
    </span>
    <span className="ql-formats">
      <button className="ql-link" title="Insertar enlace"></button>
    </span>
    <span className="ql-formats">
      <button className="ql-clean" title="Quitar formato"></button>
    </span>
  </div>
);

// eslint-disable-next-line react/prop-types
export default function EditorArticulo({ value, onChange }) {
  return (
    <>
      <CustomToolbar />
      <A4Paper>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={{ toolbar: { container: "#toolbar" } }}
          placeholder="Escribe tu artículo con estilo…"
        />
      </A4Paper>
    </>
  );
}
