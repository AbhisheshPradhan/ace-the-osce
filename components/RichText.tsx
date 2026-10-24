import Link from "next/link";
import { faculty, facultySlug, site } from "@/lib/content";

const facultySlugs = new Set(faculty.map((member) => facultySlug(member.name)));

const linkClass =
	"font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary";

const escapedEmail = site.email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const TOKEN = new RegExp(`(\\[[^\\]]+\\]\\(faculty:[a-z0-9-]+\\)|${escapedEmail})`, "g");

// Renders copy with `[text](faculty:slug)` links to that person's About Us card, and turns
// the site email address into a mailto link. Unknown slugs throw so a typo fails the build.
export default function RichText({ text }: { text: string }) {
	return text.split(TOKEN).map((part, i) => {
		if (part === site.email) {
			return (
				<a key={i} href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
					{part}
				</a>
			);
		}
		const match = part.match(/^\[([^\]]+)\]\(faculty:([a-z0-9-]+)\)$/);
		if (!match) return part;
		const [, label, slug] = match;
		if (!facultySlugs.has(slug)) {
			throw new Error(`RichText: no faculty member with slug "${slug}"`);
		}
		return (
			<Link key={i} href={`/about-us/#${slug}`} className={linkClass}>
				{label}
			</Link>
		);
	});
}
