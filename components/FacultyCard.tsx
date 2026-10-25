import FacultyAvatar from "@/components/FacultyAvatar";
import type { Faculty } from "@/lib/cms";
import { facultySlug } from "@/lib/content";

export default function FacultyCard({
	member,
	sizes,
	showBio = false,
}: {
	member: Faculty;
	sizes: string;
	showBio?: boolean;
}) {
	return (
		// scroll-mt clears the fixed header plus the 2rem the Reveal fade-in is still offset by on arrival.
		<article
			id={facultySlug(member.name)}
			className="h-full scroll-mt-36 overflow-hidden rounded-3xl bg-white shadow-lg border border-border target:ring-2 target:ring-primary"
		>
			<FacultyAvatar member={member} sizes={sizes} />
			<div className="p-6">
				<h3 className="text-xl font-semibold text-midnight_text">
					{member.name}
				</h3>
				{member.role && (
					<p className="mt-1 font-medium text-primary">{member.role}</p>
				)}
				{member.credentials && (
					<p className="mt-3 text-sm text-black/70">{member.credentials}</p>
				)}
				{showBio && (
					<details className="group mt-4">
						<summary className="inline-flex cursor-pointer list-none items-center gap-1 text-sm font-medium text-primary [&::-webkit-details-marker]:hidden">
							<span className="group-open:hidden">Read bio</span>
							<span className="hidden group-open:inline">Hide bio</span>
							<span
								aria-hidden="true"
								className="transition-transform group-open:rotate-180"
							>
								▾
							</span>
						</summary>
						<p className="mt-3 text-sm leading-relaxed text-black/70">
							{member.bio}
						</p>
					</details>
				)}
			</div>
		</article>
	);
}
