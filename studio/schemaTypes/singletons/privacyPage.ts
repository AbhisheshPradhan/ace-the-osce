import {defineArrayMember, defineField, defineType} from 'sanity'
import {LockIcon} from '@sanity/icons/Lock'

export const privacyPage = defineType({
  name: 'privacyPage',
  title: 'Privacy Policy',
  type: 'document',
  icon: LockIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'Search and sharing'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Heading',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last updated',
      type: 'date',
      group: 'content',
      description: 'Shown under the heading. Change it whenever the policy changes.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          name: 'policySection',
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'body', title: 'Text', type: 'richText'}),
          ],
          preview: {select: {title: 'heading'}},
        }),
      ],
    }),
    defineField({name: 'seo', title: 'Search and sharing', type: 'seo', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Privacy Policy'})},
})
