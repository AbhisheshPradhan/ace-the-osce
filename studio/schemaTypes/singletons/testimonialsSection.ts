import {defineArrayMember, defineField, defineType} from 'sanity'
import {CommentIcon} from '@sanity/icons/Comment'
import {editElsewhere} from '../../components/EditElsewhere'

export const testimonialsSection = defineType({
  name: 'testimonialsSection',
  title: 'Testimonials section',
  type: 'document',
  icon: CommentIcon,
  fields: [
    editElsewhere('sharedNote', 'Shown on Home and The Course.'),
    defineField({name: 'heading', title: 'Heading', type: 'sectionHeading'}),
    defineField({
      name: 'items',
      title: 'Testimonials shown',
      type: 'array',
      description: 'Drag to reorder. Add new quotes under Testimonials in the sidebar first.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'testimonial'}]})],
      validation: (rule) => rule.unique(),
    }),
  ],
  preview: {prepare: () => ({title: 'Testimonials section'})},
})
