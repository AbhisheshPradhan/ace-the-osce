import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {singletons} from './constants'
import {structure} from './structure'

const singletonTypes = new Set(Object.keys(singletons))

export default defineConfig({
  name: 'default',
  title: 'ACE the OSCE',

  projectId: 'f3et2lbb',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    // Singletons can't be created from the "+" menu; they already exist.
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },

  document: {
    // Singletons can be edited and published, but not duplicated or deleted.
    actions: (actions, {schemaType}) =>
      singletonTypes.has(schemaType)
        ? actions.filter(
            ({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action),
          )
        : actions,
  },
})
