import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/lib/cms";

export default async function Logo() {
	const { siteSettings } = await getContent();
	const { logo, siteName } = siteSettings;

	return (
		<Link href="/" aria-label={`${siteName} home`}>
			<Image
				src={logo.asset.url}
				alt={siteName}
				width={logo.asset.width}
				height={logo.asset.height}
				priority
				unoptimized
				className="h-12 w-auto"
			/>
		</Link>
	);
}
