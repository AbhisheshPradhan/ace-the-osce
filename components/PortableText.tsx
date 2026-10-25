import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import {
	type Block,
	formatCourseDate,
	getContent,
	type LiveValue,
	type MarkDef,
	type RichText,
	type Span,
} from "@/lib/cms";
import { facultySlug } from "@/lib/content";

const linkClass =
	"font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary";

// Renders Sanity rich text: paragraphs, bold, italic, web links, faculty links (to their
// About Us card) and live values (contact email, next course date and venue). Plain text
// mentions of the contact email become mailto links, as in the old RichText.
// `inline` renders the text without <p> wrappers, for use inside another element.
export default async function PortableText({
	value,
	className,
	inline = false,
}: {
	value: RichText;
	className?: string;
	inline?: boolean;
}) {
	const { siteSettings, courseDates, inPersonCourse } = await getContent();
	const { email } = siteSettings;

	const emailLink = (key: string) => (
		<a key={key} href={`mailto:${email}`} className={`${linkClass} break-all`}>
			{email}
		</a>
	);
	const liveValues: Record<LiveValue["_type"], (key: string) => ReactNode> = {
		contactEmail: emailLink,
		nextCourseDate: () => formatCourseDate(courseDates.inPerson.startDate),
		nextCourseVenue: () => inPersonCourse.venue,
	};

	const text = (value: string) =>
		value
			.split(email)
			.flatMap((part, i) =>
				i === 0 ? [part] : [emailLink(`email-${i}`), part],
			);

	const mark = (children: ReactNode, name: string, markDefs: MarkDef[]) => {
		if (name === "strong") return <strong>{children}</strong>;
		if (name === "em") return <em>{children}</em>;
		const def = markDefs.find((d) => d._key === name);
		if (def?._type === "facultyLink") {
			return (
				<Link
					href={`/about-us/#${facultySlug(def.faculty.name)}`}
					className={linkClass}
				>
					{children}
				</Link>
			);
		}
		if (def?._type === "link") {
			return def.href.startsWith("mailto:") ? (
				<a href={def.href} className={linkClass}>
					{children}
				</a>
			) : (
				<a
					href={def.href}
					target="_blank"
					rel="noopener noreferrer"
					className={linkClass}
				>
					{children}
				</a>
			);
		}
		return children;
	};

	const span = (child: Span, markDefs: MarkDef[]) =>
		child.marks.reduce<ReactNode>(
			(node, name) => mark(node, name, markDefs),
			text(child.text),
		);

	const children = (block: Block) =>
		block.children.map((child) => (
			<Fragment key={child._key}>
				{child._type === "span"
					? span(child, block.markDefs)
					: liveValues[child._type](child._key)}
			</Fragment>
		));

	if (inline) {
		return value.map((block, i) => (
			<Fragment key={block._key}>
				{i > 0 && " "}
				{children(block)}
			</Fragment>
		));
	}
	return value.map((block) => (
		<p key={block._key} className={className}>
			{children(block)}
		</p>
	));
}
