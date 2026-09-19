"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { site, telHref, type Locale } from "@/lib/site";
import type { Dict } from "@/lib/i18n";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * The conversion surface. No backend is wired yet: the submit handler validates,
 * then reports exactly what would be sent so the owner can connect it to their
 * real inbox / CRM. See README for the one-line hook-up.
 */
export function QuoteForm({ locale, t }: { locale: Locale; t: Dict }) {
  const pathname = usePathname();
  const [status, setStatus] = useState<Status>("idle");
  const [ref, setRef] = useState("");
  const f = t.contact.fields;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStatus("sending");

    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    // ── Replace this block with your real endpoint ─────────────────────────
    // e.g. await fetch("/api/quote", { method: "POST", body: JSON.stringify(payload) })
    try {
      await new Promise((r) => setTimeout(r, 550));
      console.info("[HandyMan] quote request ready to send:", payload);
      setRef(`HM-${String(Date.now()).slice(-6)}`);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="sheet-raised p-6 sm:p-9" role="status" aria-live="polite">
        <div className="flex items-start gap-4">
          <span className="stamp stamp-flat text-red">OK</span>
          <div>
            <h3 className="display text-[2rem] text-navy">{t.contact.successTitle}</h3>
            <p className="mt-3 max-w-[46ch] text-[0.98rem] leading-relaxed text-navy/80">
              {t.contact.successBody}
            </p>
            <p className="label mt-5 text-ink-soft">
              {t.contact.successRef}: <span className="tnum text-navy">{ref}</span>
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="btn btn-line mt-6"
            >
              {t.contact.successAgain}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const svcOptions = t.services.categories.map((c) => c.name);

  return (
    <form
      onSubmit={onSubmit}
      noValidate={false}
      className="sheet-raised relative p-5 sm:p-8"
      aria-labelledby="form-title"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-navy/20 pb-3">
        <h3 id="form-title" className="display text-[1.65rem] text-navy">
          {t.contact.formTitle}
        </h3>
        <span className="label text-ink-soft">{t.contact.formNo}</span>
      </div>

      {status === "error" ? (
        <div role="alert" className="margin-rule margin-rule--gold mt-5">
          <p className="label text-gold">
            {locale === "es" ? "No enviado" : "Not sent"}
          </p>
          <div className="margin-rule__body text-[0.95rem] text-navy">
            <strong className="display block text-[1.15rem] text-navy">
              {t.contact.errorTitle}
            </strong>
            <span className="mt-1 block">
              {t.contact.errorBody}{" "}
              <a href={telHref} className="link-u font-semibold">
                {site.contact.phone}
              </a>
            </span>
          </div>
        </div>
      ) : null}

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field label={f.name} htmlFor="name">
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder={f.namePh}
            className={inputCls}
          />
        </Field>

        <Field label={f.phone} htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            placeholder={f.phonePh}
            className={`${inputCls} tnum`}
          />
        </Field>

        <Field label={f.email} htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={f.emailPh}
            className={inputCls}
          />
        </Field>

        <Field label={f.address} htmlFor="address">
          <input
            id="address"
            name="address"
            required
            autoComplete="street-address"
            placeholder={f.addressPh}
            className={inputCls}
          />
        </Field>
      </div>

      <fieldset className="mt-7">
        <legend className="label text-navy">{f.services}</legend>
        <p className="mt-1 text-[0.85rem] text-ink-soft">{f.servicesHint}</p>
        <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {svcOptions.map((name, i) => (
            <li key={name}>
              <label className="flex cursor-pointer items-start gap-3 text-[0.95rem] text-navy">
                <input
                  type="checkbox"
                  name="services"
                  value={name}
                  defaultChecked={i === 0}
                  className="peer sr-only"
                />
                <span className="box peer-checked:border-red peer-checked:bg-red peer-checked:text-cream">
                  <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden="true">
                    <path
                      d="M1 6.4 4.2 9.6 11 2.4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="leading-snug">{name}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field label={f.urgency} htmlFor="urgency">
          <select id="urgency" name="urgency" className={inputCls} defaultValue={f.urgencyOptions[1]}>
            {f.urgencyOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>

        <Field label={f.contactPref} htmlFor="contactPref">
          <select
            id="contactPref"
            name="contactPref"
            className={inputCls}
            defaultValue={f.contactPrefOptions[0]}
          >
            {f.contactPrefOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label={f.details} htmlFor="details">
          <textarea
            id="details"
            name="details"
            rows={5}
            required
            placeholder={f.detailsPh}
            className={`${inputCls} resize-y`}
          />
        </Field>
      </div>

      <label className="mt-6 flex items-start gap-3 text-[0.88rem] leading-relaxed text-navy/80">
        <input type="checkbox" name="consent" required className="peer sr-only" />
        <span className="box peer-checked:border-red peer-checked:bg-red peer-checked:text-cream">
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden="true">
            <path
              d="M1 6.4 4.2 9.6 11 2.4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span>{f.consent}</span>
      </label>

      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="page" value={pathname} />

      <div className="mt-7 flex flex-col gap-3 border-t-2 border-ink-soft/50 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? f.submitting : f.submit}
        </button>
        <p className="text-[0.82rem] text-ink-soft">
          {locale === "es" ? "O llámenos al " : "Or call us at "}
          <a href={telHref} className="link-u tnum font-semibold text-navy">
            {site.contact.phone}
          </a>
        </p>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-sm border-2 border-navy/25 bg-cream px-3.5 py-2.5 text-[1rem] text-navy placeholder:text-ink-soft focus:border-navy focus:outline-none focus-visible:outline-3 focus-visible:outline-red";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="label text-navy">
        {label}
      </label>
      {children}
    </div>
  );
}
