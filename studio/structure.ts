import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import {CommentIcon} from '@sanity/icons/Comment'
import {HelpCircleIcon} from '@sanity/icons/HelpCircle'
import {HelpPane} from './components/HelpPane'
import {singletons, type SingletonType} from './constants'

// A sidebar item that opens a singleton's form directly, with no list in between.
function singleton(S: StructureBuilder, type: SingletonType) {
  return S.listItem()
    .title(singletons[type])
    .id(type)
    .schemaType(type)
    .child(S.document().schemaType(type).documentId(type).title(singletons[type]))
}

// The sidebar, ordered by how often the team edits each part: course dates first,
// site-wide details last.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('How to update the website')
        .id('help')
        .icon(HelpCircleIcon)
        .child(S.component(HelpPane).id('help').title('How to update the website')),

      S.divider().title('Courses'),
      singleton(S, 'courseDates'),
      singleton(S, 'inPersonCourse'),
      singleton(S, 'eveningTaster'),
      singleton(S, 'courseOptionsSection'),

      S.divider().title('Pages'),
      singleton(S, 'homePage'),
      singleton(S, 'coursePage'),
      singleton(S, 'osceGuidePage'),
      singleton(S, 'aboutPage'),
      singleton(S, 'contactPage'),
      singleton(S, 'privacyPage'),
      singleton(S, 'notFoundPage'),

      S.divider().title('People'),
      S.documentTypeListItem('faculty').title('Faculty'),
      S.listItem()
        .title('Testimonials')
        .icon(CommentIcon)
        .child(
          S.list()
            .title('Testimonials')
            .items([
              S.documentTypeListItem('testimonial').title('All testimonials'),
              singleton(S, 'testimonialsSection'),
            ]),
        ),

      S.divider().title('Site-wide'),
      singleton(S, 'header'),
      singleton(S, 'footer'),
      singleton(S, 'contactForm'),
      singleton(S, 'callToAction'),
      singleton(S, 'siteSettings'),
    ])
