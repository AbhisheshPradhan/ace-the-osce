import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'f3et2lbb',
    dataset: 'production',
  },
  // Hosted at https://ace-the-osce.sanity.studio (`npx sanity deploy`).
  studioHost: 'ace-the-osce',
  deployment: {
    appId: 'rfzjn14lok6z81jvg32kn67u',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
