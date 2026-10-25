import {defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons/Users'

// The link to a member's About Us profile (/about-us/#laura-brown) is worked out from their
// name when the website builds, so there's nothing to fill in here.
export const faculty = defineType({
  name: 'faculty',
  title: 'Faculty member',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Including title, for example "Dr Laura Brown" or "A/Prof Andrew Coggins".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Course role',
      type: 'string',
      description: 'For example "Course Director". Leave empty for other faculty.',
    }),
    defineField({
      name: 'credentials',
      title: 'Credentials',
      type: 'string',
      description: 'For example "FACEM, Senior Staff Specialist".',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'imageWithAlt',
      description: 'A square-ish headshot. Leave empty to show their initials.',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 8,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'role', media: 'photo'},
  },
})
