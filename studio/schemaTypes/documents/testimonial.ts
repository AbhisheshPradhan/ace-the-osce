import {defineField, defineType} from 'sanity'
import {CommentIcon} from '@sanity/icons/Comment'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'richText',
      description: 'Without quotation marks; the website adds them.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution',
      type: 'string',
      description: 'For example "Course participant, 02/2022".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description:
        'Only if the person actually gave a star rating, out of 5. Leave empty and no stars are shown.',
      options: {list: [5, 4, 3, 2, 1], layout: 'radio', direction: 'horizontal'},
      validation: (rule) => rule.integer().min(1).max(5),
    }),
  ],
  preview: {
    select: {quote: 'quote', attribution: 'attribution', rating: 'rating'},
    prepare: ({quote, attribution, rating}) => ({
      title: quote?.[0]?.children?.map((child: {text?: string}) => child.text).join('') ?? '',
      subtitle: rating ? `${'★'.repeat(rating)} · ${attribution ?? ''}` : attribution,
    }),
  },
})
