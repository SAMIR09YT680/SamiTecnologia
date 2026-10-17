import { useState } from 'react';
type Base = '2' | '10' | '16';
function parseNatural(input: string, base: Base): bigint {
  const clean = input.trim().replace(/\s+/g, '');
  if (!clean || clean.length > 128) throw new Error('Escribe un número de hasta 128 caracteres.');
  if (base === '2') { if (!/^[01]+$/.test(clean)) throw new Error('El número binario solo admite 0 y 1.'); return BigInt(`0b${clean}`); }
  if (base === '16') { if (!/^[0-9a-fA-F]+$/.test(clean)) throw new Error('El hexadecimal solo admite 0-9 y A-F.'); return BigInt(`0x${clean}`); }
  if (!/^\d+$/.test(clean)) throw new Error('El decimal solo admite dígitos del 0 al 9.');
  return BigInt(clean);
}
export default function BaseConverter() {
  const [base, setBase] = useState<Base>('10');
  const [value, setValue] = useState('255');
  const [data, setData] = useState<{bin: string; dec: string; hex: string} | null>({bin: '11111111', dec: '255', hex: 'FF'});
  const [error, setError] = useState('');
  return <div className="tool-wrap tool-form">
    <form className="tool-form" onSubmit={event => { event.preventDefault(); try { const num = parseNatural(value, base); setData({bin: num.toString(2), dec: num.toString(10), hex: num.toString(16).toUpperCase()}); setError(''); } catch (reason) { setError(reason instanceof Error ? reason.message : 'Número no válido.'); setData(null); } }}>
      <div className="tool-fields"><div className="tool-field"><label htmlFor="base-input">Número de entrada</label><input id="base-input" value={value} onChange={event => setValue(event.target.value)} spellCheck={false} required /></div><div className="tool-field"><label htmlFor="base-selector">Sistema de origen</label><select id="base-selector" value={base} onChange={event => { setBase(event.target.value as Base); setData(null); }}><option value="10">Decimal (base 10)</option><option value="2">Binario (base 2)</option><option value="16">Hexadecimal (base 16)</option></select></div></div>
      <div className="tool-actions"><button className="tool-btn" type="submit">Convertir número →</button><button className="tool-btn secondary" type="button" onClick={() => { setBase('10'); setValue('255'); setData({bin:'11111111',dec:'255',hex:'FF'}); setError(''); }}>Ejemplo</button></div>
    </form>
    {error && <p role="alert" className="tool-error">{error}</p>}
    {data && <div className="tool-results" aria-live="polite"><div className="tool-result"><strong>Binario (base 2)</strong><span>{data.bin}</span></div><div className="tool-result"><strong>Decimal (base 10)</strong><span>{data.dec}</span></div><div className="tool-result tool-full"><strong>Hexadecimal (base 16)</strong><span>{data.hex}</span></div></div>}
    <p className="tool-note">Trabaja con números enteros no negativos. Usa BigInt para mantener la precisión en números grandes.</p>
  </div>;
}
