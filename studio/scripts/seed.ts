// One-off import of the website's current content into Sanity.
//
//   npx sanity exec scripts/seed.ts --with-user-token
//
// Safe to re-run: every document has a fixed _id and is replaced, and Sanity reuses an
// image asset when the same file is uploaded again. Re-running overwrites edits made in
// the Studio, so only run it before the team starts editing.
//
// Copy that is written inside page components (rather than lib/content.ts) is repeated
// here as it appears on the site.
import {createReadStream} from 'node:fs'
import {basename, resolve} from 'node:path'
import type {IdentifiedSanityDocumentStub} from '@sanity/client'
import {getCliClient} from 'sanity/cli'
import {navLinks} from '../../components/navLinks'
import {
  courseDay,
  courseOptions,
  curriculum,
  faculty,
  facultySlug,
  faqs,
  freeSession,
  nextCourse,
  site,
  stats,
  testimonials,
} from '../../lib/content'
import {
  eligibility,
  examFee,
  guideFaqs,
  keyFacts,
  osceSource,
  sittings,
  stationTypes,
} from '../../lib/osce-facts'

const client = getCliClient({apiVersion: '2025-02-19'})
const repoRoot = resolve(process.cwd(), '..')

let keyCount = 0
const key = () => `k${(keyCount++).toString(36)}`

// Pieces of copy that become live values in Sanity rather than typed text.
const liveValues: Record<string, string> = {
  [site.email]: 'contactEmail',
  '{date}': 'nextCourseDate',
  '{venue}': 'nextCourseVenue',
}
const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const TOKEN = new RegExp(
  `(\\[[^\\]]+\\]\\((?:faculty:[a-z0-9-]+|https:[^)]+)\\)|${Object.keys(liveValues).map(escape).join('|')})`,
)

// "Text with [Dr X](faculty:slug) and [web](https://…) links, the site email, {date} and
// {venue}" -> one Portable Text block.
function block(text: string) {
  const markDefs: object[] = []
  const children = text
    .split(TOKEN)
    .filter(Boolean)
    .map((part) => {
      if (liveValues[part]) return {_type: liveValues[part], _key: key()}
      const match = part.match(/^\[([^\]]+)\]\((faculty:([a-z0-9-]+)|https:[^)]+)\)$/)
      if (!match) return {_type: 'span', _key: key(), text: part, marks: []}
      const markKey = key()
      markDefs.push(
        match[3]
          ? {
              _type: 'facultyLink',
              _key: markKey,
              faculty: {_type: 'reference', _ref: `faculty-${match[3]}`},
            }
          : {_type: 'link', _key: markKey, href: match[2]},
      )
      return {_type: 'span', _key: key(), text: match[1], marks: [markKey]}
    })
  return {_type: 'block', _key: key(), style: 'normal', markDefs, children}
}

const richText = (paragraphs: string[]) => paragraphs.map(block)

// Uploads a file from the repo and returns a reference to the Sanity asset.
async function upload(file: string) {
  const asset = await client.assets.upload('image', createReadStream(resolve(repoRoot, file)), {
    filename: basename(file),
  })
  console.log(`  uploaded ${file}`)
  return {_type: 'reference', _ref: asset._id}
}

const image = async (file: string, alt: string) => ({
  _type: 'imageWithAlt',
  asset: await upload(file),
  alt,
})

const reference = (id: string) => ({_type: 'reference', _key: key(), _ref: id})
const publicFile = (path: string) => `public${path}`
const facultyId = (name: string) => `faculty-${facultySlug(name)}`
const withKeys = <T extends object>(type: string, items: T[]) =>
  items.map((item) => ({_type: type, _key: key(), ...item}))
const faqItems = (items: {question: string; answer: string}[]) =>
  items.map(({question, answer}) => ({
    _type: 'faqItem',
    _key: key(),
    question,
    answer: richText([answer]),
  }))
const link = (label: string, page: string) => ({_type: 'link', _key: key(), label, page})

const siteDescription =
  'A small-group, in-person ACEM Fellowship OSCE preparation course at the Westmead Simulation Centre, run by FACEM educators since 2016.'
const simulationAlt =
  'Emergency team running a resuscitation simulation on a manikin while a colleague holds up a “Quiet please” sign'

async function main() {
  console.log('Uploading images…')

  const facultyDocs = []
  for (const member of faculty) {
    const slug = facultySlug(member.name)
    facultyDocs.push({
      _id: `faculty-${slug}`,
      _type: 'faculty',
      name: member.name,
      role: member.role,
      credentials: member.credentials,
      photo: member.image ? await image(publicFile(member.image), member.name) : undefined,
      bio: member.bio,
    })
  }

  const [taster, inPerson] = ['online-session', 'in-person-course'].map((id) =>
    courseOptions.find((option) => option.id === id)!,
  )
  const iso = (date: string) => new Date(date).toISOString()
  const courseDocs = [
    {
      _id: 'courseDates',
      _type: 'courseDates',
      bookingUrl: site.enrolUrl,
      inPerson: {startDate: iso(nextCourse.startDate), endDate: iso(nextCourse.endDate)},
      taster: {startDate: iso(freeSession.startDate), endDate: iso(freeSession.endDate)},
    },
    {
      _id: 'inPersonCourse',
      _type: 'inPersonCourse',
      title: inPerson.title,
      venue: inPerson.venue,
      description: richText(inPerson.description),
      highlights: inPerson.highlights,
      ctaLabel: inPerson.cta,
      image: await image(publicFile(inPerson.image), inPerson.imageAlt),
    },
    {
      _id: 'eveningTaster',
      _type: 'eveningTaster',
      title: taster.title,
      venue: taster.venue,
      description: richText(taster.description),
      highlights: taster.highlights,
      ctaLabel: taster.cta,
      image: await image(publicFile(taster.image), taster.imageAlt),
    },
  ]

  const testimonialDocs = testimonials.map((testimonial, i) => ({
    _id: `testimonial-${i + 1}`,
    _type: 'testimonial',
    quote: richText([testimonial.quote]),
    attribution: testimonial.attribution,
    ...(testimonial.rating && {rating: testimonial.rating}),
  }))

  const simulationImage = await image('public/images/simulation-training.jpeg', simulationAlt)
  const lauraImage = await image(
    'public/images/communication-station-laura.jpg',
    'Dr Laura Brown and a candidate during a communication station in the simulation room',
  )
  const heroPhotos = {
    cornerImage: await image(
      'public/images/hero/recorded-station.jpg',
      'A station being recorded on a laptop for video feedback',
    ),
    sideImage: await image(
      'public/images/hero/communication-seated.jpg',
      'A candidate and a role-player face to face during a communication station',
    ),
    topImage: await image(
      'public/images/hero/group-scenario.jpg',
      'Candidates and faculty discussing a scenario around a manikin on a trolley',
    ),
  }
  const logo = {_type: 'image', asset: await upload('public/images/logo/logo.svg')}
  const siteIcon = {_type: 'image', asset: await upload('app/icon.png')}
  const shareImage = await image(
    'public/og.png',
    'Ace the OSCE: ACEM Fellowship OSCE preparation course',
  )

  const pageDocs = [
    {
      _id: 'homePage',
      _type: 'homePage',
      seo: {
        title: 'Ace the OSCE | ACEM Fellowship OSCE Preparation Course, Sydney',
        description: siteDescription,
      },
      hero: {
        eyebrow: `${site.name} · Since ${site.foundedYear}`,
        heading: 'Pass the ACEM Fellowship OSCE with confidence',
        subheading:
          'A small-group, in-person course at the Westmead Simulation Centre, run by FACEM educators.',
        paymentNote: 'Payment plans available',
        tasterLabel: 'Free online Evening Taster',
        noDatesText: 'Next course dates coming soon',
        noDatesButtonLabel: 'Register your interest',
        detailsButtonLabel: 'View course details',
        image: simulationImage,
        ...heroPhotos,
        stats: withKeys('stat', stats),
      },
      about: {
        heading: {
          eyebrow: 'About our course',
          title: 'Helping ACEM candidates pass the OSCE since 2016',
        },
        body: richText([
          'Since 2016, Ace the OSCE has helped hundreds of ACEM fellowship candidates across Australia and New Zealand succeed in one of the most challenging parts of their training—the OSCE. Our boutique, high-yield course is designed specifically to give candidates the edge they need.',
          'The course combines expert guidance with highly personalised feedback in a supportive, high-teacher-to-participant environment.',
        ]),
        points: [
          'Boutique, high-yield course',
          'Small groups with a high teacher-to-participant ratio',
          'Highly personalised feedback',
          'Experienced FACEM faculty',
        ],
        linkLabel: 'More about us',
        image: lauraImage,
      },
      facultyPreview: {
        heading: {
          eyebrow: 'Our faculty',
          title: 'Learn from FACEM educators',
          description:
            'Experienced emergency physicians from Sydney hospitals, dedicated to helping you succeed.',
        },
        members: faculty
          .filter((member) => member.role)
          .map((member) => reference(facultyId(member.name))),
        linkLabel: 'Meet all our faculty',
      },
    },
    {
      _id: 'coursePage',
      _type: 'coursePage',
      seo: {
        title: 'ACEM OSCE Preparation Course in Sydney',
        description:
          'Small-group ACEM Fellowship OSCE course at Westmead Simulation Centre: trial stations, coaching and video feedback from FACEM faculty, and a free online taster.',
      },
      hero: {
        title: 'ACEM OSCE Preparation Course',
        description:
          'A small-group, in-person course at the Westmead Simulation Centre, run by FACEM educators since 2016.',
      },
      howItWorks: {
        heading: {
          eyebrow: 'How it works',
          title: 'Your course, from start to finish',
          description: 'Support before, during and after the in-person day.',
        },
        steps: withKeys('step', courseDay),
        topicsHeading: 'What we cover',
        topics: curriculum,
      },
      faq: {
        heading: {eyebrow: 'FAQ', title: 'Frequently asked questions'},
        items: faqItems(faqs),
        guideLinkIntro: 'New to the exam?',
        guideLinkLabel: 'Read our ACEM OSCE guide',
      },
    },
    {
      _id: 'osceGuidePage',
      _type: 'osceGuidePage',
      seo: {
        title: 'ACEM Fellowship OSCE: Format, Stations, Eligibility and Dates',
        description:
          'A plain-English guide to the ACEM Fellowship OSCE: 12 stations of 11 minutes over two days, station types, eligibility, fees and 2026–27 sitting dates.',
      },
      hero: {
        title: 'The ACEM Fellowship OSCE',
        description:
          'Everything you need to know about the Fellowship Clinical Examination: the format, station types, who can sit it and when.',
      },
      keyFacts: {
        heading: {
          eyebrow: 'At a glance',
          title: 'Key facts',
          description: `The OSCE is a clinical exam based on scenarios you would expect to see in the emergency department. The current exam fee is ${examFee} per attempt.`,
        },
        facts: withKeys('fact', keyFacts),
      },
      format: {
        heading: {eyebrow: 'Format', title: 'How the exam runs'},
        body: richText([
          'The OSCE is held over two consecutive days and has up to 12 clinical stations.',
          'Each station is 11 minutes: 4 minutes of reading time followed by 7 minutes of assessment. That adds up to 132 minutes of stations across the two days.',
        ]),
        stationTypesHeading: 'Station types',
        stationTypesIntro: 'Every sitting includes at least one of each:',
        stationTypes,
      },
      eligibility: {
        heading: {
          eyebrow: 'Eligibility',
          title: 'Who can sit the OSCE?',
          description:
            'You must meet these requirements by the eligibility deadline for your chosen sitting:',
        },
        requirements: eligibility,
        note: 'Specialist international medical graduates and transitioned trainees have variations under ACEM’s regulations.',
      },
      sittings: {
        heading: {
          eyebrow: 'Dates',
          title: 'Upcoming OSCE sittings',
          description:
            'The application close date is also the withdrawal cut-off, unless exceptional circumstances apply.',
        },
        items: withKeys('sitting', sittings),
      },
      faq: {
        heading: {eyebrow: 'OSCE FAQ', title: 'Common questions about the OSCE'},
        items: faqItems(guideFaqs),
      },
      source: {
        note: richText([
          `Source: [ACEM Examinations](${osceSource.url}), last checked ${osceSource.lastChecked}. Exam details can change, so always confirm with ACEM before applying. Past papers and exam reports are on [ACEM eLearning](${osceSource.resourcesUrl}).`,
        ]),
        url: osceSource.url,
        lastChecked: osceSource.lastCheckedIso,
      },
      banner: {
        heading: 'Practise under exam conditions',
        textUpcoming: richText([
          'Our next in-person course is on {date} at the {venue}, with trial stations, individual coaching and video feedback from FACEM faculty.',
        ]),
        textNoDates: richText([
          'Our next in-person course dates will be announced soon. Each course runs at the {venue}, with trial stations, individual coaching and video feedback from FACEM faculty.',
        ]),
        enrolLabel: 'Enrol now',
        courseLinkLabel: 'See course options',
      },
    },
    {
      _id: 'aboutPage',
      _type: 'aboutPage',
      seo: {
        title: 'About Us and Our Faculty',
        description:
          'Since 2016, Ace the OSCE has helped hundreds of ACEM fellowship candidates across Australia and New Zealand prepare for the OSCE. Meet our FACEM faculty.',
      },
      hero: {
        title: 'About Us',
        description: 'Your ultimate preparation for the ACEM Fellowship Exam.',
      },
      intro: {
        body: richText([
          'Since 2016, Ace the OSCE has helped hundreds of ACEM fellowship candidates across Australia and New Zealand succeed in one of the most challenging parts of their training—the OSCE.',
          'Our boutique, high-yield course is designed specifically to give candidates the edge they need. The course combines expert guidance with highly personalised feedback in a supportive, high-teacher-to-participant environment.',
          'With small group sizes, individualised attention, and a track record of success, Ace the OSCE isn’t just another prep course—it’s your personalised path to passing the OSCE with confidence.',
        ]),
        image: simulationImage,
      },
      directors: {
        heading: {
          eyebrow: 'Our team',
          title: 'Course directors',
          description: 'The founding team behind Ace the OSCE.',
        },
        members: faculty
          .filter((member) => member.role)
          .map((member) => reference(facultyId(member.name))),
      },
      faculty: {
        heading: {
          title: 'Faculty',
          description: 'Emergency physicians and educators who coach at our courses.',
        },
        members: faculty
          .filter((member) => !member.role)
          .map((member) => reference(facultyId(member.name))),
      },
    },
    {
      _id: 'contactPage',
      _type: 'contactPage',
      seo: {
        title: 'Contact',
        description:
          'Questions about Ace the OSCE courses, schedules or enrolment? Send us a message or find the Westmead Simulation Centre.',
      },
      hero: {
        title: 'Contact',
        description:
          'We’re here to help you succeed. Ace the OSCE is run by experienced doctors, dedicated to helping doctors feel confident and prepared for their OSCE exams. Whether you’re curious about our courses, schedules, or enrolment, we’d love to hear from you — get in touch today.',
      },
      emailHeading: 'Prefer email?',
      venueHeading: 'Find the Simulation Centre',
      mapLinkLabel: 'Open in Google Maps',
    },
    {
      _id: 'privacyPage',
      _type: 'privacyPage',
      seo: {
        title: 'Privacy Policy',
        description: `How ${site.name} collects, uses and protects your personal information.`,
      },
      title: 'Privacy Policy',
      lastUpdated: '2026-10-25',
      sections: withKeys('policySection', [
        {
          heading: 'What we collect',
          body: richText([
            'When you use our contact form, we collect your name, email address, the OSCE sitting you are preparing for (if you choose to tell us) and your message.',
            'We use Google Analytics to understand how visitors use our website, such as which pages are viewed and how people arrive at the site. This uses cookies and collects information like your approximate location, device and browser. It does not identify you by name.',
            'Course bookings and payments are handled by Humanitix, not by this website. Humanitix’s own privacy policy applies to the information you give them.',
          ]),
        },
        {
          heading: 'How we use it',
          body: richText([
            'We use your contact details only to reply to your enquiry and, if you ask, to tell you about upcoming courses. We use analytics information to improve the website.',
            'We do not sell or rent your personal information, and we do not use it for unrelated marketing.',
          ]),
        },
        {
          heading: 'How it is stored',
          body: richText([
            `Messages sent through our contact form are delivered by our email provider, Resend, to the ${site.name} email inbox. Analytics information is stored by Google. These providers may store information outside Australia.`,
            'We keep enquiry emails only as long as we need them to respond and to run our courses.',
          ]),
        },
        {
          heading: 'Your choices',
          body: richText([
            'You can ask us to see, correct or delete the personal information we hold about you by emailing us. You can block or delete cookies in your browser settings, or use Google’s opt-out browser add-on to stop Google Analytics.',
          ]),
        },
        {
          heading: 'Contact us',
          body: richText([
            `If you have a question or concern about privacy, email ${site.email}. We aim to handle privacy matters in line with the Australian Privacy Principles.`,
          ]),
        },
      ]),
    },
    {
      _id: 'notFoundPage',
      _type: 'notFoundPage',
      heading: 'We couldn’t find that page',
      text: 'It may have moved when we updated our website. Try one of these instead:',
      suggestions: withKeys('suggestion', [
        {link: link('The course', '/course'), description: 'Dates, venue and how to enrol.'},
        {
          link: link('ACEM OSCE guide', '/acem-osce'),
          description: 'Format, stations, eligibility and sitting dates.',
        },
        {
          link: link('Contact us', '/contact'),
          description: 'Questions about the course? Get in touch.',
        },
      ]),
      homeButtonLabel: 'Back to home',
    },
  ]

  const sectionDocs = [
    {
      _id: 'courseOptionsSection',
      _type: 'courseOptionsSection',
      heading: {
        eyebrow: 'Course options',
        title: 'Choose how you prepare',
        description:
          'Start with our free online Evening Taster, then join the in-person course for a full day of coached OSCE practice.',
      },
      noDatesText: 'Dates to be announced',
      noDatesButtonLabel: 'Ask about the next course',
      detailsLinkLabel: 'How the course works, what we cover and FAQs',
    },
    {
      _id: 'testimonialsSection',
      _type: 'testimonialsSection',
      heading: {eyebrow: 'Testimonials', title: 'What our participants say'},
      items: testimonialDocs.map((doc) => reference(doc._id)),
    },
    {
      _id: 'callToAction',
      _type: 'callToAction',
      heading: 'Ready to ace your OSCE?',
      text: 'Join our small group course, or get in touch with any questions.',
      enrolLabel: 'Enrol now',
      contactLabel: 'Contact us',
    },
  ]

  const siteWideDocs = [
    {
      _id: 'header',
      _type: 'header',
      menu: navLinks.map((navLink) => link(navLink.label, navLink.href)),
      enrolLabel: 'Enrol Now',
      noDatesLabel: 'Get in Touch',
    },
    {
      _id: 'footer',
      _type: 'footer',
      tagline: site.tagline,
      linksHeading: 'Quick Links',
      links: [{href: '/', label: 'Home'}, ...navLinks].map((navLink) =>
        link(navLink.label, navLink.href),
      ),
      contactHeading: 'Get in Touch',
      privacyLinkLabel: 'Privacy Policy',
    },
    {
      _id: 'contactForm',
      _type: 'contactForm',
      heading: 'Send us a message',
      intro: 'We’ll get back to you soon.',
      nameLabel: 'Name',
      emailLabel: 'Email',
      sittingLabel: 'Which OSCE sitting are you preparing for?',
      optionalLabel: '(optional)',
      sittingPlaceholder: 'Select a sitting',
      notSureOption: 'Not sure yet',
      messageLabel: 'Message',
      submitLabel: 'Send message',
      sendingLabel: 'Sending…',
      privacyText: 'See our',
      privacyLinkLabel: 'privacy policy',
      successHeading: 'Thanks, we’ve got your message',
      successText: 'We’ll reply to your email as soon as we can.',
      nameError: 'Please enter your name.',
      emailError: 'Please enter a valid email address.',
      messageError: 'Please enter a message (at least 10 characters).',
      sendError: richText([
        `Sorry, something went wrong sending your message. Please try again or email us at ${site.email}.`,
      ]),
      unavailableError: richText([
        `Sorry, the form isn’t working right now. Please email us at ${site.email}.`,
      ]),
    },
    {
      _id: 'siteSettings',
      _type: 'siteSettings',
      siteName: site.name,
      email: site.email,
      location: {
        name: site.location.name,
        streetAddress: site.location.streetAddress,
        locality: site.location.locality,
        region: site.location.region,
        postcode: site.location.postcode,
        mapQuery: site.location.mapQuery,
      },
      logo,
      siteIcon,
      defaultDescription: siteDescription,
      shareImage,
    },
  ]

  // Faculty first, so the references in courses, testimonials and pages resolve.
  const docs: IdentifiedSanityDocumentStub[] = [
    ...facultyDocs,
    ...courseDocs,
    ...testimonialDocs,
    ...pageDocs,
    ...sectionDocs,
    ...siteWideDocs,
  ]
  const transaction = client.transaction()
  for (const doc of docs) transaction.createOrReplace(doc)
  await transaction.commit()
  console.log(`Created or replaced ${docs.length} documents.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
