import {defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons/Calendar'
import {editElsewhere} from '../../components/EditElsewhere'

// Start and end of one course run, in Sydney time.
function dates(name: string, title: string) {
  return defineField({
    name,
    title,
    type: 'object',
    options: {collapsible: false},
    fields: [
      defineField({
        name: 'startDate',
        title: 'Starts',
        type: 'datetime',
        description: 'Sydney time.',
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'endDate',
        title: 'Ends',
        type: 'datetime',
        description: 'Sydney time.',
        validation: (rule) =>
          rule.required().custom((end, {parent}) => {
            const start = (parent as {startDate?: string} | undefined)?.startDate
            return !end || !start || end > start ? true : 'Must be after the start time'
          }),
      }),
    ],
  })
}

// The twice-a-year job: new dates and the Humanitix link, in one form. Until a course's
// end time has passed, the website shows its date and booking buttons; after that it shows
// the "no dates" texts.
export const courseDates = defineType({
  name: 'courseDates',
  title: 'Dates and booking',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    editElsewhere(
      'sharedNote',
      'Update this before each course. The text on each course card is edited separately:',
      [
        {id: 'inPersonCourse', type: 'inPersonCourse', title: 'In-person course'},
        {id: 'eveningTaster', type: 'eveningTaster', title: 'Evening Taster'},
      ],
    ),
    editElsewhere(
      'sittingsNote',
      'Also check the ACEM exam sittings. They are shown on the OSCE Guide page and in the contact form\'s "Which sitting?" dropdown:',
      [
        {
          id: 'osceGuidePage',
          type: 'osceGuidePage',
          title: 'ACEM sittings',
          path: 'sittings.items',
        },
      ],
    ),
    defineField({
      name: 'bookingUrl',
      title: 'Humanitix link',
      type: 'url',
      description:
        'Used by every booking button on the site: Enrol now, Register for free, and the banners.',
      validation: (rule) => rule.required().uri({scheme: ['https']}),
    }),
    dates('inPerson', 'In-person course'),
    dates('taster', 'Evening Taster'),
  ],
  preview: {prepare: () => ({title: 'Dates and booking'})},
})
