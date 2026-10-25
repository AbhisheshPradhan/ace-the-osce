import {defineField, defineType} from 'sanity'

// The heading band at the top of every page except Home.
export const pageHero = defineType({
  name: 'pageHero',
  title: 'Page heading',
  type: 'object',
  options: {collapsible: false},
  fields: [
    defineField({
      name: 'title',
      title: 'Heading',
      type: 'string',
      description: 'Also used in the breadcrumb above it.',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'description', title: 'Intro', type: 'text', rows: 3}),
  ],
})
