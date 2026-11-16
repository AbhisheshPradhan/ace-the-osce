import {defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons/Calendar'
import {editElsewhere} from '../../components/EditElsewhere'

type DatesValue = {startDate?: string; endDate?: string} | undefined

// Start and end of one course run, in Sydney time. Optional dates may be left empty, but
// need both a start and an end once either is filled in.
function dates(name: string, title: string, optional = false) {
  const isFilled = (parent: unknown) =>
    Boolean((parent as DatesValue)?.startDate || (parent as DatesValue)?.endDate)
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
        validation: (rule) =>
          optional
            ? rule.custom((start, {parent}) => (start || !isFilled(parent) ? true : 'Required'))
            : rule.required(),
      }),
      defineField({
        name: 'endDate',
        title: 'Ends',
        type: 'datetime',
        description: 'Sydney time.',
        validation: (rule) =>
          (optional ? rule : rule.required()).custom((end, {parent}) => {
            if (!end) return optional && isFilled(parent) ? 'Required' : true
            const start = (parent as DatesValue)?.startDate
            return !start || end > start ? true : 'Must be after the start time'
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
        {id: 'eveningTaster', type: 'eveningTaster', title: 'Free online option'},
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
        'Used by every booking button on the site: Enrol now, the free online option, and the banners.',
      validation: (rule) => rule.required().uri({scheme: ['https']}),
    }),
    dates('inPerson', 'In-person course'),
    defineField({
      name: 'showOnlineOption',
      title: 'Show the free online option',
      type: 'boolean',
      description:
        'The second course card (for example free course materials, or an online Evening Taster). Off hides its card and its line in the Home page hero.',
      initialValue: true,
    }),
    editElsewhere(
      'onlineOptionNote',
      'Turning it on or off, or changing what it is? Also check the text that mentions it:',
      [
        {id: 'eveningTaster', type: 'eveningTaster', title: 'Free online option card'},
        {
          id: 'courseOptionsSection',
          type: 'courseOptionsSection',
          title: 'Course options description',
          path: 'heading',
        },
        {id: 'coursePage', type: 'coursePage', title: 'The Course FAQ', path: 'faq.items'},
        {id: 'coursePage', type: 'coursePage', title: 'The Course search description', path: 'seo'},
        {id: 'homePage', type: 'homePage', title: 'Home hero label', path: 'hero.tasterLabel'},
      ],
    ),
    {
      ...dates('taster', 'Free online option', true),
      description:
        'Only for a session on a set date, such as an Evening Taster. Leave empty for something that is always available, such as course materials.',
      hidden: ({document}) => document?.showOnlineOption === false,
    },
  ],
  preview: {prepare: () => ({title: 'Dates and booking'})},
})
