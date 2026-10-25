import {defineArrayMember, defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons/Calendar'
import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {PinIcon} from '@sanity/icons/Pin'
import {UserIcon} from '@sanity/icons/User'

// A tag the editor drops into a sentence; the website swaps it for a live value when it
// builds. It has no settings, so its one field is hidden.
function liveValue(name: string, title: string, description: string, icon: typeof UserIcon) {
  return defineArrayMember({
    name,
    title,
    type: 'object',
    icon,
    description,
    fields: [defineField({name: 'value', type: 'string', hidden: true})],
    preview: {prepare: () => ({title})},
  })
}

// Paragraph text with bold, italic, links and live values. Kept deliberately small so
// copy can't break the design: no headings, lists, colours or sizes.
export const richText = defineType({
  name: 'richText',
  title: 'Rich text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{title: 'Normal', value: 'normal'}],
      lists: [],
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
        ],
        annotations: [
          defineArrayMember({
            name: 'link',
            title: 'Web link',
            type: 'object',
            fields: [
              defineField({
                name: 'href',
                title: 'URL',
                type: 'url',
                validation: (rule) => rule.required().uri({scheme: ['https', 'mailto']}),
              }),
            ],
          }),
          defineArrayMember({
            name: 'facultyLink',
            title: 'Faculty member',
            type: 'object',
            icon: UserIcon,
            description: 'Links to their profile on the About Us page.',
            fields: [
              defineField({
                name: 'faculty',
                title: 'Faculty member',
                type: 'reference',
                to: [{type: 'faculty'}],
                validation: (rule) => rule.required(),
              }),
            ],
          }),
        ],
      },
      of: [
        liveValue(
          'contactEmail',
          'Contact email',
          'The email address from Site settings, as a link.',
          EnvelopeIcon,
        ),
        liveValue(
          'nextCourseDate',
          'Next course date',
          'The in-person course date from Dates and booking, for example "Friday 24 July 2026".',
          CalendarIcon,
        ),
        liveValue(
          'nextCourseVenue',
          'Next course venue',
          'The venue from the In-person course card.',
          PinIcon,
        ),
      ],
    }),
  ],
})
