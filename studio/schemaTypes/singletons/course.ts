import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons/Document'
import {editElsewhere} from '../../components/EditElsewhere'

// The text on the in-person course and Evening Taster cards. Both share one set of fields
// and each exists once. Their dates and the Humanitix link are in Dates and booking.
function course(
  name: string,
  title: string,
  examples: {title: string; venue: string; cta: string},
) {
  return defineType({
    name,
    title,
    type: 'document',
    icon: DocumentIcon,
    fields: [
      editElsewhere(
        'datesNote',
        'Changing the dates or the Humanitix link? They are in Dates and booking, not here.',
        [{id: 'courseDates', type: 'courseDates', title: 'Dates and booking'}],
      ),
      editElsewhere(
        'sharedNote',
        'This card is shown on Home and The Course. What it says once its date has passed is set in Course options section.',
        [
          {
            id: 'courseOptionsSection',
            type: 'courseOptionsSection',
            title: 'Course options section',
          },
        ],
      ),
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        description: `For example "${examples.title}".`,
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'venue',
        title: 'Venue',
        type: 'string',
        description: `Shown exactly as written, for example "${examples.venue}".`,
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'description',
        title: 'Description',
        type: 'richText',
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'highlights',
        title: 'Highlights',
        type: 'array',
        of: [defineArrayMember({type: 'string'})],
        description: 'The ticked list on the course card.',
      }),
      defineField({
        name: 'ctaLabel',
        title: 'Button label',
        type: 'string',
        description: `For example "${examples.cta}".`,
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'image',
        title: 'Image',
        type: 'imageWithAlt',
        validation: (rule) => rule.required(),
      }),
    ],
    preview: {prepare: () => ({title})},
  })
}

export const inPersonCourse = course('inPersonCourse', 'In-person course', {
  title: 'In-Person Course',
  venue: 'Westmead Simulation Centre',
  cta: 'Enrol now',
})

export const eveningTaster = course('eveningTaster', 'Evening Taster', {
  title: 'Evening Taster: Tips and Tricks',
  venue: 'Online via Zoom',
  cta: 'Register for free',
})
