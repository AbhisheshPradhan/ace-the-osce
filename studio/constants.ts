// Pages that exist on the website, for internal link dropdowns. Add a route here when the
// site gains a page.
export const sitePages = [
  {title: 'Home', value: '/'},
  {title: 'The Course', value: '/course'},
  {title: 'OSCE Guide', value: '/acem-osce'},
  {title: 'About Us', value: '/about-us'},
  {title: 'Contact', value: '/contact'},
  {title: 'Privacy Policy', value: '/privacy'},
]

// Documents that exist exactly once. Their _id equals their type name, so the Studio
// sidebar and the website can find them without a lookup.
export const singletons = {
  courseDates: 'Dates and booking',
  inPersonCourse: 'In-person course',
  eveningTaster: 'Evening Taster',
  homePage: 'Home',
  coursePage: 'The Course',
  osceGuidePage: 'OSCE Guide',
  aboutPage: 'About Us',
  contactPage: 'Contact',
  privacyPage: 'Privacy Policy',
  notFoundPage: 'Page not found',
  courseOptionsSection: 'Course options section',
  testimonialsSection: 'Testimonials section',
  callToAction: 'Call to action',
  header: 'Header',
  footer: 'Footer',
  contactForm: 'Contact form',
  siteSettings: 'Site settings',
} as const

export type SingletonType = keyof typeof singletons
