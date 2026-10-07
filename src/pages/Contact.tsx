import { useState } from 'react';
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
} from 'react-icons/fi';
import CONFIG from '../../portfolio.config';
import { Link } from '../router';
import { photo } from '../lib';
import { useSettings } from '../settings-context';

const INTENTS = [
  {
    title: 'Full-time role',
    titleEs: 'Puesto a tiempo completo',
    body: 'Hiring for an engineering position',
    bodyEs: 'Contratación para un puesto de ingeniería',
  },
  {
    title: 'Project / contract',
    titleEs: 'Proyecto / contrato',
    body: 'Need something built or shipped',
    bodyEs: 'Necesitas construir o lanzar algo',
  },
  {
    title: 'Collaboration',
    titleEs: 'Colaboración',
    body: 'Open source, research, or a partnership',
    bodyEs: 'Open source, investigación o una alianza',
  },
  {
    title: 'Just saying hi',
    titleEs: 'Solo saludar',
    body: 'Questions, feedback, or anything else',
    bodyEs: 'Preguntas, comentarios o cualquier otra cosa',
  },
];

const STEPS = [
  ['Intent', 'Motivo'],
  ['Details', 'Datos'],
  ['Message', 'Mensaje'],
  ['Sent', 'Enviado'],
] as const;

const input =
  'w-full rounded-xl border border-[#B6C7AA40] bg-black/25 px-4 py-3 text-sm text-emerald-50 placeholder:text-emerald-100/40 outline-none transition focus:border-forest-muted';

export default function Contact() {
  const { profile, social } = CONFIG;
  const { t } = useSettings();
  const [step, setStep] = useState(0);
  const [intent, setIntent] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');

  const send = () => {
    const subject = `${intent}: from ${name}${company ? ` (${company})` : ''}`;
    const body = `${message}\n\n${name}\n${email}${company ? `\n${company}` : ''}`;
    window.location.href = `mailto:${social.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setStep(3);
  };

  return (
    <div className="relative w-full max-w-full overflow-x-hidden px-4 pb-20 pt-4 md:px-10">
      <section className="relative mb-12 overflow-hidden rounded-3xl border border-emerald-500/20">
        <div className="absolute inset-0">
          <img
            src={photo}
            alt=""
            className="h-full w-full object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a140e] via-forest-bg/90 to-forest-bg/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-bg via-transparent to-forest-bg/40" />
        </div>

        <div className="relative grid gap-8 p-4 md:grid-cols-[1fr_1.15fr] md:gap-10 md:p-6 lg:p-8">
          <div className="order-2 flex flex-col justify-center md:order-1">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-emerald-200/70">
              {t('Contact', 'Contacto')} · {profile.name}
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-emerald-50 md:text-5xl">
              {t(
                'Send a message. Tell me what you need.',
                'Envíame un mensaje. Cuéntame qué necesitas.',
              )}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-emerald-100/75 md:text-lg">
              {t(
                'Hiring, a product build, or a collaboration. Use the form and it opens an email draft addressed to me, ready to send.',
                'Contratación, un producto o una colaboración. Usa el formulario y se abrirá un borrador de correo dirigido a mí, listo para enviar.',
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${social.email}`} className="chip">
                <FiMail /> {social.email}
              </a>
              <a href={`tel:${social.phone}`} className="chip">
                <FiPhone /> {social.phone}
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="chip"
              >
                <FiLinkedin /> LinkedIn
              </a>
              <a
                href={social.github}
                target="_blank"
                rel="noreferrer"
                className="chip"
              >
                <FiGithub /> GitHub
              </a>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm text-emerald-200/80 transition hover:text-emerald-100"
              >
                {t('Portfolio →', 'Portafolio →')}
              </Link>
            </div>
          </div>

          <aside className="glass order-1 flex flex-col rounded-2xl p-5 md:order-2 md:p-6">
            <div className="mb-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-200/60">
                {t('Message', 'Mensaje')}
              </p>
              <h2 className="mt-1 font-display text-xl font-semibold text-emerald-50 md:text-2xl">
                {t('Start here', 'Empieza aquí')}
              </h2>
              <p className="mt-1 text-sm text-emerald-100/65">
                {t(
                  "Pick why you're writing, then add your details and note.",
                  'Elige el motivo, luego añade tus datos y tu nota.',
                )}
              </p>
            </div>

            <div className="mb-4 flex gap-2">
              {STEPS.map((s, i) => (
                <div key={s[0]} className="flex flex-1 flex-col gap-1.5">
                  <div
                    className={`h-1 rounded-full transition-colors ${
                      i <= step ? 'bg-forest-muted' : 'bg-[#B6C7AA30]'
                    }`}
                  />
                  <span className="font-mono text-[9px] uppercase tracking-wider text-forest-muted/80">
                    {t(s[0], s[1])}
                  </span>
                </div>
              ))}
            </div>

            <div className="min-h-[18rem] flex-1">
              {step === 0 && (
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-medium text-emerald-50">
                    {t('What is this about?', '¿De qué se trata?')}
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {INTENTS.map((it) => (
                      <button
                        key={it.title}
                        type="button"
                        onClick={() => {
                          setIntent(it.title);
                          setStep(1);
                        }}
                        className={`rounded-xl border p-3 text-left transition hover:border-forest-muted hover:bg-[#B6C7AA18] ${
                          intent === it.title
                            ? 'border-forest-muted bg-[#B6C7AA18]'
                            : 'border-[#B6C7AA40] bg-black/25'
                        }`}
                      >
                        <p className="text-sm font-semibold text-forest-text">
                          {t(it.title, it.titleEs)}
                        </p>
                        <p className="mt-0.5 text-[11px] text-forest-muted">
                          {t(it.body, it.bodyEs)}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <form
                  className="flex flex-col gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStep(2);
                  }}
                >
                  <p className="text-sm font-medium text-emerald-50">
                    {t("Who's writing?", '¿Quién escribe?')}
                  </p>
                  <input
                    required
                    className={input}
                    placeholder={t('Your name', 'Tu nombre')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    required
                    type="email"
                    className={input}
                    placeholder={t('Your email', 'Tu correo')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className={input}
                    placeholder={t('Company (optional)', 'Empresa (opcional)')}
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                  <div className="mt-2 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className="inline-flex items-center gap-2 text-sm text-forest-muted hover:text-forest-text"
                    >
                      <FiArrowLeft /> {t('Back', 'Atrás')}
                    </button>
                    <button type="submit" className="btn-primary !px-5 !py-2.5">
                      {t('Next', 'Siguiente')} <FiArrowRight />
                    </button>
                  </div>
                </form>
              )}

              {step === 2 && (
                <form
                  className="flex flex-col gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    send();
                  }}
                >
                  <p className="text-sm font-medium text-emerald-50">
                    {t('Your note', 'Tu nota')}{' '}
                    <span className="text-forest-muted">
                      ·{' '}
                      {t(
                        intent,
                        INTENTS.find((i) => i.title === intent)?.titleEs ??
                          intent,
                      )}
                    </span>
                  </p>
                  <textarea
                    required
                    rows={7}
                    className={`${input} resize-none`}
                    placeholder={t(
                      'What are you working on, and how can I help?',
                      '¿En qué estás trabajando y cómo puedo ayudarte?',
                    )}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <div className="mt-2 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-2 text-sm text-forest-muted hover:text-forest-text"
                    >
                      <FiArrowLeft /> {t('Back', 'Atrás')}
                    </button>
                    <button type="submit" className="btn-primary !px-5 !py-2.5">
                      {t('Open email draft', 'Abrir borrador')} <FiArrowRight />
                    </button>
                  </div>
                </form>
              )}

              {step === 3 && (
                <div className="flex h-full flex-col items-center justify-center gap-4 py-8 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest-muted text-forest-bg">
                    <FiCheck size={26} />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-emerald-50">
                    {t('Your draft is ready', 'Tu borrador está listo')}
                  </h3>
                  <p className="max-w-sm text-sm text-emerald-100/70">
                    {t(
                      'Your email app should have opened with the message filled in. Hit send there. If nothing opened, write to',
                      'Tu app de correo debería haberse abierto con el mensaje listo. Envíalo desde ahí. Si no se abrió nada, escribe a',
                    )}{' '}
                    <a
                      href={`mailto:${social.email}`}
                      className="text-forest-warm underline"
                    >
                      {social.email}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStep(0);
                      setIntent('');
                      setMessage('');
                    }}
                    className="text-sm text-forest-muted underline-offset-4 hover:text-forest-text hover:underline"
                  >
                    {t('Write another', 'Escribir otro')}
                  </button>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
