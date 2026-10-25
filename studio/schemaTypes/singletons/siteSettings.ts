import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'general', title: 'General', default: true},
    {name: 'location', title: 'Venue'},
    {name: 'branding', title: 'Logo and icon'},
    {name: 'seo', title: 'Search and sharing'},
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site name',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Contact email',
      type: 'string',
      description:
        'Shown on the Contact page and in the footer, and linked wherever copy mentions it.',
      group: 'general',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'location',
      title: 'Course venue',
      type: 'object',
      group: 'location',
      description:
        'Shown on the Contact page and in the footer, and used for Google event listings.',
      options: {collapsible: false},
      fields: [
        defineField({
          name: 'name',
          title: 'Venue name',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'streetAddress',
          title: 'Street address',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'locality',
          title: 'Suburb',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'region',
          title: 'State',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'postcode',
          title: 'Postcode',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'mapQuery',
          title: 'Map search',
          type: 'string',
          description:
            'What the Contact page map searches Google Maps for. Use a name Google recognises.',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'branding',
      description: 'Shown in the header and footer at 48px high. Use a wide SVG or PNG.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'siteIcon',
      title: 'Site icon',
      type: 'image',
      group: 'branding',
      description: 'The browser tab and phone home-screen icon. Square, at least 512×512.',
    }),
    defineField({
      name: 'defaultDescription',
      title: 'Default description',
      type: 'text',
      rows: 3,
      group: 'seo',
      description:
        'Used in Google results and link previews when a page has no description of its own.',
    }),
    defineField({
      name: 'shareImage',
      title: 'Share image',
      type: 'imageWithAlt',
      group: 'seo',
      description: 'The picture shown when a link to the site is shared. 1200×630.',
    }),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})
