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

const INTENTS = [
  { title: 'Full-time role', body: 'Hiring for an engineering position' },
  { title: 'Project / contract', body: 'Need something built or shipped' },
  { title: 'Collaboration', body: 'Open source, research, or a partnership' },
  { title: 'Just saying hi', body: 'Questions, feedback, or anything else' },
];

const STEPS = ['Intent', 'Details', 'Message', 'Sent'];

const input =
  'w-full rounded-xl border border-[#B6C7AA40] bg-black/25 px-4 py-3 text-sm text-emerald-50 placeholder:text-emerald-100/40 outline-none transition focus:border-forest-muted';

export default function Contact() {
  const { profile, social } = CONFIG;
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
              Contact · {profile.name}
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-emerald-50 md:text-5xl">
              Send a message. Tell me what you need.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-emerald-100/75 md:text-lg">
              Hiring, a product build, or a collaboration. Use the form and it
              opens an email draft addressed to me, ready to send.
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
                Portfolio →
              </Link>
            </div>
          </div>

          <aside className="glass order-1 flex flex-col rounded-2xl p-5 md:order-2 md:p-6">
            <div className="mb-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-200/60">
                Message
              </p>
              <h2 className="mt-1 font-display text-xl font-semibold text-emerald-50 md:text-2xl">
                Start here
              </h2>
              <p className="mt-1 text-sm text-emerald-100/65">
                Pick why you&apos;re writing, then add your details and note.
              </p>
            </div>

            <div className="mb-4 flex gap-2">
              {STEPS.map((s, i) => (
                <div key={s} className="flex flex-1 flex-col gap-1.5">
                  <div
                    className={`h-1 rounded-full transition-colors ${
                      i <= step ? 'bg-forest-muted' : 'bg-[#B6C7AA30]'
                    }`}
                  />
                  <span className="font-mono text-[9px] uppercase tracking-wider text-forest-muted/80">
                    {s}
                  </span>
                </div>
              ))}
            </div>

            <div className="min-h-[18rem] flex-1">
              {step === 0 && (
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-medium text-emerald-50">
                    What is this about?
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
                          {it.title}
                        </p>
                        <p className="mt-0.5 text-[11px] text-forest-muted">
                          {it.body}
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
                    Who&apos;s writing?
                  </p>
                  <input
                    required
                    className={input}
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    required
                    type="email"
                    className={input}
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className={input}
                    placeholder="Company (optional)"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                  <div className="mt-2 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className="inline-flex items-center gap-2 text-sm text-forest-muted hover:text-forest-text"
                    >
                      <FiArrowLeft /> Back
                    </button>
                    <button type="submit" className="btn-primary !px-5 !py-2.5">
                      Next <FiArrowRight />
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
                    Your note{' '}
                    <span className="text-forest-muted">· {intent}</span>
                  </p>
                  <textarea
                    required
                    rows={7}
                    className={`${input} resize-none`}
                    placeholder="What are you working on, and how can I help?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <div className="mt-2 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-2 text-sm text-forest-muted hover:text-forest-text"
                    >
                      <FiArrowLeft /> Back
                    </button>
                    <button type="submit" className="btn-primary !px-5 !py-2.5">
                      Open email draft <FiArrowRight />
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
                    Your draft is ready
                  </h3>
                  <p className="max-w-sm text-sm text-emerald-100/70">
                    Your email app should have opened with the message filled
                    in. Hit send there. If nothing opened, write to{' '}
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
                    Write another
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
