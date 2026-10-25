import Image from "next/image";
import { type Faculty, imageUrl } from "@/lib/cms";

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
	member: Faculty;
	sizes: string;
}) {
	return (
		<div className="relative aspect-square overflow-hidden bg-tint">
			{member.photo ? (
				<Image
					src={imageUrl(member.photo, { width: 800 })}
					alt={member.photo.alt}
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
