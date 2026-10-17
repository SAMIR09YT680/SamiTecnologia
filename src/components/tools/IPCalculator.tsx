import { useMemo, useState } from 'react';

type Resultado = {
  ip: string; cidr: number; mascara: string; comodin: string; red: string;
  broadcast: string; primera: string; ultima: string; total: number; utilizables: number;
  privada: boolean; tipo: string;
};

function ipv4ToNumber(address: string): number | null {
  const parts = address.trim().split('.');
  if (parts.length !== 4 || parts.some(part => !/^\d{1,3}$/.test(part) || Number(part) > 255)) return null;
  return parts.reduce((acc, part) => ((acc * 256) + Number(part)) >>> 0, 0);
}
function numberToIpv4(num: number): string {
  const n = num >>> 0;
  return [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
}
function calculate(ip: string, prefixInput: string): { result?: Resultado; error?: string } {
  const normalizedIp = ip.trim();
  const address = ipv4ToNumber(normalizedIp);
  if (address === null) return { error: 'Introduce una IPv4 válida, por ejemplo 192.168.1.10.' };
  if (!/^\d{1,2}$/.test(prefixInput.trim())) return { error: 'El prefijo CIDR debe ser un entero de 0 a 32.' };
  const prefix = Number(prefixInput);
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) return { error: 'El prefijo CIDR debe estar entre 0 y 32.' };
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  const wildcard = (~mask) >>> 0;
  const network = (address & mask) >>> 0;
  const broadcast = (network | wildcard) >>> 0;
  const total = 2 ** (32 - prefix);
  const utilizables = prefix === 32 ? 1 : prefix === 31 ? 2 : total - 2;
  const first = prefix >= 31 ? network : network + 1;
  const last = prefix >= 31 ? broadcast : broadcast - 1;
  const octet1 = address >>> 24;
  const octet2 = (address >>> 16) & 255;
  const privada = octet1 === 10 || (octet1 === 172 && octet2 >= 16 && octet2 <= 31) || (octet1 === 192 && octet2 === 168);
  const tipo = octet1 === 127 ? 'Loopback' : octet1 >= 224 && octet1 <= 239 ? 'Multicast' : octet1 === 169 && octet2 === 254 ? 'Enlace local (APIPA)' : octet1 >= 240 ? 'Reservada/experimental' : privada ? 'Privada (RFC 1918)' : 'No privada';
  return { result: {
    ip: numberToIpv4(address), cidr: prefix, mascara: numberToIpv4(mask), comodin: numberToIpv4(wildcard),
    red: numberToIpv4(network), broadcast: numberToIpv4(broadcast), primera: numberToIpv4(first),
    ultima: numberToIpv4(last), total, utilizables, privada, tipo,
  } };
}

export default function IPCalculator() {
  const [ip, setIp] = useState('192.168.1.100');
  const [cidr, setCidr] = useState('24');
  const [consulta, setConsulta] = useState({ ip: '192.168.1.100', cidr: '24' });
  const { result, error } = useMemo(() => calculate(consulta.ip, consulta.cidr), [consulta]);
  const rows = result ? [
    ['Dirección de red', `${result.red}/${result.cidr}`],
    ['Máscara de subred', result.mascara],
    ['Broadcast', result.broadcast],
    ['Wildcard', result.comodin],
    ['Primera IP utilizable', result.primera],
    ['Última IP utilizable', result.ultima],
    ['Direcciones totales', result.total.toLocaleString('es-CO')],
    ['Direcciones utilizables', result.utilizables.toLocaleString('es-CO')],
    ['Tipo de dirección', result.tipo],
  ] : [];
  return <div className="tool-wrap">
    <form className="tool-form" onSubmit={event => { event.preventDefault(); setConsulta({ ip, cidr }); }}>
      <div className="tool-fields">
        <div className="tool-field"><label htmlFor="ipv4">Dirección IPv4</label><input id="ipv4" value={ip} onChange={event => setIp(event.target.value)} placeholder="192.168.1.100" spellCheck={false} required /></div>
        <div className="tool-field"><label htmlFor="cidr">Prefijo CIDR (0–32)</label><input id="cidr" type="number" min="0" max="32" step="1" value={cidr} onChange={event => setCidr(event.target.value)} required /></div>
      </div>
      <div className="tool-actions"><button className="tool-btn" type="submit">Calcular subred →</button><button className="tool-btn secondary" type="button" onClick={() => { setIp('192.168.1.100'); setCidr('24'); setConsulta({ ip: '192.168.1.100', cidr: '24' }); }}>Restablecer</button></div>
    </form>
    {error && <p className="tool-error" role="alert">{error}</p>}
    {result && <><div className="tool-results" aria-live="polite">{rows.map(([label, value]) => <div className="tool-result" key={label}><strong>{label}</strong><span>{value}</span></div>)}</div><p className="tool-note">Los prefijos /31 y /32 se calculan según su uso habitual en enlaces punto a punto y rutas de host. Los resultados describen el bloque; no indican qué IP están realmente asignadas.</p></>}
  </div>;
}
