import {defineField, defineType} from 'sanity'
import {EditIcon} from '@sanity/icons/Edit'
import {editElsewhere} from '../../components/EditElsewhere'

const text = (name: string, title: string, group: string, description?: string) =>
  defineField({name, title, type: 'string', group, description})

export const contactForm = defineType({
  name: 'contactForm',
  title: 'Contact form',
  type: 'document',
  icon: EditIcon,
  groups: [
    {name: 'form', title: 'Form', default: true},
    {name: 'messages', title: 'After sending'},
  ],
  fields: [
    {
      ...editElsewhere(
        'sharedNote',
        'Shown on the Contact page and the Home page. The sitting options come from the OSCE Guide\'s sittings; messages go to the email in Site settings.',
        [
          {id: 'osceGuidePage', type: 'osceGuidePage', title: 'OSCE Guide'},
          {id: 'siteSettings', type: 'siteSettings', title: 'Site settings'},
        ],
      ),
      group: ['form', 'messages'],
    },
    text('heading', 'Heading', 'form'),
    text('intro', 'Intro', 'form'),
    text('nameLabel', 'Name label', 'form'),
    text('emailLabel', 'Email label', 'form'),
    text('sittingLabel', 'Sitting label', 'form'),
    text('optionalLabel', 'Optional marker', 'form', 'Shown after the sitting label, for example "(optional)".'),
    text('sittingPlaceholder', 'Sitting placeholder', 'form', 'The first, empty choice in the list.'),
    text('notSureOption', '"Not sure" choice', 'form', 'The last choice in the list.'),
    text('messageLabel', 'Message label', 'form'),
    text('submitLabel', 'Send button', 'form'),
    text('sendingLabel', 'Send button while sending', 'form'),
    text('privacyText', 'Privacy note', 'form', 'Shown next to the button, before the link.'),
    text('privacyLinkLabel', 'Privacy link', 'form', 'Links to the Privacy Policy page.'),
    text('successHeading', 'Sent heading', 'messages'),
    text('successText', 'Sent text', 'messages'),
    text('nameError', 'Missing name', 'messages'),
    text('emailError', 'Invalid email', 'messages'),
    text('messageError', 'Message too short', 'messages'),
    defineField({
      name: 'sendError',
      title: 'Sending failed',
      type: 'richText',
      group: 'messages',
      description: 'Shown if the message could not be sent.',
    }),
    defineField({
      name: 'unavailableError',
      title: 'Form unavailable',
      type: 'richText',
      group: 'messages',
      description: 'Shown if the form is switched off on the server.',
    }),
  ],
  preview: {prepare: () => ({title: 'Contact form'})},
})
