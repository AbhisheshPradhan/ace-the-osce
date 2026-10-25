"use server";

import { getContent, toPlainText } from "@/lib/cms";

export type ContactState = {
	status: "idle" | "success" | "error";
	message?: string;
	fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
	// Echoed back on error so the form can refill what the visitor typed (React resets forms after an action).
	values?: { name: string; email: string; sitting: string; message: string };
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Sends the contact form to the team inbox via Resend. Replies go straight to the sender.
export async function sendContactMessage(
	_prev: ContactState,
	formData: FormData,
): Promise<ContactState> {
	// Honeypot: real visitors never see or fill this field.
	if (String(formData.get("company") ?? "").trim()) {
		return { status: "success" };
	}

	const name = String(formData.get("name") ?? "").trim();
	const email = String(formData.get("email") ?? "").trim();
	const sitting = String(formData.get("sitting") ?? "").trim();
	const message = String(formData.get("message") ?? "").trim();

	const content = await getContent();
	const { contactForm, siteSettings } = content;
	const values = { name, email, sitting, message };
	const fieldErrors: ContactState["fieldErrors"] = {};
	if (!name || name.length > 100) fieldErrors.name = contactForm.nameError;
	if (!EMAIL_PATTERN.test(email) || email.length > 200)
		fieldErrors.email = contactForm.emailError;
	if (message.length < 10 || message.length > 5000)
		fieldErrors.message = contactForm.messageError;
	if (Object.keys(fieldErrors).length) {
		return { status: "error", fieldErrors, values };
	}

	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) {
		console.error("Contact form: RESEND_API_KEY is not set");
		return {
			status: "error",
			message: toPlainText(contactForm.unavailableError, content),
			values,
		};
	}

	const response = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			from:
				process.env.CONTACT_FROM_EMAIL ??
				"Ace the OSCE website <noreply@acetheosce.com.au>",
			to: [siteSettings.email],
			reply_to: email,
			subject: `Website enquiry from ${name}`,
			text: [
				`Name: ${name}`,
				`Email: ${email}`,
				`OSCE sitting: ${sitting || "Not specified"}`,
				"",
				message,
			].join("\n"),
		}),
	});

	if (!response.ok) {
		console.error("Contact form: Resend error", response.status, await response.text());
		return {
			status: "error",
			message: toPlainText(contactForm.sendError, content),
			values,
		};
	}

	return { status: "success" };
}
