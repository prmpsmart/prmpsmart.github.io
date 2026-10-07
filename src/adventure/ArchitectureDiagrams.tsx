import { useState } from 'react';
import { useSettings } from '../settings-context';

interface SysNode {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  detail: [string, string]; // [en, es]
}

interface System {
  name: string;
  summary: [string, string];
  nodes: SysNode[];
  edges: [string, string][];
}

// Drawn from the projects' own descriptions; edit freely.
const SYSTEMS: System[] = [
  {
    name: 'Price Grid',
    summary: [
      'FastAPI backend with a repository layer, append-only prices, write-through caching, and a decoupled alert pipeline.',
      'Backend en FastAPI con capa de repositorios, precios append-only, caché write-through y un pipeline de alertas desacoplado.',
    ],
    nodes: [
      {
        id: 'client',
        label: 'Client',
        sub: 'REST',
        x: 80,
        y: 210,
        detail: [
          'Calls the API with a role-scoped token.',
          'Llama a la API con un token limitado por rol.',
        ],
      },
      {
        id: 'api',
        label: 'FastAPI',
        sub: 'RBAC',
        x: 245,
        y: 210,
        detail: [
          'Validates input with SQLModel and enforces role-based access control on every route.',
          'Valida la entrada con SQLModel y aplica control de acceso por roles en cada ruta.',
        ],
      },
      {
        id: 'repo',
        label: 'Repository',
        sub: 'domain layer',
        x: 420,
        y: 110,
        detail: [
          'Isolates persistence from business logic so storage can change without touching handlers.',
          'Aísla la persistencia de la lógica de negocio para cambiar el almacenamiento sin tocar los handlers.',
        ],
      },
      {
        id: 'pg',
        label: 'PostgreSQL',
        sub: 'append-only',
        x: 610,
        y: 110,
        detail: [
          'Prices are never updated in place: each change is a new row, giving an auditable history.',
          'Los precios nunca se sobrescriben: cada cambio es una fila nueva, con historial auditable.',
        ],
      },
      {
        id: 'redis',
        label: 'Redis',
        sub: 'write-through',
        x: 420,
        y: 310,
        detail: [
          'Reads hit the cache; writes go through it and invalidate stale entries immediately.',
          'Las lecturas usan la caché; las escrituras pasan por ella e invalidan entradas obsoletas al instante.',
        ],
      },
      {
        id: 'bus',
        label: 'Pub/Sub',
        sub: 'events',
        x: 610,
        y: 310,
        detail: [
          'A new price publishes an event, so alerting never blocks the write path.',
          'Un precio nuevo publica un evento, así las alertas nunca bloquean la escritura.',
        ],
      },
      {
        id: 'alerts',
        label: 'Alerts',
        sub: 'workers',
        x: 750,
        y: 210,
        detail: [
          'Subscribers evaluate thresholds and notify users independently of the API.',
          'Los suscriptores evalúan umbrales y notifican a los usuarios sin depender de la API.',
        ],
      },
    ],
    edges: [
      ['client', 'api'],
      ['api', 'repo'],
      ['repo', 'pg'],
      ['api', 'redis'],
      ['repo', 'redis'],
      ['repo', 'bus'],
      ['bus', 'alerts'],
    ],
  },
  {
    name: 'Vaultify',
    summary: [
      'A Flutter app talking to REST, Socket.IO, Paystack, and FCM, with security staff verifying residents at the gate.',
      'Una app Flutter conectada a REST, Socket.IO, Paystack y FCM, con seguridad verificando residentes en la entrada.',
    ],
    nodes: [
      {
        id: 'app',
        label: 'Resident app',
        sub: 'Flutter · GetX',
        x: 90,
        y: 210,
        detail: [
          'Residents pay dues and bills, generate access codes, chat with security, and raise emergency alerts.',
          'Los residentes pagan cuotas y facturas, generan códigos de acceso, chatean con seguridad y envían alertas.',
        ],
      },
      {
        id: 'api',
        label: 'REST API',
        sub: 'estate backend',
        x: 300,
        y: 100,
        detail: [
          'Issues QR virtual IDs and access codes and records payments and announcements.',
          'Emite IDs virtuales QR y códigos de acceso, y registra pagos y anuncios.',
        ],
      },
      {
        id: 'pay',
        label: 'Paystack',
        sub: 'wallet & bills',
        x: 520,
        y: 60,
        detail: [
          'Wallet top-ups and airtime, data, cable, and electricity payments.',
          'Recargas de billetera y pagos de recargas, datos, cable y electricidad.',
        ],
      },
      {
        id: 'socket',
        label: 'Socket.IO',
        sub: 'real-time',
        x: 300,
        y: 320,
        detail: [
          'Private resident ↔ security chat delivered instantly.',
          'Chat privado residente ↔ seguridad entregado al instante.',
        ],
      },
      {
        id: 'fcm',
        label: 'FCM',
        sub: 'push',
        x: 520,
        y: 210,
        detail: [
          'Push notifications for announcements, alerts, and transaction updates.',
          'Notificaciones push para anuncios, alertas y transacciones.',
        ],
      },
      {
        id: 'guard',
        label: 'Security',
        sub: 'gate scanner',
        x: 730,
        y: 320,
        detail: [
          'Scans a visitor’s QR pass and verifies it against the API before opening the gate.',
          'Escanea el pase QR del visitante y lo verifica con la API antes de abrir.',
        ],
      },
    ],
    edges: [
      ['app', 'api'],
      ['api', 'pay'],
      ['app', 'socket'],
      ['socket', 'guard'],
      ['guard', 'api'],
      ['api', 'fcm'],
      ['fcm', 'app'],
    ],
  },
  {
    name: 'Self-healing integration',
    summary: [
      'Watches Salesforce for schema changes and repairs broken field mappings with AI, streaming every event to a live dashboard.',
      'Vigila cambios de esquema en Salesforce y repara mapeos rotos con IA, transmitiendo cada evento a un panel en vivo.',
    ],
    nodes: [
      {
        id: 'sf',
        label: 'Salesforce',
        sub: 'source',
        x: 90,
        y: 210,
        detail: [
          'The connected CRM whose objects and fields can change at any time.',
          'El CRM conectado cuyos objetos y campos pueden cambiar en cualquier momento.',
        ],
      },
      {
        id: 'watch',
        label: 'Schema watcher',
        sub: 'diffs',
        x: 290,
        y: 210,
        detail: [
          'Detects renamed, removed, or retyped fields that would break integrations.',
          'Detecta campos renombrados, eliminados o con nuevo tipo que romperían integraciones.',
        ],
      },
      {
        id: 'ai',
        label: 'AI repair',
        sub: 'mapping fixes',
        x: 500,
        y: 100,
        detail: [
          'Proposes and applies corrected field mappings automatically.',
          'Propone y aplica automáticamente mapeos de campos corregidos.',
        ],
      },
      {
        id: 'maps',
        label: 'Mappings',
        sub: 'healed',
        x: 720,
        y: 100,
        detail: [
          'Integrations keep flowing with repaired mappings.',
          'Las integraciones siguen funcionando con los mapeos reparados.',
        ],
      },
      {
        id: 'stream',
        label: 'Event stream',
        sub: 'live',
        x: 500,
        y: 320,
        detail: [
          'Every detection and repair is emitted as an event.',
          'Cada detección y reparación se emite como evento.',
        ],
      },
      {
        id: 'dash',
        label: 'Dashboard',
        sub: 'real-time',
        x: 720,
        y: 320,
        detail: [
          'Operators watch the healing happen live.',
          'Los operadores ven la reparación en vivo.',
        ],
      },
    ],
    edges: [
      ['sf', 'watch'],
      ['watch', 'ai'],
      ['ai', 'maps'],
      ['watch', 'stream'],
      ['ai', 'stream'],
      ['stream', 'dash'],
    ],
  },
];

const W = 124;
const H = 52;

function edgePath(a: SysNode, b: SysNode) {
  const mx = (a.x + b.x) / 2;
  return `M${a.x},${a.y} C${mx},${a.y} ${mx},${b.y} ${b.x},${b.y}`;
}

export default function ArchitectureDiagrams() {
  const { t } = useSettings();
  const [sys, setSys] = useState(0);
  const system = SYSTEMS[sys];
  const [selected, setSelected] = useState<string>(system.nodes[1].id);
  const byId = Object.fromEntries(system.nodes.map((n) => [n.id, n]));
  const node = byId[selected] ?? system.nodes[0];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {SYSTEMS.map((s, i) => (
          <button
            key={s.name}
            type="button"
            onClick={() => {
              setSys(i);
              setSelected(SYSTEMS[i].nodes[1].id);
            }}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              i === sys
                ? 'bg-forest-muted text-forest-bg'
                : 'glass text-forest-text hover:bg-[var(--glass-strong)]'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>
      <p className="max-w-3xl text-sm text-forest-muted">
        {t(...system.summary)}
      </p>

      <div className="grid gap-5 xl:grid-cols-[1fr_280px]">
        <div className="overflow-x-auto rounded-2xl border border-white/15 bg-[#0b170f]/80 p-2">
          <svg
            key={system.name}
            viewBox="0 0 840 400"
            className="min-w-[640px]"
            role="img"
            aria-label={`${system.name} architecture`}
          >
            <defs>
              <pattern
                id="grid"
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M24 0H0V24"
                  fill="none"
                  stroke="#B6C7AA"
                  strokeOpacity="0.06"
                />
              </pattern>
            </defs>
            <rect width="840" height="400" fill="url(#grid)" />

            {system.edges.map(([from, to], i) => {
              const d = edgePath(byId[from], byId[to]);
              const lit = from === selected || to === selected;
              return (
                <g key={`${from}-${to}`}>
                  <path
                    d={d}
                    fill="none"
                    stroke={lit ? '#F6E6CB' : '#B6C7AA'}
                    strokeOpacity={lit ? 0.7 : 0.25}
                    strokeWidth={lit ? 1.6 : 1.2}
                    strokeDasharray="4 6"
                    className="dash-flow"
                  />
                  {[0, 1].map((k) => (
                    <rect
                      key={k}
                      width="7"
                      height="7"
                      x="-3.5"
                      y="-3.5"
                      fill="#F6E6CB"
                    >
                      <animateMotion
                        dur="2.6s"
                        repeatCount="indefinite"
                        begin={`${i * 0.35 + k * 1.3}s`}
                        path={d}
                        rotate="auto"
                      />
                    </rect>
                  ))}
                </g>
              );
            })}

            {system.nodes.map((n) => {
              const active = n.id === selected;
              return (
                <g
                  key={n.id}
                  transform={`translate(${n.x - W / 2}, ${n.y - H / 2})`}
                  onClick={() => setSelected(n.id)}
                  onKeyDown={(e) => e.key === 'Enter' && setSelected(n.id)}
                  tabIndex={0}
                  role="button"
                  aria-label={n.label}
                  className="cursor-pointer outline-none"
                >
                  <rect
                    width={W}
                    height={H}
                    rx="12"
                    fill={active ? '#698474' : '#163020'}
                    stroke={active ? '#F6E6CB' : '#B6C7AA'}
                    strokeOpacity={active ? 0.9 : 0.35}
                  />
                  <text
                    x={W / 2}
                    y="22"
                    textAnchor="middle"
                    fill="#D2E3C8"
                    fontSize="14"
                    fontFamily="Montserrat"
                    fontWeight="600"
                  >
                    {n.label}
                  </text>
                  <text
                    x={W / 2}
                    y="39"
                    textAnchor="middle"
                    fill={active ? '#F6E6CB' : '#B6C7AA'}
                    fontSize="10"
                    fontFamily="JetBrains Mono"
                  >
                    {n.sub}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <aside
          key={node.id}
          className="glass page-enter self-start rounded-2xl p-5"
        >
          <p className="eyebrow">{t('Component', 'Componente')}</p>
          <h4 className="mt-2 font-display text-xl font-semibold text-forest-text">
            {node.label}
          </h4>
          <p className="font-mono text-[11px] text-forest-warm">{node.sub}</p>
          <p className="mt-3 text-sm leading-relaxed text-forest-muted">
            {t(...node.detail)}
          </p>
          <p className="mt-5 text-[11px] text-forest-muted/70">
            {t(
              'Click any box to inspect it.',
              'Haz clic en cualquier caja para inspeccionarla.',
            )}
          </p>
        </aside>
      </div>
    </div>
  );
}
