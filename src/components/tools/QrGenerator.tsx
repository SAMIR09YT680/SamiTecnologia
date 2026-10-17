import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

type Correction = 'L' | 'M' | 'Q' | 'H';

const MAX_CHARACTERS = 1200;
const INITIAL_TEXT = 'SamiTecnologia · Explora, Aprende, Innova';

export default function QrGenerator() {
  const [text, setText] = useState(INITIAL_TEXT);
  const [size, setSize] = useState(512);
  const [correction, setCorrection] = useState<Correction>('M');
  const [dark, setDark] = useState('#102D49');
  const [light, setLight] = useState('#FFFFFF');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);

  const cleanText = text.trim();
  const validColors = /^#[0-9a-fA-F]{6}$/.test(dark) && /^#[0-9a-fA-F]{6}$/.test(light) && dark.toLowerCase() !== light.toLowerCase();
  const settings = { width: size, margin: 3, errorCorrectionLevel: correction, color: { dark, light } };

  useEffect(() => {
    let active = true;
    setNotice('');
    if (!cleanText) {
      setImage('');
      setError('Escribe un enlace o texto para generar tu código QR.');
      setLoading(false);
      return;
    }
    if (text.length > MAX_CHARACTERS) {
      setImage('');
      setError(`El texto supera el límite de ${MAX_CHARACTERS} caracteres.`);
      setLoading(false);
      return;
    }
    if (!validColors) {
      setImage('');
      setError('Elige dos colores distintos y válidos para el código QR y su fondo.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    const timeout = window.setTimeout(() => {
      QRCode.toDataURL(cleanText, settings)
        .then((value) => { if (active) { setImage(value); setError(''); } })
        .catch(() => { if (active) { setImage(''); setError('No se pudo generar el QR. Prueba con menos texto o una corrección menor.'); } })
        .finally(() => { if (active) setLoading(false); });
    }, 220);
    return () => { active = false; window.clearTimeout(timeout); };
  }, [text, size, correction, dark, light]);

  const savePng = () => {
    if (!image || loading || error) return;
    const link = document.createElement('a');
    link.href = image;
    link.download = 'samitecnologia-codigo-qr.png';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setNotice('Descarga PNG solicitada.');
  };

  const saveSvg = async () => {
    if (!image || loading || error) return;
    try {
      const svg = await QRCode.toString(cleanText, { ...settings, type: 'svg' });
      const file = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'samitecnologia-codigo-qr.svg';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 4000);
      setNotice('Descarga SVG solicitada.');
    } catch {
      setNotice('No se pudo descargar el SVG. Intenta con PNG.');
    }
  };

  return (
    <div className="qr-studio">
      <div className="qr-editor">
        <div className="qr-panel-heading">
          <span className="qr-step">01 / CONFIGURA</span>
          <h2>Personaliza tu código</h2>
          <p>Genera un QR estático para un enlace, texto o información que quieras compartir.</p>
        </div>
        <div className="tool-field">
          <label htmlFor="qr-content">Enlace o texto</label>
          <textarea id="qr-content" className="qr-textarea" spellCheck={false} maxLength={MAX_CHARACTERS + 1} value={text} onChange={(event) => setText(event.target.value)} placeholder="https://ejemplo.com" />
          <span className="qr-counter">{text.length} / {MAX_CHARACTERS} caracteres</span>
        </div>
        <div className="qr-controls-row">
          <div className="tool-field">
            <label htmlFor="qr-size">Resolución PNG</label>
            <select id="qr-size" value={size} onChange={(event) => setSize(Number(event.target.value))}>
              <option value={256}>256 × 256 px</option>
              <option value={512}>512 × 512 px</option>
              <option value={1024}>1024 × 1024 px</option>
            </select>
          </div>
          <div className="tool-field">
            <label htmlFor="qr-error-correction">Corrección de errores</label>
            <select id="qr-error-correction" value={correction} onChange={(event) => setCorrection(event.target.value as Correction)}>
              <option value="L">Baja · 7 %</option>
              <option value="M">Media · 15 %</option>
              <option value="Q">Alta · 25 %</option>
              <option value="H">Máxima · 30 %</option>
            </select>
          </div>
        </div>
        <div className="qr-controls-row qr-color-row">
          <div className="qr-color-field">
            <label htmlFor="qr-dark">Color del código</label>
            <div className="qr-color-picker"><input id="qr-dark" type="color" value={dark} onChange={(event) => setDark(event.target.value)} /><code>{dark.toUpperCase()}</code></div>
          </div>
          <div className="qr-color-field">
            <label htmlFor="qr-light">Color del fondo</label>
            <div className="qr-color-picker"><input id="qr-light" type="color" value={light} onChange={(event) => setLight(event.target.value)} /><code>{light.toUpperCase()}</code></div>
          </div>
        </div>
        <div className="qr-editor-footer">
          <button type="button" className="tool-btn secondary" onClick={() => { setText(INITIAL_TEXT); setSize(512); setCorrection('M'); setDark('#102D49'); setLight('#FFFFFF'); setNotice(''); }}>Restablecer ajustes</button>
          <span>Se genera en tu navegador</span>
        </div>
      </div>

      <div className="qr-preview-panel">
        <div className="qr-panel-heading">
          <span className="qr-step">02 / DESCARGA</span>
          <h2>Vista previa</h2>
          <p>Tu código se actualiza automáticamente al cambiar cualquier ajuste.</p>
        </div>
        <div className="qr-preview-board" aria-label="Vista previa de código QR">
          {image && !error ? <img className="qr-output-image" src={image} alt="Código QR generado a partir del texto indicado" width={270} height={270} /> : <div className="qr-placeholder" aria-live="polite">{loading ? 'Generando código QR…' : 'No hay vista previa disponible'}</div>}
        </div>
        {error && <p className="tool-error" role="alert">{error}</p>}
        <div className="qr-download-actions">
          <button type="button" className="tool-btn" onClick={savePng} disabled={!image || loading || Boolean(error)}>↓ Descargar PNG</button>
          <button type="button" className="tool-btn secondary" onClick={saveSvg} disabled={!image || loading || Boolean(error)}>↓ Descargar SVG</button>
        </div>
        <p className="qr-preview-note" role="status" aria-live="polite">{notice || (loading ? 'Actualizando vista previa…' : 'Prueba el QR con la cámara de tu teléfono antes de compartirlo.')}</p>
      </div>
    </div>
  );
}
