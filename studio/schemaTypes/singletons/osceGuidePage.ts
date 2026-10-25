import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'

export const osceGuidePage = defineType({
  name: 'osceGuidePage',
  title: 'OSCE Guide',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'hero', title: 'Page heading', default: true},
    {name: 'facts', title: 'Key facts'},
    {name: 'format', title: 'Format'},
    {name: 'eligibility', title: 'Eligibility'},
    {name: 'sittings', title: 'Sittings'},
    {name: 'faq', title: 'FAQ and source'},
    {name: 'banner', title: 'Course banner'},
    {name: 'seo', title: 'Search and sharing'},
  ],
  fields: [
    defineField({name: 'hero', title: 'Page heading', type: 'pageHero', group: 'hero'}),
    defineField({
      name: 'keyFacts',
      title: 'Key facts',
      type: 'object',
      group: 'facts',
      options: {collapsible: false},
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'sectionHeading'}),
        defineField({
          name: 'facts',
          title: 'Facts',
          type: 'array',
          validation: (rule) => rule.max(4),
          of: [
            defineArrayMember({
              name: 'fact',
              type: 'object',
              fields: [
                defineField({name: 'value', title: 'Value', type: 'string'}),
                defineField({name: 'label', title: 'Label', type: 'string'}),
              ],
              preview: {select: {title: 'value', subtitle: 'label'}},
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'object',
      group: 'format',
      options: {collapsible: false},
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'sectionHeading'}),
        defineField({name: 'body', title: 'Text', type: 'richText'}),
        defineField({name: 'stationTypesHeading', title: 'Station types heading', type: 'string'}),
        defineField({name: 'stationTypesIntro', title: 'Station types intro', type: 'string'}),
        defineField({
          name: 'stationTypes',
          title: 'Station types',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
        }),
      ],
    }),
    defineField({
      name: 'eligibility',
      title: 'Eligibility',
      type: 'object',
      group: 'eligibility',
      options: {collapsible: false},
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'sectionHeading'}),
        defineField({
          name: 'requirements',
          title: 'Requirements',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
        }),
        defineField({
          name: 'note',
          title: 'Small print',
          type: 'text',
          rows: 2,
          description: 'Shown under the list.',
        }),
      ],
    }),
    defineField({
      name: 'sittings',
      title: 'Sittings',
      type: 'object',
      group: 'sittings',
      options: {collapsible: false},
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'sectionHeading'}),
        defineField({
          name: 'items',
          title: 'Sittings',
          type: 'array',
          description: 'Also listed in the Contact form\'s "Which sitting?" dropdown.',
          of: [
            defineArrayMember({
              name: 'sitting',
              type: 'object',
              fields: [
                defineField({
                  name: 'sitting',
                  title: 'Sitting',
                  type: 'string',
                  description: 'For example "2027.1".',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'dates',
                  title: 'Exam dates',
                  type: 'string',
                  description: 'As written by ACEM, for example "16–19 March 2027".',
                }),
                defineField({name: 'location', title: 'Location', type: 'string'}),
                defineField({name: 'applicationsOpen', title: 'Applications open', type: 'string'}),
                defineField({
                  name: 'applicationsClose',
                  title: 'Applications close',
                  type: 'string',
                }),
                defineField({
                  name: 'eligibilityDeadline',
                  title: 'Eligibility deadline',
                  type: 'string',
                }),
              ],
              preview: {select: {title: 'sitting', subtitle: 'dates'}},
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'object',
      group: 'faq',
      options: {collapsible: false},
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'sectionHeading'}),
        defineField({
          name: 'items',
          title: 'Questions',
          type: 'array',
          of: [defineArrayMember({type: 'faqItem'})],
        }),
      ],
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'object',
      group: 'faq',
      description: 'Every fact on this page comes from ACEM. Re-check it before each sitting.',
      options: {collapsible: false},
      fields: [
        defineField({
          name: 'note',
          title: 'Source note',
          type: 'richText',
          description: 'Shown under the FAQ, with links to ACEM.',
        }),
        defineField({
          name: 'url',
          title: 'ACEM source page',
          type: 'url',
          description: 'Cited to search engines as the source of this guide.',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'lastChecked',
          title: 'Last checked',
          type: 'date',
          description:
            'When the facts were last compared with ACEM. Tells search engines how fresh the guide is.',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'banner',
      title: 'Course banner',
      type: 'object',
      group: 'banner',
      description: 'The coloured banner at the bottom of this page.',
      options: {collapsible: false},
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'string'}),
        defineField({
          name: 'textUpcoming',
          title: 'Text when a course is scheduled',
          type: 'richText',
          description:
            'Insert "Next course date" and "Next course venue" from the toolbar where they should appear.',
        }),
        defineField({
          name: 'textNoDates',
          title: 'Text when no course is scheduled',
          type: 'richText',
          description: 'Insert "Next course venue" from the toolbar where the venue should appear.',
        }),
        defineField({
          name: 'enrolLabel',
          title: 'Booking button',
          type: 'string',
          description:
        'Links to the Humanitix link in Dates and booking. Shown only until the in-person course date has passed.',
        }),
        defineField({
          name: 'courseLinkLabel',
          title: 'Course link',
          type: 'string',
          description: 'Links to The Course page.',
        }),
      ],
    }),
    defineField({name: 'seo', title: 'Search and sharing', type: 'seo', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'OSCE Guide'})},
})
