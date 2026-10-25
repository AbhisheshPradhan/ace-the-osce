import {defineField, defineType} from 'sanity'
import {sitePages} from '../../constants'

// A labelled link to a page on this site or to another website.
export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'page',
      title: 'Page on this site',
      type: 'string',
      options: {list: sitePages},
      hidden: ({parent}) => Boolean(parent?.url),
    }),
    defineField({
      name: 'url',
      title: 'Or another website',
      type: 'url',
      hidden: ({parent}) => Boolean(parent?.page),
      validation: (rule) => rule.uri({scheme: ['https', 'mailto']}),
    }),
  ],
  validation: (rule) =>
    rule.custom((value: {page?: string; url?: string} | undefined) =>
      !value || value.page || value.url ? true : 'Choose a page or enter a URL',
    ),
  preview: {
    select: {title: 'label', page: 'page', url: 'url'},
    prepare: ({title, page, url}) => ({title, subtitle: page ?? url}),
  },
})
