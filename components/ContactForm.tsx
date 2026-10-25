"use client";

import Link from "next/link";
import { useActionState } from "react";
import { type ContactState, sendContactMessage } from "@/app/contact/actions";
import RichText from "@/components/RichText";
import { CheckIcon } from "@/components/icons";
import type { Content } from "@/lib/cms";

// The form's wording, from Contact form in Sanity (rich-text messages are handled by the action).
export type ContactFormText = Omit<
	Content["contactForm"],
	"heading" | "intro" | "sendError" | "unavailableError" | "emailHeading" | "venueHeading" | "mapLinkLabel"
>;

const initialState: ContactState = { status: "idle" };

const inputClass =
	"mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-black placeholder:text-black/40 focus:border-primary";

export default function ContactForm({
	sittings,
	text,
}: {
	sittings: string[];
	text: ContactFormText;
}) {
	const [state, formAction, pending] = useActionState(
		sendContactMessage,
		initialState,
	);

	if (state.status === "success") {
		return (
			<div role="status" className="rounded-3xl bg-tint p-8 text-center">
				<span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
					<CheckIcon className="h-6 w-6" />
				</span>
				<h2 className="mt-5 text-2xl font-semibold text-midnight_text">
					{text.successHeading}
				</h2>
				<p className="mt-2 text-black/70">
					{text.successText}
				</p>
			</div>
		);
	}

	const errors = state.fieldErrors ?? {};
	const values = state.values;

	return (
		<form action={formAction} noValidate className="space-y-5">
			<div>
				<label htmlFor="name" className="font-medium text-midnight_text">
					{text.nameLabel}
				</label>
				<input
					id="name"
					name="name"
					autoComplete="name"
					defaultValue={values?.name}
					required
					aria-invalid={Boolean(errors.name)}
					aria-describedby={errors.name ? "name-error" : undefined}
					className={inputClass}
				/>
				{errors.name && (
					<p id="name-error" className="mt-1 text-sm text-red-700">
						{errors.name}
					</p>
				)}
			</div>
			<div>
				<label htmlFor="email" className="font-medium text-midnight_text">
					{text.emailLabel}
				</label>
				<input
					id="email"
					name="email"
					type="email"
					autoComplete="email"
					defaultValue={values?.email}
					required
					aria-invalid={Boolean(errors.email)}
					aria-describedby={errors.email ? "email-error" : undefined}
					className={inputClass}
				/>
				{errors.email && (
					<p id="email-error" className="mt-1 text-sm text-red-700">
						{errors.email}
					</p>
				)}
			</div>
			<div>
				<label htmlFor="sitting" className="font-medium text-midnight_text">
					{text.sittingLabel}{" "}
					<span className="font-normal text-black/60">{text.optionalLabel}</span>
				</label>
				<select
					id="sitting"
					name="sitting"
					defaultValue={values?.sitting ?? ""}
					className={inputClass}
				>
					<option value="">{text.sittingPlaceholder}</option>
					{sittings.map((sitting) => (
						<option key={sitting} value={sitting}>
							{sitting}
						</option>
					))}
					<option value={text.notSureOption}>{text.notSureOption}</option>
				</select>
			</div>
			<div>
				<label htmlFor="message" className="font-medium text-midnight_text">
					{text.messageLabel}
				</label>
				<textarea
					id="message"
					name="message"
					rows={5}
					defaultValue={values?.message}
					required
					aria-invalid={Boolean(errors.message)}
					aria-describedby={errors.message ? "message-error" : undefined}
					className={inputClass}
				/>
				{errors.message && (
					<p id="message-error" className="mt-1 text-sm text-red-700">
						{errors.message}
					</p>
				)}
			</div>
			{/* Honeypot for bots: hidden from people and screen readers. */}
			<div aria-hidden="true" className="absolute -left-[9999px]">
				<label htmlFor="company">Company</label>
				<input id="company" name="company" tabIndex={-1} autoComplete="off" />
			</div>
			{state.message && (
				<p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-red-800">
					<RichText text={state.message} />
				</p>
			)}
			<div className="flex flex-wrap items-center gap-4">
				<button
					type="submit"
					disabled={pending}
					className="bg-primary border border-primary px-6 py-3 rounded-lg text-white hover:bg-primary-dark disabled:opacity-60"
				>
					{pending ? text.sendingLabel : text.submitLabel}
				</button>
				<p className="text-sm text-black/60">
					{text.privacyText}{" "}
					<Link href="/privacy" className="text-primary hover:underline">
						{text.privacyLinkLabel}
					</Link>
					.
				</p>
			</div>
		</form>
	);
}
