import { useState } from 'react';

export default function JsonFormatter() {
  const [source, setSource] = useState('{"portal":"SamiTecnologia","herramientas":["IPv4","JSON"]}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const process = (indent: number) => {
    try {
      const parsed: unknown = JSON.parse(source);
      setOutput(JSON.stringify(parsed, null, indent));
      setError('');
      setNotice('JSON válido. Puedes copiar el resultado.');
    } catch (reason) {
      setError(reason instanceof Error ? `JSON no válido: ${reason.message}` : 'El texto no es JSON válido.');
      setNotice('');
      setOutput('');
    }
  };
  return <div className="tool-wrap tool-form">
    <div className="tool-field"><label htmlFor="json-source">Introduce tu JSON</label><textarea id="json-source" value={source} onChange={event => { setSource(event.target.value); setNotice(''); }} spellCheck={false} /></div>
    <div className="tool-actions"><button type="button" className="tool-btn" onClick={() => process(2)}>Formatear</button><button type="button" className="tool-btn secondary" onClick={() => process(0)}>Minificar</button><button type="button" className="tool-btn secondary" onClick={() => { setSource(''); setOutput(''); setError(''); setNotice(''); }}>Limpiar</button></div>
    {error && <p className="tool-error" role="alert">{error}</p>}
    {notice && <p className="tool-success" role="status">{notice}</p>}
    {output && <><div className="tool-field"><label htmlFor="json-output">Resultado</label><textarea id="json-output" readOnly value={output} spellCheck={false} /></div><div className="tool-actions"><button type="button" className="tool-btn secondary" onClick={async () => { try { await navigator.clipboard.writeText(output); setNotice('Resultado copiado al portapapeles.'); } catch { setNotice('Selecciona el texto del resultado para copiarlo manualmente.'); } }}>Copiar resultado</button></div></>}
    <p className="tool-note">El contenido se procesa directamente en tu navegador. No lo enviamos a un servidor. Evita compartir claves privadas en herramientas que no controles.</p>
  </div>;
}
