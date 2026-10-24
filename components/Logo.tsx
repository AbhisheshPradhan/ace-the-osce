import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/content";

export default function Logo() {
	return (
		<Link href="/" aria-label={`${site.name} home`}>
			<Image
				src="/images/logo/logo.svg"
				alt={site.name}
				width={77}
				height={48}
				priority
				unoptimized
				className="h-12 w-auto"
			/>
		</Link>
	);
}
