'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Alert, Badge, ProgressBar, cx } from '@visahobe/ui';
import {
  assessEligibility,
  type Budget,
  type EligibilityInput,
  type EnglishLevel,
  type Funds,
  type Purpose,
  type Refusals,
  type Timeline,
} from '@/lib/eligibility';

const PURPOSE_OPTIONS: { id: Purpose; label: string; hint: string }[] = [
  { id: 'study', label: 'Study abroad', hint: 'University, college or language programme' },
  { id: 'work', label: 'Work or employment', hint: 'Job offer, permit or skilled migration' },
  { id: 'visit', label: 'Visit or tourism', hint: 'Tourist, family visit or business travel' },
  { id: 'business', label: 'Business migration', hint: 'Investor route or company formation' },
  { id: 'family', label: 'Family / dependant', hint: 'Spouse, child or reunification' },
  { id: 'unsure', label: 'I am not sure yet', hint: 'Help me work out which route fits' },
];

const DESTINATIONS = [
  { id: 'canada', label: 'Canada', flag: '🇨🇦' },
  { id: 'uk', label: 'United Kingdom', flag: '🇬🇧' },
  { id: 'germany', label: 'Germany', flag: '🇩🇪' },
  { id: 'australia', label: 'Australia', flag: '🇦🇺' },
  { id: 'schengen', label: 'Schengen Area', flag: '🇪🇺' },
  { id: 'usa', label: 'United States', flag: '🇺🇸' },
  { id: 'uae', label: 'UAE', flag: '🇦🇪' },
  { id: 'malaysia', label: 'Malaysia', flag: '🇲🇾' },
  { id: 'thailand', label: 'Thailand', flag: '🇹🇭' },
  { id: 'japan', label: 'Japan', flag: '🇯🇵' },
  { id: 'open', label: 'Open to suggestions', flag: '🌍' },
];

const STEPS = ['Goal', 'Destination', 'Resources', 'Contact'] as const;

export function EligibilityForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [input, setInput] = useState<EligibilityInput>({
    purpose: 'study',
    destination: 'canada',
    budget: '100k_300k',
    timeline: '6_12m',
    english: 'intermediate',
    funds: 'family_sponsor',
    refusals: 'none',
    hasPassport: true,
    hasOffer: false,
    priorTravel: false,
    fullName: '',
    email: '',
    phone: '',
    consent: false,
  });

  const update = <K extends keyof EligibilityInput>(key: K, value: EligibilityInput[K]) =>
    setInput((prev) => ({ ...prev, [key]: value }));

  const results = useMemo(() => (submitted ? assessEligibility(input) : []), [submitted, input]);
  const progress = ((step + 1) / STEPS.length) * 100;

  const canContinue =
    step === 3
      ? input.fullName.trim().length > 1 &&
        /.+@.+\..+/.test(input.email) &&
        input.phone.trim().length > 5 &&
        input.consent
      : true;

  if (submitted) {
    return (
      <div className="space-y-5">
        <div className="rounded-lg border border-line bg-surface p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-600">
                Assessment complete
              </p>
              <h2 className="mt-1 font-display text-h2 font-semibold text-ink">
                Your route shortlist
              </h2>
            </div>
            <Badge tone="success" dot>
              Summary saved
            </Badge>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
            This is a documentation-readiness assessment, not an approval prediction. Each route
            below lists what is already in place and what would block a filing today.
          </p>
        </div>

        {results.length === 0 ? (
          <Alert tone="warning" title="No route matched this combination">
            The combination of purpose and budget did not match a route we prepare. A case manager
            can still review your profile manually — book a consultation and we will tell you
            honestly whether anything is realistic.
          </Alert>
        ) : (
          <div className="space-y-3">
            {results.map((result, index) => (
              <article
                key={`${result.slug}-${result.serviceSlug}`}
                className={cx(
                  'rounded-lg border bg-surface p-5',
                  index === 0 ? 'border-brand-400 ring-1 ring-brand-200/60' : 'border-line',
                )}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-[1.02rem] font-semibold text-ink">{result.name}</h3>
                    <p className="mt-0.5 text-xs text-ink-tertiary">
                      Typical timeline: {result.expectedTimeline}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      tone={
                        result.fit === 'strong'
                          ? 'success'
                          : result.fit === 'realistic'
                            ? 'info'
                            : 'warning'
                      }
                    >
                      {result.fit === 'strong'
                        ? 'Strong documentation fit'
                        : result.fit === 'realistic'
                          ? 'Realistic with work'
                          : 'Stretch route'}
                    </Badge>
                    <p className="mt-1 font-mono text-[10px] text-ink-tertiary">
                      readiness {result.score}/100
                    </p>
                  </div>
                </div>

                <div className="mt-3">
                  <ProgressBar
                    value={result.score}
                    tone={
                      result.fit === 'strong'
                        ? 'success'
                        : result.fit === 'realistic'
                          ? 'brand'
                          : 'warning'
                    }
                  />
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-success">
                      In place
                    </p>
                    <ul className="mt-1.5 space-y-1">
                      {result.reasons.length === 0 ? (
                        <li className="text-xs text-ink-tertiary">Nothing confirmed yet</li>
                      ) : (
                        result.reasons.map((reason) => (
                          <li
                            key={reason}
                            className="flex items-start gap-1.5 text-xs text-ink-secondary"
                          >
                            <span className="mt-0.5 text-success">✓</span>
                            {reason}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-warning">
                      Gaps to close
                    </p>
                    <ul className="mt-1.5 space-y-1">
                      {result.gaps.length === 0 ? (
                        <li className="text-xs text-ink-tertiary">No major gaps detected</li>
                      ) : (
                        result.gaps.map((gap) => (
                          <li
                            key={gap}
                            className="flex items-start gap-1.5 text-xs text-ink-secondary"
                          >
                            <span className="mt-0.5 text-warning">!</span>
                            {gap}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-3">
                  <Link
                    href={`/services/${result.serviceSlug}`}
                    className="inline-flex h-9 items-center rounded-md bg-brand-700 px-3.5 text-xs font-semibold text-white hover:bg-brand-600"
                  >
                    View service details
                  </Link>
                  <Link
                    href={`/countries/${result.slug}`}
                    className="inline-flex h-9 items-center rounded-md border border-line-strong px-3.5 text-xs font-medium text-ink hover:bg-surface-muted"
                  >
                    Destination guide
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="rounded-lg border border-brand-200 bg-brand-50/70 p-5">
          <h3 className="text-sm font-semibold text-ink">What happens next</h3>
          <ol className="mt-2 space-y-1.5 text-xs text-ink-secondary">
            <li>1. A case manager reviews this summary within one business day.</li>
            <li>2. You receive a written quote with official fees itemised separately.</li>
            <li>3. If you proceed, your case workspace opens with a named verifier.</li>
          </ol>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/consultation"
              className="inline-flex h-10 items-center rounded-md bg-brand-700 px-4 text-sm font-semibold text-white hover:bg-brand-600"
            >
              Book the review call
            </Link>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setStep(0);
              }}
              className="inline-flex h-10 items-center rounded-md border border-line-strong bg-surface px-4 text-sm font-medium text-ink hover:bg-surface-muted"
            >
              Start a new assessment
            </button>
          </div>
        </div>

        <p className="text-[11px] leading-relaxed text-ink-tertiary">
          This assessment uses the information you provided and the policy packs current on the date
          of submission. It does not constitute a guarantee, offer or legal advice. Official fees
          are paid to the relevant authority and are not included in any VisaHobe service fee.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-line bg-surface">
      <div className="border-b border-line px-5 py-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-ink">
            Step {step + 1} of {STEPS.length} · {STEPS[step]}
          </span>
          <span className="text-ink-tertiary">~3 min remaining</span>
        </div>
        <div className="mt-2">
          <ProgressBar value={progress} />
        </div>
        <ol className="mt-3 flex justify-between" aria-label="Assessment progress">
          {STEPS.map((label, index) => (
            <li
              key={label}
              className={cx(
                'text-[10px] font-medium uppercase tracking-wide',
                index <= step ? 'text-brand-700' : 'text-ink-tertiary',
              )}
            >
              {label}
            </li>
          ))}
        </ol>
      </div>

      <div className="p-5">
        {step === 0 ? (
          <fieldset>
            <legend className="text-h3 font-semibold text-ink">
              What do you want to do abroad?
            </legend>
            <p className="mt-1 text-sm text-ink-secondary">
              Choose the closest match. If you are torn between options, pick “not sure” — that is a
              valid answer.
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {PURPOSE_OPTIONS.map((option) => {
                const active = input.purpose === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => update('purpose', option.id)}
                    aria-pressed={active}
                    className={cx(
                      'rounded-md border px-4 py-3 text-left transition-colors',
                      active
                        ? 'border-brand-600 bg-brand-50 ring-1 ring-brand-600/20'
                        : 'border-line bg-surface hover:border-brand-200 hover:bg-surface-muted',
                    )}
                  >
                    <span className="block text-sm font-medium text-ink">{option.label}</span>
                    <span className="mt-0.5 block text-[11px] text-ink-tertiary">
                      {option.hint}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        ) : null}

        {step === 1 ? (
          <fieldset>
            <legend className="text-h3 font-semibold text-ink">Where are you aiming?</legend>
            <p className="mt-1 text-sm text-ink-secondary">
              Destination choice changes the document set, the cost and the timeline significantly.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {DESTINATIONS.map((destination) => {
                const active = input.destination === destination.id;
                return (
                  <button
                    key={destination.id}
                    type="button"
                    onClick={() => update('destination', destination.id)}
                    aria-pressed={active}
                    className={cx(
                      'flex items-center gap-2 rounded-md border px-3 py-2.5 text-left text-sm transition-colors',
                      active
                        ? 'border-brand-600 bg-brand-50 text-ink ring-1 ring-brand-600/20'
                        : 'border-line bg-surface text-ink-secondary hover:border-brand-200',
                    )}
                  >
                    <span aria-hidden>{destination.flag}</span>
                    {destination.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ) : null}

        {step === 2 ? (
          <fieldset>
            <legend className="text-h3 font-semibold text-ink">Your resources and history</legend>
            <p className="mt-1 text-sm text-ink-secondary">
              Honest answers here produce a useful summary. Nothing is shared with anyone outside
              VisaHobe.
            </p>

            <div className="mt-5 space-y-5">
              <Field label="Budget available (service + official fees)">
                <div className="grid gap-2 sm:grid-cols-2">
                  {(
                    [
                      ['under_100k', 'Under BDT 1,00,000'],
                      ['100k_300k', 'BDT 1,00,000 – 3,00,000'],
                      ['300k_600k', 'BDT 3,00,000 – 6,00,000'],
                      ['above_600k', 'Above BDT 6,00,000'],
                    ] as [Budget, string][]
                  ).map(([id, label]) => (
                    <Choice
                      key={id}
                      label={label}
                      active={input.budget === id}
                      onClick={() => update('budget', id)}
                    />
                  ))}
                </div>
              </Field>

              <Field label="When do you want to travel or start?">
                <div className="grid gap-2 sm:grid-cols-2">
                  {(
                    [
                      ['within_3m', 'Within 3 months'],
                      ['3_6m', 'In 3–6 months'],
                      ['6_12m', 'In 6–12 months'],
                      ['no_rush', 'No fixed deadline'],
                    ] as [Timeline, string][]
                  ).map(([id, label]) => (
                    <Choice
                      key={id}
                      label={label}
                      active={input.timeline === id}
                      onClick={() => update('timeline', id)}
                    />
                  ))}
                </div>
              </Field>

              <Field label="English level">
                <div className="grid gap-2 sm:grid-cols-2">
                  {(
                    [
                      ['none', 'No English evidence'],
                      ['basic', 'Basic conversational'],
                      ['intermediate', 'Intermediate / IELTS 5.5–6.0'],
                      ['tested', 'Tested — IELTS 6.5+ or equivalent'],
                    ] as [EnglishLevel, string][]
                  ).map(([id, label]) => (
                    <Choice
                      key={id}
                      label={label}
                      active={input.english === id}
                      onClick={() => update('english', id)}
                    />
                  ))}
                </div>
              </Field>

              <Field label="Funds evidence">
                <div className="grid gap-2 sm:grid-cols-2">
                  {(
                    [
                      ['self', 'My own savings or business income'],
                      ['family_sponsor', 'Family sponsor with documented income'],
                      ['partial', 'Partial — still arranging'],
                      ['none', 'No funds evidence yet'],
                    ] as [Funds, string][]
                  ).map(([id, label]) => (
                    <Choice
                      key={id}
                      label={label}
                      active={input.funds === id}
                      onClick={() => update('funds', id)}
                    />
                  ))}
                </div>
              </Field>

              <Field label="Prior visa refusals">
                <div className="grid gap-2 sm:grid-cols-3">
                  {(
                    [
                      ['none', 'None'],
                      ['one', 'One refusal'],
                      ['multiple', 'More than one'],
                    ] as [Refusals, string][]
                  ).map(([id, label]) => (
                    <Choice
                      key={id}
                      label={label}
                      active={input.refusals === id}
                      onClick={() => update('refusals', id)}
                    />
                  ))}
                </div>
              </Field>

              <Field label="Already in hand (select all that apply)">
                <div className="grid gap-2 sm:grid-cols-3">
                  <Toggle
                    label="Valid passport"
                    checked={input.hasPassport}
                    onChange={(v) => update('hasPassport', v)}
                  />
                  <Toggle
                    label="Offer / admission letter"
                    checked={input.hasOffer}
                    onChange={(v) => update('hasOffer', v)}
                  />
                  <Toggle
                    label="Prior international travel"
                    checked={input.priorTravel}
                    onChange={(v) => update('priorTravel', v)}
                  />
                </div>
              </Field>
            </div>
          </fieldset>
        ) : null}

        {step === 3 ? (
          <fieldset>
            <legend className="text-h3 font-semibold text-ink">
              Where should we send the summary?
            </legend>
            <p className="mt-1 text-sm text-ink-secondary">
              One written summary. No calls unless you ask for one.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-ink">Full name</span>
                <input
                  value={input.fullName}
                  onChange={(e) => update('fullName', e.target.value)}
                  required
                  autoComplete="name"
                  className="h-10 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                  placeholder="As printed on your passport"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-ink">Phone (WhatsApp)</span>
                <input
                  value={input.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  className="h-10 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                  placeholder="+880 1XXX XXXXXX"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1 block text-xs font-medium text-ink">Email</span>
                <input
                  type="email"
                  value={input.email}
                  onChange={(e) => update('email', e.target.value)}
                  required
                  autoComplete="email"
                  className="h-10 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="mt-4 flex cursor-pointer items-start gap-2.5 rounded-md border border-line bg-surface-muted/60 p-3">
              <input
                type="checkbox"
                checked={input.consent}
                onChange={(e) => update('consent', e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded-xs border-line-strong text-brand-700 focus:ring-brand-500"
                required
              />
              <span className="text-[11px] leading-relaxed text-ink-secondary">
                I understand this assessment is informational, not a guarantee or legal advice, that
                official government and embassy fees are separate, and that my details will be used
                to prepare and send this summary.
              </span>
            </label>
          </fieldset>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line bg-surface-muted/50 px-5 py-3">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="h-10 rounded-md border border-line-strong bg-surface px-4 text-sm font-medium text-ink disabled:opacity-40"
        >
          Back
        </button>
        <p className="hidden text-[11px] text-ink-tertiary sm:block">
          Free · no payment · no obligation
        </p>
        <button
          type="button"
          disabled={!canContinue}
          onClick={() => {
            if (step < STEPS.length - 1) setStep((s) => s + 1);
            else setSubmitted(true);
          }}
          className="h-10 rounded-md bg-brand-700 px-5 text-sm font-semibold text-white hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-brand-300"
        >
          {step === STEPS.length - 1 ? 'Get my shortlist' : 'Continue'}
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium text-ink">{label}</p>
      {children}
    </div>
  );
}

function Choice({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        'rounded-md border px-3 py-2.5 text-left text-xs transition-colors',
        active
          ? 'border-brand-600 bg-brand-50 font-medium text-ink ring-1 ring-brand-600/20'
          : 'border-line bg-surface text-ink-secondary hover:border-brand-200',
      )}
    >
      {label}
    </button>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label
      className={cx(
        'flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2.5 text-xs transition-colors',
        checked
          ? 'border-brand-600 bg-brand-50 font-medium text-ink'
          : 'border-line bg-surface text-ink-secondary',
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-3.5 w-3.5 rounded-xs border-line-strong text-brand-700"
      />
      {label}
    </label>
  );
}
