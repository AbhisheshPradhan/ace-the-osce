import ContactBlock from "@/components/ContactBlock";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";

export default function ContactSection() {
	return (
		<Section id="contact" className="scroll-mt-24">
			<Reveal>
				<ContactBlock />
			</Reveal>
		</Section>
	);
}
