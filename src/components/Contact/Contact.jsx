// cSpell:words Nyamata Bugesera Elyse

import { useState } from "react";
import { Phone, MapPin, Mail, Send } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import PhoneInput, {
  isValidPhoneNumber,
} from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";

const initialForm = {
  name: "",
  email: "",
  location: "",
  subject: "",
  message: "",
};

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        [name]: "",
      }));
    }

    if (status !== "idle") {
      setStatus("idle");
      setSubmitError("");
    }
  };

  const handlePhoneChange = (value) => {
    setPhone(value || "");

    if (errors.phone) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        phone: "",
      }));
    }

    if (status !== "idle") {
      setStatus("idle");
      setSubmitError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Please enter a valid name.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(form.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!phone) {
      newErrors.phone = "Telephone number is required.";
    } else if (!isValidPhoneNumber(phone)) {
      newErrors.phone = "Please enter a valid telephone number.";
    }

    if (!form.location.trim()) {
      newErrors.location = "Location is required.";
    }

    if (!form.subject.trim()) {
      newErrors.subject = "Subject is required.";
    } else if (form.subject.trim().length < 3) {
      newErrors.subject = "Subject must contain at least 3 characters.";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must contain at least 10 characters.";
    }

    return newErrors;
  };

  const getErrorMessage = (data, fallbackMessage) => {
    if (typeof data?.error === "string") {
      return data.error;
    }

    if (
      data?.error &&
      typeof data.error === "object" &&
      typeof data.error.message === "string"
    ) {
      return data.error.message;
    }

    if (typeof data?.message === "string") {
      return data.message;
    }

    return fallbackMessage;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (status === "sending") {
      return;
    }

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("idle");
      return;
    }

    setErrors({});
    setSubmitError("");
    setStatus("sending");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone,
      location: form.location.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get("content-type");
      let data = {};

      if (contentType?.includes("application/json")) {
        data = await response.json();
      } else {
        const responseText = await response.text();

        if (responseText) {
          data = {
            message: responseText,
          };
        }
      }

      if (!response.ok) {
        throw new Error(
          getErrorMessage(
            data,
            "Your message could not be sent. Please try again."
          )
        );
      }

      setForm(initialForm);
      setPhone("");
      setStatus("success");
    } catch (error) {
      console.error("Contact form submission error:", error);

      setStatus("error");
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Your message could not be sent. Please try again later."
      );
    }
  };

  return (
    <section
      id="contact"
      className="bg-linear-to-b from-sky-50 via-white to-cyan-50 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <p className="font-semibold uppercase tracking-widest text-cyan-600">
            Contact Us
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Let&apos;s Talk About Your Project
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            Share your requirements and we&apos;ll get back to you with the
            right solution for your IT, electronics, and technical support
            needs.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-5">
            <div className="flex items-center gap-5 rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-cyan-100">
                <Phone className="text-cyan-700" size={28} />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">Phone</h3>

                <a
                  href="tel:+250790059779"
                  className="text-gray-600 transition hover:text-cyan-700"
                >
                  +250 790 059 779
                </a>
              </div>
            </div>

            <div className="flex items-center gap-5 rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-cyan-100">
                <MapPin className="text-cyan-700" size={28} />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">Location</h3>

                <p className="text-gray-600">
                  Nyamata, Bugesera, Rwanda
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-cyan-100">
                <Mail className="text-cyan-700" size={28} />
              </div>

              <div className="min-w-0">
                <h3 className="text-lg font-bold text-slate-900">Email</h3>

                <a
                  href="mailto:tmuhire06@gmail.com"
                  className="break-all text-gray-600 transition hover:text-cyan-700"
                >
                  tmuhire06@gmail.com
                </a>
              </div>
            </div>

            <div className="flex gap-4 pt-3">
              <a
                href="https://facebook.com/elysetechsolution"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-600 text-white transition hover:-translate-y-1 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                aria-label="Visit Elyse Tech Facebook page"
              >
                <FaFacebookF size={20} />
              </a>

              <a
                href="https://instagram.com/elysetechsolution"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-600 text-white transition hover:-translate-y-1 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                aria-label="Visit Elyse Tech Instagram page"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          <form
            className="space-y-5 rounded-3xl border border-cyan-100 bg-white p-6 shadow-xl sm:p-8"
            onSubmit={handleSubmit}
            noValidate
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Full Name <span className="text-red-600">*</span>
              </label>

              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`w-full rounded-xl border p-4 outline-none transition focus:ring-2 ${
                  errors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-cyan-500 focus:ring-cyan-200"
                }`}
              />

              {errors.name && (
                <p
                  id="name-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email Address <span className="text-red-600">*</span>
              </label>

              <input
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                autoComplete="email"
                placeholder="Enter your email address"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full rounded-xl border p-4 outline-none transition focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-cyan-500 focus:ring-cyan-200"
                }`}
              />

              {errors.email && (
                <p
                  id="email-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Telephone Number <span className="text-red-600">*</span>
              </label>

              <div
                className={`rounded-xl border bg-white px-4 py-3 transition focus-within:ring-2 ${
                  errors.phone
                    ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-200"
                    : "border-gray-300 focus-within:border-cyan-500 focus-within:ring-cyan-200"
                }`}
              >
                <PhoneInput
                  id="phone"
                  international
                  defaultCountry="RW"
                  flags={flags}
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="Enter telephone number"
                  countryCallingCodeEditable={false}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={
                    errors.phone ? "phone-error" : undefined
                  }
                  className="phone-input-custom"
                />
              </div>

              {errors.phone && (
                <p
                  id="phone-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Location <span className="text-red-600">*</span>
              </label>

              <input
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
                type="text"
                autoComplete="address-level2"
                placeholder="For example: Nyamata, Bugesera"
                aria-invalid={Boolean(errors.location)}
                aria-describedby={
                  errors.location ? "location-error" : undefined
                }
                className={`w-full rounded-xl border p-4 outline-none transition focus:ring-2 ${
                  errors.location
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-cyan-500 focus:ring-cyan-200"
                }`}
              />

              {errors.location && (
                <p
                  id="location-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.location}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Subject <span className="text-red-600">*</span>
              </label>

              <input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                type="text"
                placeholder="What would you like to discuss?"
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={
                  errors.subject ? "subject-error" : undefined
                }
                className={`w-full rounded-xl border p-4 outline-none transition focus:ring-2 ${
                  errors.subject
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-cyan-500 focus:ring-cyan-200"
                }`}
              />

              {errors.subject && (
                <p
                  id="subject-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.subject}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Message <span className="text-red-600">*</span>
              </label>

              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={6}
                placeholder="Tell us about your project or question"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? "message-error" : undefined
                }
                className={`w-full resize-y rounded-xl border p-4 outline-none transition focus:ring-2 ${
                  errors.message
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-cyan-500 focus:ring-cyan-200"
                }`}
              />

              {errors.message && (
                <p
                  id="message-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-8 py-4 font-semibold text-white transition hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              <Send size={19} />

              {status === "sending" ? "Sending..." : "Send Inquiry"}
            </button>

            <div aria-live="polite">
              {status === "sending" && (
                <p className="text-sm text-gray-600" role="status">
                  Sending your message...
                </p>
              )}

              {status === "success" && (
                <p
                  className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
                  role="status"
                >
                  Thank you! Your message was sent successfully. We&apos;ll
                  reply as soon as possible.
                </p>
              )}

              {status === "error" && (
                <p
                  className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                  role="alert"
                >
                  {submitError}
                </p>
              )}
            </div>
          </form>
        </div>

        <div className="mt-16">
          <h3 className="mb-8 text-center text-3xl font-bold text-slate-900">
            Find Our Location
          </h3>

          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.0345260881327!2d30.083014374488823!3d-2.1404490371552347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19c354b8b0a37e77%3A0xe3d11f6d7f8c2205!2sNyamata%20Market!5e0!3m2!1sen!2srw!4v1783687442821!5m2!1sen!2srw"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Elyse Tech location in Nyamata"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;