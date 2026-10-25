import {defineField, defineType} from 'sanity'

// What search engines and link previews show for a page.
export const seo = defineType({
  name: 'seo',
  title: 'Search and sharing',
  type: 'object',
  options: {collapsible: false},
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
      type: 'string',
      description:
        'Shown in the browser tab and Google results. "| Ace the OSCE" is added after it.',
      validation: (rule) =>
        rule.max(70).warning('Google shortens titles longer than about 60 characters.'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'The summary under the title in Google results.',
      validation: (rule) =>
        rule.max(170).warning('Google shortens descriptions longer than about 160 characters.'),
    }),
  ],
})
