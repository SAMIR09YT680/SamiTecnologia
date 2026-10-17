import { useMemo, useState } from 'react';

const EXAMPLE = 'En SamiTecnologia aprendemos programación, redes y herramientas digitales. Cada idea es una oportunidad para crear algo nuevo.';

function analyze(text: string) {
  const characters = Array.from(text).length;
  const noSpaces = Array.from(text.replace(/\s/gu, '')).length;
  const words = text.match(/[\p{L}\p{N}]+(?:[’'\-][\p{L}\p{N}]+)*/gu) ?? [];
  const lines = text ? text.split(/\r\n|\r|\n/u).length : 0;
  const paragraphs = text.trim() ? text.trim().split(/(?:\r?\n\s*){2,}/u).filter(Boolean).length : 0;
  const minutes = words.length / 200;
  return { characters, noSpaces, words: words.length, lines, paragraphs, minutes };
}

export default function TextCounter() {
  const [text, setText] = useState('');
  const [notice, setNotice] = useState('El análisis se actualiza mientras escribes.');
  const result = useMemo(() => analyze(text), [text]);
  const copyText = async () => {
    if (!text) return;
    try { await navigator.clipboard.writeText(text); setNotice('Texto copiado.'); }
    catch { setNotice('Selecciona el texto para copiarlo manualmente.'); }
  };
  const rows: [string, string | number][] = [
    ['Palabras', result.words], ['Caracteres', result.characters],
    ['Sin espacios', result.noSpaces], ['Líneas', result.lines],
    ['Párrafos', result.paragraphs],
    ['Lectura estimada', result.words === 0 ? '0 s' : result.minutes < 1 ? `${Math.ceil(result.minutes * 60)} s` : `${Math.ceil(result.minutes)} min`],
  ];
  return (
    <div className="tool-wrap st-v6-tool">
      <div className="st-v6-eyebrow">ANÁLISIS EN TIEMPO REAL</div>
      <div className="tool-field">
        <label htmlFor="text-analyzer">Escribe o pega el texto</label>
        <textarea id="text-analyzer" value={text} onChange={(event) => { setText(event.target.value); setNotice('El análisis se actualiza mientras escribes.'); }} placeholder="Escribe tu texto aquí..." rows={9} spellCheck={true} />
      </div>
      <div className="tool-actions st-v6-actions">
        <button type="button" className="tool-btn secondary" onClick={() => setText(EXAMPLE)}>Usar ejemplo</button>
        <button type="button" className="tool-btn secondary" onClick={copyText} disabled={!text}>Copiar texto</button>
        <button type="button" className="tool-btn secondary" onClick={() => { setText(''); setNotice('Texto borrado.'); }}>Limpiar</button>
      </div>
      <div className="tool-results st-v6-stats" aria-live="polite">
        {rows.map(([label, value]) => <div className="tool-result" key={label}><strong>{label}</strong><span>{value}</span></div>)}
      </div>
      <p className="tool-note" role="status">{notice} La lectura se calcula a 200 palabras por minuto; es una estimación.</p>
      <p className="st-v6-disclaimer">Tu texto se procesa en este navegador, sin enviarlo a un servidor. El conteo de palabras incluye números y palabras separadas por espacios o signos.</p>
    </div>
  );
}
