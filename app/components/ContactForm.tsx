'use client';

import { useState, type FormEvent } from 'react';

type Language = 'en' | 'es';

const copy = {
  en: {
    name: 'Your name', email: 'Email address', phone: 'Phone (optional)',
    interest: 'I am interested in', choose: 'Choose one',
    buying: 'Buying', selling: 'Selling', relocating: 'Relocating', other: 'Something else',
    message: 'Tell me about your plans', submit: 'Send inquiry', sending: 'Sending…',
    success: 'Thank you. Your message has been sent, and we will be in touch soon.',
    error: 'Your message could not be sent. Please try again in a moment.',
  },
  es: {
    name: 'Tu nombre', email: 'Correo electrónico', phone: 'Teléfono (opcional)',
    interest: 'Me interesa', choose: 'Selecciona una opción',
    buying: 'Comprar', selling: 'Vender', relocating: 'Reubicarme', other: 'Otro tema',
    message: 'Cuéntame sobre tus planes', submit: 'Enviar consulta', sending: 'Enviando…',
    success: 'Gracias. Tu mensaje fue enviado y pronto nos pondremos en contacto.',
    error: 'No se pudo enviar tu mensaje. Inténtalo de nuevo en un momento.',
  },
} as const;

export default function ContactForm({ language }: { language: Language }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const t = copy[language];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;

    const form = event.currentTarget;
    const fields = new FormData(form);
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.get('name'),
          email: fields.get('email'),
          phone: fields.get('phone'),
          interest: fields.get('interest'),
          message: fields.get('message'),
          website: fields.get('website'),
          language,
        }),
      });

      if (!response.ok) throw new Error('Contact request failed');
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-row">
        <label><span>{t.name}</span><input name="name" autoComplete="name" required minLength={2} maxLength={100} /></label>
        <label><span>{t.email}</span><input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
      </div>
      <div className="contact-form-row">
        <label><span>{t.phone}</span><input name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>
        <label><span>{t.interest}</span><select name="interest" required defaultValue=""><option value="" disabled>{t.choose}</option><option value="buying">{t.buying}</option><option value="selling">{t.selling}</option><option value="relocating">{t.relocating}</option><option value="other">{t.other}</option></select></label>
      </div>
      <label><span>{t.message}</span><textarea name="message" required minLength={10} maxLength={2000} rows={5} /></label>
      <div className="contact-honeypot" aria-hidden="true"><label>Website<input name="website" autoComplete="off" tabIndex={-1} /></label></div>
      <div className="contact-form-bottom"><button className="button dark" type="submit" disabled={status === 'sending'}>{status === 'sending' ? t.sending : t.submit} <span aria-hidden="true">↗</span></button><p role="status" aria-live="polite" className={`contact-form-status ${status}`}>{status === 'success' ? t.success : status === 'error' ? t.error : ''}</p></div>
    </form>
  );
}
