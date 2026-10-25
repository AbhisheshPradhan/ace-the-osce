import {defineField, defineType} from 'sanity'

// The small label, heading and optional intro line at the top of most sections.
export const sectionHeading = defineType({
  name: 'sectionHeading',
  title: 'Section heading',
  type: 'object',
  options: {collapsible: false},
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Label above the heading',
      type: 'string',
      description: 'Small coloured text, for example "Our faculty".',
    }),
    defineField({
      name: 'title',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Intro',
      type: 'text',
      rows: 2,
    }),
  ],
})
