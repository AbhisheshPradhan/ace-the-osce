"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { navLinks } from "@/components/navLinks";

const noopSubscribe = () => () => {};

export default function MobileMenu({
	cta,
}: {
	cta: { href: string; label: string; external: boolean };
}) {
	const [open, setOpen] = useState(false);
	// The drawer is portalled to <body>: the header's backdrop-blur would otherwise
	// become the containing block for its fixed positioning.
	const isClient = useSyncExternalStore(
		noopSubscribe,
		() => true,
		() => false,
	);
	const close = () => setOpen(false);

	useEffect(() => {
		if (!open) return;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("keydown", onKeyDown);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<>
			<button
				type="button"
				className="block lg:hidden p-2 rounded-lg"
				aria-label="Toggle mobile menu"
				aria-expanded={open}
				aria-controls="mobile-menu"
				onClick={() => setOpen(!open)}
			>
				<span className="block w-6 h-0.5 bg-black" />
				<span className="block w-6 h-0.5 bg-black mt-1.5" />
				<span className="block w-6 h-0.5 bg-black mt-1.5" />
			</button>
			{isClient &&
				createPortal(
					<div className="lg:hidden">
						<div
							aria-hidden="true"
							onClick={close}
							className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
						/>
						<div
							id="mobile-menu"
							role="dialog"
							aria-modal="true"
							aria-label="Menu"
							inert={!open}
							className={`fixed top-0 right-0 z-50 h-dvh w-full max-w-xs bg-white shadow-lg transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
						>
							<div className="flex items-center justify-between p-4">
								<h2 className="text-lg font-bold text-midnight_text">
									Menu
								</h2>
								<button
									type="button"
									aria-label="Close mobile menu"
									onClick={close}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										className=""
									>
										<path
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
							<nav className="flex flex-col items-start p-4">
								{navLinks.map((link) => (
									<Link
										key={link.label}
										className="w-full py-2 px-3 rounded-md text-black hover:text-primary"
										href={link.href}
										onClick={close}
									>
										{link.label}
									</Link>
								))}
								<a
									className="mt-4 w-full text-center bg-primary border border-primary px-4 py-2 rounded-lg text-white hover:bg-primary-dark"
									href={cta.href}
									{...(cta.external && {
										target: "_blank",
										rel: "noopener noreferrer",
									})}
									onClick={close}
								>
									{cta.label}
								</a>
							</nav>
						</div>
					</div>,
					document.body,
				)}
		</>
	);
}
