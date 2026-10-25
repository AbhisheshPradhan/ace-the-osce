import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {editElsewhere} from '../../components/EditElsewhere'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact',
  type: 'document',
  icon: EnvelopeIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'Search and sharing'},
  ],
  fields: [
    {
      ...editElsewhere(
        'sharedNote',
        'Also on this page, edited separately: the form with its email, venue and map boxes (Contact form), and the email address and venue details (Site settings).',
        [
          {id: 'contactForm', type: 'contactForm', title: 'Contact form'},
          {id: 'siteSettings', type: 'siteSettings', title: 'Site settings'},
        ],
      ),
      group: 'content',
    },
    defineField({name: 'hero', title: 'Page heading', type: 'pageHero', group: 'content'}),
    defineField({name: 'seo', title: 'Search and sharing', type: 'seo', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Contact'})},
})
