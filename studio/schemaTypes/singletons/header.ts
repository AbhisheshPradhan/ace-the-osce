import {defineArrayMember, defineField, defineType} from 'sanity'
import {MenuIcon} from '@sanity/icons/Menu'

export const header = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'menu',
      title: 'Menu links',
      type: 'array',
      of: [defineArrayMember({type: 'link'})],
      description: 'Shown in the header and the mobile menu. Drag to reorder.',
    }),
    defineField({
      name: 'enrolLabel',
      title: 'Booking button',
      type: 'string',
      description: 'Shown until the in-person course date in Dates and booking has passed. Links to the Humanitix link there.',
    }),
    defineField({
      name: 'noDatesLabel',
      title: 'Button when no course is scheduled',
      type: 'string',
      description: 'Replaces the booking button. Links to the Contact page.',
    }),
  ],
  preview: {prepare: () => ({title: 'Header'})},
})
