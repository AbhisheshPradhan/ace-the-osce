import {defineArrayMember, defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons/Users'
import {editElsewhere} from '../../components/EditElsewhere'

const facultyList = (description: string) =>
  defineField({
    name: 'members',
    title: 'Faculty shown',
    type: 'array',
    description,
    of: [defineArrayMember({type: 'reference', to: [{type: 'faculty'}]})],
    validation: (rule) => rule.unique(),
  })

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Us',
  type: 'document',
  icon: UsersIcon,
  groups: [
    {name: 'hero', title: 'Page heading', default: true},
    {name: 'intro', title: 'Intro'},
    {name: 'team', title: 'Directors and faculty'},
    {name: 'seo', title: 'Search and sharing'},
  ],
  fields: [
    {
      ...editElsewhere('sharedNote', 'Also on this page, edited separately:', [
        {id: 'callToAction', type: 'callToAction', title: 'Call to action'},
      ]),
      group: ['hero', 'intro', 'team'],
    },
    defineField({name: 'hero', title: 'Page heading', type: 'pageHero', group: 'hero'}),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'object',
      group: 'intro',
      options: {collapsible: false},
      fields: [
        defineField({name: 'body', title: 'Text', type: 'richText'}),
        defineField({name: 'image', title: 'Image', type: 'imageWithAlt'}),
      ],
    }),
    defineField({
      name: 'directors',
      title: 'Course directors',
      type: 'object',
      group: 'team',
      options: {collapsible: false},
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'sectionHeading'}),
        facultyList('Drag to reorder. Edit names, photos and bios under Faculty.'),
      ],
    }),
    defineField({
      name: 'faculty',
      title: 'Faculty',
      type: 'object',
      group: 'team',
      options: {collapsible: false},
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'sectionHeading'}),
        facultyList(
          'Drag to reorder. Add new faculty members here after creating them under Faculty.',
        ),
      ],
    }),
    defineField({name: 'seo', title: 'Search and sharing', type: 'seo', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'About Us'})},
})
