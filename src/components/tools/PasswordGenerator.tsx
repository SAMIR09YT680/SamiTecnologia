import { useState } from 'react';

const UPPER = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
const LOWER = 'abcdefghijkmnopqrstuvwxyz';
const DIGITS = '23456789';
const SYMBOLS = '!@#$%&*-_?';

type Groups = { minusculas: boolean; mayusculas: boolean; numeros: boolean; simbolos: boolean };

// Sorteo criptográfico sin sesgo de módulo (rechazo de valores fuera del límite).
function secureIndex(max: number): number {
  if (!globalThis.crypto?.getRandomValues) throw new Error('Tu navegador no permite generar números aleatorios seguros.');
  if (max <= 0 || max > 256) throw new Error('Configuración no válida.');
  const limit = Math.floor(256 / max) * max;
  const buffer = new Uint8Array(1);
  do { globalThis.crypto.getRandomValues(buffer); } while (buffer[0] >= limit);
  return buffer[0] % max;
}

function generate(length: number, selected: Groups): string {
  const enabled = [
    selected.minusculas ? LOWER : '',
    selected.mayusculas ? UPPER : '',
    selected.numeros ? DIGITS : '',
    selected.simbolos ? SYMBOLS : '',
  ].filter(Boolean);
  if (!enabled.length) throw new Error('Selecciona al menos un tipo de caracteres.');
  const pool = enabled.join('');
  // Garantiza al menos un carácter de cada grupo activado.
  const chars = enabled.map((group) => group[secureIndex(group.length)]);
  while (chars.length < length) chars.push(pool[secureIndex(pool.length)]);
  // Mezcla Fisher-Yates usando el mismo generador seguro.
  for (let i = chars.length - 1; i > 0; i--) {
    const j = secureIndex(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join('');
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(20);
  const [groups, setGroups] = useState<Groups>({ minusculas: true, mayusculas: true, numeros: true, simbolos: true });
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('Pulsa «Generar contraseña» para comenzar.');
  const [error, setError] = useState('');
  const activeCount = Object.values(groups).filter(Boolean).length;
  const toggle = (key: keyof Groups) => setGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  const onGenerate = () => {
    setError('');
    if (activeCount === 0) { setError('Selecciona al menos un tipo de caracteres.'); setPassword(''); return; }
    try {
      setPassword(generate(length, groups));
      setMessage('Contraseña generada solo en este dispositivo.');
    } catch (e) { setPassword(''); setError(e instanceof Error ? e.message : 'No se pudo generar la contraseña.'); }
  };
  const onCopy = async () => {
    if (!password) return;
    try { await navigator.clipboard.writeText(password); setMessage('Contraseña copiada.'); }
    catch { setMessage('No se pudo copiar automáticamente. Selecciona el texto y cópialo.'); }
  };
  return (
    <div className="tool-wrap st-v6-tool">
      <div className="st-v6-eyebrow">CONFIGURACIÓN SEGURA</div>
      <div className="st-v6-panel-grid">
        <div>
          <div className="tool-field">
            <label htmlFor="pw-length">Longitud: <strong>{length} caracteres</strong></label>
            <input id="pw-length" type="range" min={12} max={64} value={length} onChange={(event) => setLength(Number(event.target.value))} />
            <div className="st-v6-range-labels"><span>12</span><span>64</span></div>
          </div>
          <fieldset className="st-v6-options"><legend>Incluir caracteres</legend>
            {([
              ['minusculas', 'Minúsculas (a-z)'], ['mayusculas', 'Mayúsculas (A-Z)'],
              ['numeros', 'Números (2-9)'], ['simbolos', 'Símbolos especiales'],
            ] as const).map(([key, label]) => <label key={key}><input type="checkbox" checked={groups[key]} onChange={() => toggle(key)} /> {label}</label>)}
          </fieldset>
          <button type="button" className="tool-btn" onClick={onGenerate}>↻ Generar contraseña</button>
        </div>
        <div className="st-v6-output">
          <span className="st-v6-eyebrow">RESULTADO</span>
          <label className="st-v6-output-label" htmlFor="pw-result">Tu contraseña</label>
          <textarea id="pw-result" value={password} readOnly rows={3} placeholder="Aquí aparecerá tu contraseña" aria-label="Contraseña generada" />
          <button className="tool-btn secondary" type="button" onClick={onCopy} disabled={!password}>Copiar contraseña</button>
          <p className="tool-note" role="status" aria-live="polite">{message}</p>
          {error && <p className="tool-error" role="alert">{error}</p>}
        </div>
      </div>
      <p className="st-v6-disclaimer">Usamos <code>crypto.getRandomValues()</code> del navegador. No enviamos ni guardamos contraseñas. Evita reutilizarlas y considera un gestor de contraseñas.</p>
    </div>
  );
}
