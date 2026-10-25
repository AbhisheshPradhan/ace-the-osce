import type {ReactNode} from 'react'
import {Box, Card, Container, Heading, Stack, Text} from '@sanity/ui'

// The "How to update the website" page at the top of the Studio sidebar: a short guide for
// the team. It reads only from this file; edit the text here and run `npx sanity deploy`.

function Section({title, children}: {title: string; children: ReactNode}) {
  return (
    <Stack gap={3}>
      <Heading as="h2" size={1}>
        {title}
      </Heading>
      {children}
    </Stack>
  )
}

function Para({children}: {children: ReactNode}) {
  return (
    <Text size={1} muted>
      {children}
    </Text>
  )
}

function Steps({children}: {children: ReactNode}) {
  return (
    <Stack as="ol" gap={2} style={{margin: 0, paddingLeft: '1.25em'}}>
      {children}
    </Stack>
  )
}

function Step({children}: {children: ReactNode}) {
  return (
    <Text as="li" size={1} muted>
      {children}
    </Text>
  )
}

export function HelpPane() {
  return (
    <Container width={1}>
      <Box padding={4}>
        <Stack gap={5}>
          <Stack gap={3}>
            <Heading as="h1" size={3}>
              How to update the website
            </Heading>
            <Para>
              Everything on acetheosce.com.au is edited here. Nothing you type is public until you
              click <strong>Publish</strong>.
            </Para>
          </Stack>

          <Card padding={3} radius={2} tone="primary" border>
            <Text size={1}>
              <strong>Publish</strong> (bottom right of each form) updates the live website in about
              2 minutes. Until then your changes are a private draft. Made a mistake? Use{' '}
              <strong>Discard changes</strong> before publishing, or the clock icon (
              <strong>History</strong>) at the top of the form to restore an earlier version.
            </Text>
          </Card>

          <Section title="Before each course: new dates and booking link">
            <Steps>
              <Step>
                Open <strong>Courses → Dates and booking</strong>.
              </Step>
              <Step>
                Paste the new <strong>Humanitix link</strong>. Every booking button on the site uses
                it.
              </Step>
              <Step>
                Set <strong>Starts</strong> and <strong>Ends</strong> for the in-person course and
                the Evening Taster (Sydney time).
              </Step>
              <Step>
                Click <strong>Publish</strong>. The dates, times and Enrol buttons update everywhere
                on the site.
              </Step>
            </Steps>
            <Para>
              To change what a course card says (title, venue, description, highlights, photo), open{' '}
              <strong>Courses → In-person course</strong> or <strong>Evening Taster</strong>.
            </Para>
          </Section>

          <Section title="After a course has finished">
            <Para>
              Enter the next dates as soon as you know them. Until the site is next published it
              keeps showing the finished course; Humanitix shows the event as ended in the meantime.
              Once a course&apos;s end time has passed, any publish switches the site to
              &ldquo;dates to be announced&rdquo; and the buttons to &ldquo;get in touch&rdquo;.
            </Para>
          </Section>

          <Section title="Changing text on a page">
            <Para>
              Open the page under <strong>Pages</strong> and use the tabs along the top of the form
              (Hero, FAQ, and so on). Some parts appear on several pages, such as the contact form,
              the call to action banner and the testimonials. The blue box at the top of each page
              says where those are edited, with a link straight to them.
            </Para>
            <Para>
              In longer text you can make words bold or italic, add a link, link a doctor&apos;s
              name to their profile (person icon), or insert the contact email or next course date,
              which then update by themselves.
            </Para>
          </Section>

          <Section title="Photos">
            <Steps>
              <Step>
                Click the photo, then Upload, or Select to reuse one already in the Studio.
              </Step>
              <Step>
                Fill in <strong>Alt text</strong>: a short description for people using screen
                readers, for example &ldquo;Candidate and examiner at a bedside station&rdquo;.
              </Step>
              <Step>
                Use the crop button to set the focus point, so the important part stays in view when
                the photo is cropped to fit.
              </Step>
            </Steps>
          </Section>

          <Section title="Faculty and testimonials">
            <Para>
              Add or edit people under <strong>People → Faculty</strong>. A new person appears on
              the site once they are added to{' '}
              <strong>Pages → About Us → Directors and faculty</strong>, and on the home page if
              added to <strong>Home → Our faculty</strong>.
            </Para>
            <Para>
              Add quotes under <strong>People → Testimonials → All testimonials</strong>, then
              choose which ones show, and in what order, in <strong>Testimonials section</strong>.
              Only fill in a star rating if the person actually gave one.
            </Para>
          </Section>

          <Section title="Contact details, menu and footer">
            <Para>
              The email address, venue address, logo and site icon are in{' '}
              <strong>Site-wide → Site settings</strong>. Menu links are in <strong>Header</strong>,
              footer links and tagline in <strong>Footer</strong>.
            </Para>
          </Section>
        </Stack>
      </Box>
    </Container>
  )
}
