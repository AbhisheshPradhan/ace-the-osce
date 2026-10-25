import {defineArrayMember, defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons/BlockElement'
import {editElsewhere} from '../../components/EditElsewhere'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: BlockElementIcon,
  fields: [
    editElsewhere('sharedNote', 'The email and address shown here come from Site settings.', [
      {id: 'siteSettings', type: 'siteSettings', title: 'Site settings'},
    ]),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Shown under the logo.',
    }),
    defineField({name: 'linksHeading', title: 'Links heading', type: 'string'}),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [defineArrayMember({type: 'link'})],
      description: 'Drag to reorder.',
    }),
    defineField({name: 'contactHeading', title: 'Contact heading', type: 'string'}),
    defineField({
      name: 'privacyLinkLabel',
      title: 'Privacy link',
      type: 'string',
      description: 'Links to the Privacy Policy page.',
    }),
  ],
  preview: {prepare: () => ({title: 'Footer'})},
})
