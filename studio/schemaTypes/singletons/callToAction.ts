import {defineField, defineType} from 'sanity'
import {BulbOutlineIcon} from '@sanity/icons/BulbOutline'
import {editElsewhere} from '../../components/EditElsewhere'

export const callToAction = defineType({
  name: 'callToAction',
  title: 'Call to action',
  type: 'document',
  icon: BulbOutlineIcon,
  fields: [
    editElsewhere(
      'sharedNote',
      'The coloured banner near the bottom of Home, The Course and About Us.',
    ),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'text', title: 'Text', type: 'text', rows: 2}),
    defineField({
      name: 'enrolLabel',
      title: 'Booking button',
      type: 'string',
      description:
        'Links to the Humanitix link in Dates and booking. Shown only until the in-person course date has passed.',
    }),
    defineField({
      name: 'contactLabel',
      title: 'Contact button',
      type: 'string',
      description: 'Links to the Contact page.',
    }),
  ],
  preview: {prepare: () => ({title: 'Call to action'})},
})
