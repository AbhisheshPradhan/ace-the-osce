import {defineArrayMember, defineField, defineType} from 'sanity'
import {WarningOutlineIcon} from '@sanity/icons/WarningOutline'

export const notFoundPage = defineType({
  name: 'notFoundPage',
  title: 'Page not found',
  type: 'document',
  icon: WarningOutlineIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: "Shown when someone opens a link to a page that doesn't exist.",
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'text', title: 'Text', type: 'text', rows: 2}),
    defineField({
      name: 'suggestions',
      title: 'Suggested pages',
      type: 'array',
      validation: (rule) => rule.max(3),
      of: [
        defineArrayMember({
          name: 'suggestion',
          type: 'object',
          fields: [
            defineField({name: 'link', title: 'Link', type: 'link'}),
            defineField({name: 'description', title: 'Description', type: 'string'}),
          ],
          preview: {select: {title: 'link.label', subtitle: 'description'}},
        }),
      ],
    }),
    defineField({
      name: 'homeButtonLabel',
      title: 'Home button',
      type: 'string',
      description: 'Links to the Home page.',
    }),
  ],
  preview: {prepare: () => ({title: 'Page not found'})},
})
