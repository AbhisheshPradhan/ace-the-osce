import Image from "next/image";
import type { FacultyMember } from "@/lib/content";

function initials(name: string) {
	return name
		.replace(/^(Dr|A\/Prof)\.?\s+/, "")
		.split(/\s+/)
		.map((part) => part[0])
		.slice(0, 2)
		.join("");
}

export default function FacultyAvatar({
	member,
	sizes,
}: {
	member: FacultyMember;
	sizes: string;
}) {
	return (
		<div className="relative aspect-square overflow-hidden bg-tint">
			{member.image ? (
				<Image
					src={member.image}
					alt={member.name}
					fill
					sizes={sizes}
					className="object-cover object-top"
				/>
			) : (
				<span className="absolute inset-0 flex items-center justify-center text-5xl font-semibold text-primary">
					{initials(member.name)}
				</span>
			)}
		</div>
	);
}
