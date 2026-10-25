import {defineArrayMember, defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons/Home'
import {editElsewhere} from '../../components/EditElsewhere'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'about', title: 'About our course'},
    {name: 'faculty', title: 'Our faculty'},
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
          {id: 'contactForm', type: 'contactForm', title: 'Contact form'},
          {id: 'callToAction', type: 'callToAction', title: 'Call to action'},
        ],
      ),
      group: ['hero', 'about', 'faculty'],
    },
    defineField({
      name: 'seo',
      title: 'Search and sharing',
      type: 'seo',
      group: 'seo',
      description: 'On the Home page the title is shown as written, without "| Ace the OSCE".',
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      options: {collapsible: false},
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Label above the heading',
          type: 'string',
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({name: 'subheading', title: 'Subheading', type: 'text', rows: 2}),
        defineField({
          name: 'paymentNote',
          title: 'Payment note',
          type: 'string',
          description: 'Shown in the ticked list, for example "Payment plans available".',
        }),
        defineField({
          name: 'tasterLabel',
          title: 'Evening Taster label',
          type: 'string',
          description: 'Shown before the next Evening Taster date, when there is one.',
        }),
        defineField({
          name: 'noDatesText',
          title: 'Text when no course is scheduled',
          type: 'string',
          description: 'Replaces the date once the in-person course date has passed.',
        }),
        defineField({
          name: 'noDatesButtonLabel',
          title: 'Button when no course is scheduled',
          type: 'string',
          description:
            'Replaces "Enrol now" once the in-person course date has passed. Links to the Contact page.',
        }),
        defineField({
          name: 'detailsButtonLabel',
          title: 'Course details button',
          type: 'string',
          description: 'Links to The Course page.',
        }),
        defineField({
          name: 'image',
          title: 'Main photo',
          type: 'imageWithAlt',
          description: 'The large square tile, and the first photo on phones. Use the best shot.',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'topImage',
          title: 'Small photo, top',
          type: 'imageWithAlt',
          description: 'The small tile above the main photo. Shown with a light teal wash.',
        }),
        defineField({
          name: 'sideImage',
          title: 'Small photo, right',
          type: 'imageWithAlt',
          description: 'The small tile to the right of the main photo. Shown with a light teal wash.',
        }),
        defineField({
          name: 'cornerImage',
          title: 'Corner photo',
          type: 'imageWithAlt',
          description:
            'A small photo in the top-left corner of the page, shown on wide screens only. On phones all four photos are in a swipeable row.',
        }),
        defineField({
          name: 'stats',
          title: 'Stats',
          type: 'array',
          description: 'The three coloured tiles beside the photos, in order: top right, bottom right, bottom left (on phones, left to right). Each fact needs a source.',
          validation: (rule) => rule.max(3),
          of: [
            defineArrayMember({
              name: 'stat',
              type: 'object',
              fields: [
                defineField({
                  name: 'value',
                  title: 'Number',
                  type: 'string',
                  description: 'For example "500+".',
                }),
                defineField({name: 'label', title: 'Label', type: 'string'}),
              ],
              preview: {select: {title: 'value', subtitle: 'label'}},
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'about',
      title: 'About our course',
      type: 'object',
      group: 'about',
      options: {collapsible: false},
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'sectionHeading'}),
        defineField({name: 'body', title: 'Text', type: 'richText'}),
        defineField({
          name: 'points',
          title: 'Ticked points',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
        }),
        defineField({
          name: 'linkLabel',
          title: 'Link label',
          type: 'string',
          description: 'Links to the About Us page.',
        }),
        defineField({name: 'image', title: 'Image', type: 'imageWithAlt'}),
      ],
    }),
    defineField({
      name: 'facultyPreview',
      title: 'Our faculty',
      type: 'object',
      group: 'faculty',
      options: {collapsible: false},
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'sectionHeading'}),
        defineField({
          name: 'members',
          title: 'Faculty shown',
          type: 'array',
          description: 'Drag to reorder. Everyone is listed on the About Us page.',
          of: [defineArrayMember({type: 'reference', to: [{type: 'faculty'}]})],
          validation: (rule) => rule.unique(),
        }),
        defineField({
          name: 'linkLabel',
          title: 'Link label',
          type: 'string',
          description: 'Links to the About Us page.',
        }),
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Home'})},
})
