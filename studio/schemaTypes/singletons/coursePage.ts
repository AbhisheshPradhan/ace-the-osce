import {defineArrayMember, defineField, defineType} from 'sanity'
import {BookIcon} from '@sanity/icons/Book'
import {editElsewhere} from '../../components/EditElsewhere'

export const coursePage = defineType({
  name: 'coursePage',
  title: 'The Course',
  type: 'document',
  icon: BookIcon,
  groups: [
    {name: 'hero', title: 'Page heading', default: true},
    {name: 'howItWorks', title: 'How it works'},
    {name: 'faq', title: 'FAQ'},
    {name: 'seo', title: 'Search and sharing'},
  ],
  fields: [
    {
      ...editElsewhere(
        'sharedNote',
        'Also on this page, edited separately: the course cards and these sections.',
        [
          {id: 'courseDates', type: 'courseDates', title: 'Dates and booking'},
          {id: 'inPersonCourse', type: 'inPersonCourse', title: 'In-person course'},
          {id: 'eveningTaster', type: 'eveningTaster', title: 'Evening Taster'},
          {
            id: 'courseOptionsSection',
            type: 'courseOptionsSection',
            title: 'Course options section',
          },
          {id: 'testimonialsSection', type: 'testimonialsSection', title: 'Testimonials section'},
          {id: 'callToAction', type: 'callToAction', title: 'Call to action'},
        ],
      ),
      group: ['hero', 'howItWorks', 'faq'],
    },
    defineField({name: 'hero', title: 'Page heading', type: 'pageHero', group: 'hero'}),
    defineField({
      name: 'howItWorks',
      title: 'How it works',
      type: 'object',
      group: 'howItWorks',
      options: {collapsible: false},
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'sectionHeading'}),
        defineField({
          name: 'steps',
          title: 'Steps',
          type: 'array',
          description: 'Numbered automatically, in this order.',
          of: [
            defineArrayMember({
              name: 'step',
              type: 'object',
              fields: [
                defineField({
                  name: 'step',
                  title: 'Label',
                  type: 'string',
                  description: 'For example "Before" or "Morning".',
                }),
                defineField({name: 'title', title: 'Title', type: 'string'}),
                defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
              ],
              preview: {select: {title: 'title', subtitle: 'step'}},
            }),
          ],
        }),
        defineField({
          name: 'topicsHeading',
          title: 'Topics heading',
          type: 'string',
          description: 'For example "What we cover".',
        }),
        defineField({
          name: 'topics',
          title: 'Topics',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
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
        defineField({
          name: 'guideLinkIntro',
          title: 'Text before the guide link',
          type: 'string',
          description: 'For example "New to the exam?".',
        }),
        defineField({
          name: 'guideLinkLabel',
          title: 'Guide link',
          type: 'string',
          description: 'Links to the OSCE Guide page.',
        }),
      ],
    }),
    defineField({name: 'seo', title: 'Search and sharing', type: 'seo', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'The Course'})},
})
