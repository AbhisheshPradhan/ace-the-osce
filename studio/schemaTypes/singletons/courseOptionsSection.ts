import {defineField, defineType} from 'sanity'
import {ThListIcon} from '@sanity/icons/ThList'
import {editElsewhere} from '../../components/EditElsewhere'

export const courseOptionsSection = defineType({
  name: 'courseOptionsSection',
  title: 'Course options section',
  type: 'document',
  icon: ThListIcon,
  fields: [
    editElsewhere(
      'sharedNote',
      'Shown on Home and The Course. The two cards are edited separately:',
      [
        {id: 'inPersonCourse', type: 'inPersonCourse', title: 'In-person course'},
        {id: 'eveningTaster', type: 'eveningTaster', title: 'Evening Taster'},
      ],
    ),
    defineField({name: 'heading', title: 'Heading', type: 'sectionHeading'}),
    defineField({
      name: 'noDatesText',
      title: 'Text once a date has passed',
      type: 'string',
      description: 'Replaces the date on a card whose course date has passed.',
    }),
    defineField({
      name: 'noDatesButtonLabel',
      title: 'Button once a date has passed',
      type: 'string',
      description: 'Replaces the booking button. Links to the Contact page.',
    }),
    defineField({
      name: 'detailsLinkLabel',
      title: 'Course details link',
      type: 'string',
      description: 'Shown under the cards on the Home page only. Links to The Course page.',
    }),
  ],
  preview: {prepare: () => ({title: 'Course options'})},
})
