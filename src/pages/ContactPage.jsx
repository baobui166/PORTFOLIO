import { useEffect, useState } from "react";
import PageShell from "../components/layout/PageShell";
import Icon from "../components/ui/Icon";
import ToastStack from "../components/ui/Toast";

const socialIcons = ["terminal", "database", "share"];
const mapImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCXPNIW2TzbbS9a3H2L9Yj166FILgsih_PotatEMAHnsDG83IOpOnu4ZoYE8lqumepQ6l_jia4R2aRANoGIC5y746pjoLbLF7GdHDOkped8UNvOgB8AHMa1JTHiRBQNgfTDMbVX0kA66ZGO328yj9u8E2bGatl8s9yLEJsPKKmc3KtOnD6EQjDiH4rd0xtjOFRbm7VDK55Esaxcsz7t5Gn0hcrzD6u9JznZ7l5-IrxDUYwtArRfSiZA9QVAVBwJ4VRLggixGR5pSf1L";
const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function ContactField({
  error,
  label,
  multiline,
  name,
  onBlur,
  onChange,
  placeholder,
  type = "text",
  value,
}) {
  const fieldClass =
    "w-full border-b-2 bg-surface-container-lowest px-4 py-3 font-mono text-primary outline-none transition-colors placeholder:text-surface-container-highest focus:border-secondary";
  const borderClass = error ? "border-error/70" : "border-outline-variant";

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-3 font-label text-xs uppercase tracking-widest text-secondary">
        <Icon name="chevron_right" className="text-sm" />
        {label}
      </label>
      {multiline ? (
        <textarea
          className={`${fieldClass} ${borderClass} resize-none`}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
          rows="4"
          value={value}
        />
      ) : (
        <input
          className={`${fieldClass} ${borderClass}`}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
        />
      )}
      {error ? (
        <p className="font-mono text-[10px] uppercase tracking-widest text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ContactFooter() {
  return (
    <footer className="fixed bottom-0 hidden w-full items-center justify-between border-t border-outline-variant/10 bg-surface-container-lowest/80 px-8 py-2 backdrop-blur-md md:flex">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="font-label text-[10px] uppercase tracking-tighter text-on-surface-variant/40">
            System Uptime
          </span>
          <span className="font-mono text-[10px] text-primary-container">
            402:14:55:08
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-label text-[10px] uppercase tracking-tighter text-on-surface-variant/40">
            Location
          </span>
          <span className="font-mono text-[10px] text-primary-container">
            35.6764 N, 139.6500 E
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-label text-[10px] uppercase tracking-tighter text-on-surface-variant/40">
          Signal
        </span>
        <div className="flex h-2 items-end gap-0.5">
          <div className="h-[20%] w-1 bg-primary-container" />
          <div className="h-[40%] w-1 bg-primary-container" />
          <div className="h-[70%] w-1 bg-primary-container" />
          <div className="h-full w-1 bg-primary-container" />
        </div>
      </div>
    </footer>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    if (toasts.length === 0) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setToasts((current) => current.slice(1));
    }, 5200);

    return () => window.clearTimeout(timer);
  }, [toasts]);

  function dismissToast(id) {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }

  function pushToast(type, message, detail) {
    const id = window.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

    setToasts((current) => [
      ...current.slice(-2),
      {
        detail,
        id,
        message,
        type,
      },
    ]);
  }

  function validateForm(data) {
    const nextErrors = {};

    if (!data.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!emailPattern.test(data.email.trim())) {
      nextErrors.email = "Enter a valid email address";
    }

    if (!data.subject.trim()) {
      nextErrors.subject = "Subject is required";
    }

    if (!data.message.trim()) {
      nextErrors.message = "Message is required";
    }

    return nextErrors;
  }

  function handleFieldChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  }

  function handleFieldBlur(event) {
    const { name } = event.target;
    const fieldErrors = validateForm(formData);

    setErrors((current) => ({
      ...current,
      [name]: fieldErrors[name] || "",
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      pushToast(
        "error",
        "Request blocked. Please check the highlighted fields.",
        "VALIDATION_GATEWAY",
      );
      return;
    }

    if (!contactEndpoint) {
      pushToast(
        "info",
        "Formspree endpoint is not configured yet.",
        "ADD VITE_CONTACT_ENDPOINT",
      );
      return;
    }

    setIsSubmitting(true);
    pushToast("info", "Transmitting message payload...", "SECURE_SSL");

    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          message: formData.message.trim(),
          source: "portfolio_contact",
          subject: formData.subject.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Delivery endpoint rejected the request");
      }

      setFormData({ email: "", subject: "", message: "" });
      pushToast("success", "Message delivered. I will reply soon.", "FORMPREE_ACK");
    } catch {
      pushToast("error", "Delivery failed. Please try again later.", "ENDPOINT_REJECTED");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageShell
      className="min-h-screen bg-background text-on-background selection:bg-primary-container selection:text-on-primary-container"
      footer={<ContactFooter />}
    >
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 pb-4 pt-24 md:px-12 lg:grid-cols-12 lg:pb-0">
        <section className="flex flex-col justify-center lg:col-span-5">
          <div className="mb-6 inline-flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary-container" />
            <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary">
              Awaiting Input
            </span>
          </div>
          <h1 className="mb-8 font-headline text-5xl font-bold leading-none tracking-[-0.04em] text-primary md:text-7xl">
            ESTABLISH
            <br />
            CONNECTION.
          </h1>
          <p className="mb-12 max-w-md text-lg leading-relaxed text-on-surface-variant">
            The architect is currently online. Submit a signed request to
            initiate a secure communication channel. Response latency:{" "}
            <span className="font-mono text-primary-container">~120ms</span>.
          </p>
          <div className="flex flex-wrap gap-4">
            {socialIcons.map((icon) => (
              <a
                key={icon}
                className="group flex h-14 w-14 items-center justify-center rounded-xl border border-outline-variant/10 bg-surface-container-high shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-primary-container/50"
                href="#"
              >
                <Icon
                  name={icon}
                  className="text-2xl text-on-surface-variant group-hover:text-primary-container group-hover:drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]"
                />
              </a>
            ))}
          </div>
        </section>
        <section className="lg:col-span-7">
          <div className="group relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary-container/20 to-secondary-container/20 opacity-50 blur-2xl transition duration-1000 group-hover:opacity-75 group-hover:duration-200" />
            <div className="relative overflow-hidden rounded-2xl border border-outline-variant/10 bg-surface-container-lowest shadow-2xl">
              <div className="flex items-center justify-between border-b border-outline-variant/10 bg-surface-container-low px-6 py-4">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-error/40" />
                  <span className="h-3 w-3 rounded-full bg-secondary/40" />
                  <span className="h-3 w-3 rounded-full bg-primary-container/40" />
                </div>
                <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/50">
                  root@architect:~ /messenger
                </span>
                <span className="w-12" />
              </div>
              <form
                className="space-y-8 p-8"
                onSubmit={handleSubmit}
                noValidate
              >
                <ContactField
                  error={errors.email}
                  label="Sender Email"
                  name="email"
                  onBlur={handleFieldBlur}
                  onChange={handleFieldChange}
                  placeholder="guest@domain.com"
                  type="email"
                  value={formData.email}
                />
                <ContactField
                  error={errors.subject}
                  label="Subject"
                  name="subject"
                  onBlur={handleFieldBlur}
                  onChange={handleFieldChange}
                  placeholder="protocol_initiation"
                  value={formData.subject}
                />
                <ContactField
                  error={errors.message}
                  label="Message Body"
                  name="message"
                  onBlur={handleFieldBlur}
                  onChange={handleFieldChange}
                  placeholder="Enter payload details..."
                  value={formData.message}
                  multiline
                />
                <div className="flex flex-col justify-between gap-6 pt-4 md:flex-row md:items-center">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary-container" />
                      <span className="font-mono text-[10px] text-on-surface-variant">
                        SECURE_SSL
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary-container" />
                      <span className="font-mono text-[10px] text-on-surface-variant">
                        v2.4.0
                      </span>
                    </div>
                  </div>
                  <button
                    className="group relative overflow-hidden rounded-lg px-8 py-3 font-headline font-bold uppercase tracking-tighter text-on-primary disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary-container transition-transform group-hover:scale-105" />
                    <span className="relative z-10 flex items-center gap-2">
                      {isSubmitting ? "Sending..." : "Execute Send"}
                      <Icon name="send" className="text-sm" />
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <section className="relative mt-6 h-[220px] w-full overflow-hidden grayscale contrast-125 opacity-40 transition-opacity duration-1000 hover:opacity-100 md:h-[240px] lg:mt-2">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-transparent to-background" />
        <img
          alt="Abstract satellite view of a futuristic glowing night city map with neon grid lines and data points"
          className="h-full w-full object-cover"
          src={mapImage}
        />
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="absolute inset-0 scale-150 animate-pulse rounded-full bg-primary-container/20 blur-xl" />
            <div className="h-4 w-4 rounded-full border-4 border-background bg-primary-container shadow-[0_0_20px_#00f5ff]" />
          </div>
        </div>
      </section>
      <ToastStack onDismiss={dismissToast} toasts={toasts} />
    </PageShell>
  );
}
