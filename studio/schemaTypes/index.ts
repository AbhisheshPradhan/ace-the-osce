import {faculty} from './documents/faculty'
import {testimonial} from './documents/testimonial'
import {faqItem} from './objects/faqItem'
import {imageWithAlt} from './objects/imageWithAlt'
import {link} from './objects/link'
import {pageHero} from './objects/pageHero'
import {richText} from './objects/richText'
import {sectionHeading} from './objects/sectionHeading'
import {seo} from './objects/seo'
import {aboutPage} from './singletons/aboutPage'
import {callToAction} from './singletons/callToAction'
import {contactForm} from './singletons/contactForm'
import {contactPage} from './singletons/contactPage'
import {eveningTaster, inPersonCourse} from './singletons/course'
import {courseDates} from './singletons/courseDates'
import {courseOptionsSection} from './singletons/courseOptionsSection'
import {coursePage} from './singletons/coursePage'
import {footer} from './singletons/footer'
import {header} from './singletons/header'
import {homePage} from './singletons/homePage'
import {notFoundPage} from './singletons/notFoundPage'
import {osceGuidePage} from './singletons/osceGuidePage'
import {privacyPage} from './singletons/privacyPage'
import {siteSettings} from './singletons/siteSettings'
import {testimonialsSection} from './singletons/testimonialsSection'

export const schemaTypes = [
  // Reusable field groups
  faqItem,
  imageWithAlt,
  link,
  pageHero,
  richText,
  sectionHeading,
  seo,
  // Courses (one of each)
  courseDates,
  inPersonCourse,
  eveningTaster,
  // Collections
  faculty,
  testimonial,
  // Pages
  homePage,
  coursePage,
  osceGuidePage,
  aboutPage,
  contactPage,
  privacyPage,
  notFoundPage,
  // Sections shown on several pages
  courseOptionsSection,
  testimonialsSection,
  callToAction,
  // Site-wide
  header,
  footer,
  contactForm,
  siteSettings,
]
