import type {ReactNode} from 'react'
import {Box, Card, Container, Flex, Heading, Stack, Text} from '@sanity/ui'
import {IntentLink} from 'sanity/router'
import {singletons, type SingletonType} from '../constants'

// The "How to update the website" page at the top of the Studio sidebar: a short guide for
// the team, as questions and answers. It reads only from this file; edit the text here and
// run `npx sanity deploy`.

function Question({
  title,
  featured = false,
  children,
}: {
  title: string
  featured?: boolean
  children: ReactNode
}) {
  return (
    <Card padding={4} radius={3} border tone={featured ? 'primary' : 'default'}>
      <Stack gap={4}>
        <Heading as="h2" size={featured ? 2 : 1}>
          {title}
        </Heading>
        {children}
      </Stack>
    </Card>
  )
}

function Para({children}: {children: ReactNode}) {
  return (
    <Text size={1} muted>
      {children}
    </Text>
  )
}

// Numbers and bullets are drawn here: Sanity UI's layout components drop the browser's list
// markers.
const listStyle = {margin: 0, padding: 0, listStyle: 'none'}

function Steps({children}: {children: ReactNode}) {
  return (
    <Stack as="ol" gap={3} style={listStyle}>
      {children}
    </Stack>
  )
}

function Bullets({children}: {children: ReactNode}) {
  return (
    <Stack as="ul" gap={3} style={listStyle}>
      {children}
    </Stack>
  )
}

function Item({marker, children}: {marker: ReactNode; children: ReactNode}) {
  return (
    <Flex as="li" gap={3}>
      <Box style={{minWidth: '1.25em'}}>
        <Text size={1} weight="semibold">
          {marker}
        </Text>
      </Box>
      <Box flex={1}>
        <Text size={1}>{children}</Text>
      </Box>
    </Flex>
  )
}

function Step({n, children}: {n: number; children: ReactNode}) {
  return <Item marker={n}>{children}</Item>
}

function Bullet({children}: {children: ReactNode}) {
  return <Item marker="•">{children}</Item>
}

// Opens a single form in the Studio, optionally at one field. Lists (Faculty, All
// testimonials) can't be linked this way and stay as plain sidebar paths.
function Open({doc, path, children}: {doc: SingletonType; path?: string; children?: ReactNode}) {
  return (
    <IntentLink intent="edit" params={{id: doc, type: doc, ...(path && {path})}}>
      <strong>{children ?? singletons[doc]} →</strong>
    </IntentLink>
  )
}

const publish = (
  <>
    <strong>Publish</strong> (the button in the bottom-right corner of the form)
  </>
)

export function HelpPane() {
  return (
    <Container width={1}>
      <Box padding={4}>
        <Stack gap={4}>
          <Stack gap={3}>
            <Heading as="h1" size={3}>
              How to update the website
            </Heading>
            <Para>
              Everything on acetheosce.com.au is edited here. Nothing is public until you click{' '}
              {publish}; the live site updates about a minute later. Links marked → open that form.
            </Para>
          </Stack>

          <Question title="How do I set up the next course?" featured>
            <Steps>
              <Step n={1}>Create the event in Humanitix and copy its link.</Step>
              <Step n={2}>
                Open <Open doc="courseDates" /> (sidebar: Courses).
              </Step>
              <Step n={3}>
                Paste the link into <strong>Humanitix link</strong>. Every booking button on the
                site uses it.
              </Step>
              <Step n={4}>
                Set <strong>Starts</strong> and <strong>Ends</strong> for the in-person course and
                the Evening Taster (Sydney time).
              </Step>
              <Step n={5}>Click {publish}.</Step>
              <Step n={6}>
                Open the{' '}
                <Open doc="osceGuidePage" path="sittings.items">
                  ACEM sittings
                </Open>{' '}
                (also linked at the top of Dates and booking). Add the next sitting if ACEM has
                announced it, remove ones that have passed, then click <strong>Publish</strong>.
              </Step>
              <Step n={7}>
                After a minute, open acetheosce.com.au and check the dates and the booking buttons.
              </Step>
            </Steps>
            <Para>
              Changing what a course card says (description, highlights, photo)? That&apos;s in{' '}
              <Open doc="inPersonCourse" /> and <Open doc="eveningTaster" />.
            </Para>
          </Question>

          <Question title="What happens when a course finishes?">
            <Bullets>
              <Bullet>
                The site keeps showing the finished course until something is next published.
              </Bullet>
              <Bullet>
                After that it shows &ldquo;Next course dates coming soon&rdquo;, and the booking
                buttons become contact buttons.
              </Bullet>
              <Bullet>Enter the next dates as soon as you know them.</Bullet>
            </Bullets>
          </Question>

          <Question title="Where do the sittings in the contact form come from?">
            <Bullets>
              <Bullet>
                From the{' '}
                <Open doc="osceGuidePage" path="sittings.items">
                  ACEM sittings
                </Open>{' '}
                on the OSCE Guide page (sidebar: Pages → OSCE Guide → Sittings tab).
              </Bullet>
              <Bullet>
                The &ldquo;Which sitting?&rdquo; dropdown updates by itself when you publish.
              </Bullet>
              <Bullet>&ldquo;Not sure yet&rdquo; is always added at the end.</Bullet>
            </Bullets>
          </Question>

          <Question title="How do I change text on a page?">
            <Bullets>
              <Bullet>
                Open the page under <strong>Pages</strong> and use the tabs along the top of the
                form (Hero, FAQ, and so on).
              </Bullet>
              <Bullet>
                Some parts appear on several pages, such as the contact form, the call to action
                banner and the testimonials. The blue box at the top of each page links straight to
                where they are edited.
              </Bullet>
              <Bullet>
                In longer text you can make words bold or italic, add a link, link a doctor&apos;s
                name to their profile (person icon), or insert the contact email, next course date
                or venue, which then update by themselves.
              </Bullet>
            </Bullets>
          </Question>

          <Question title="How do I change a photo?">
            <Steps>
              <Step n={1}>
                Click the photo, then Upload, or Select to reuse one already in the Studio.
              </Step>
              <Step n={2}>
                Fill in <strong>Alt text</strong>: a short description for people using screen
                readers, for example &ldquo;Candidate and examiner at a bedside station&rdquo;.
              </Step>
              <Step n={3}>
                Use the crop button to set the focus point, so the important part stays in view when
                the photo is cropped to fit.
              </Step>
            </Steps>
          </Question>

          <Question title="How do I add a doctor or a testimonial?">
            <Bullets>
              <Bullet>
                Add or edit people under <strong>People → Faculty</strong>. They appear on the site
                once added to{' '}
                <Open doc="aboutPage" path="directors">
                  About Us: Directors and faculty
                </Open>
                , and on the home page if added to{' '}
                <Open doc="homePage" path="facultyPreview">
                  Home: Our faculty
                </Open>
                .
              </Bullet>
              <Bullet>
                Add quotes under <strong>People → Testimonials → All testimonials</strong>, then
                choose which ones show, and in what order, in <Open doc="testimonialsSection" />.
              </Bullet>
              <Bullet>Only fill in a star rating if the person actually gave one.</Bullet>
            </Bullets>
          </Question>

          <Question title="Where are the email, address, menu and footer?">
            <Bullets>
              <Bullet>
                Email address, venue, logo and site icon: <Open doc="siteSettings" />.
              </Bullet>
              <Bullet>
                The contact email is also where contact form messages are sent. Change it only if
                the team&apos;s inbox changes.
              </Bullet>
              <Bullet>
                Menu links: <Open doc="header" />. Footer links and tagline: <Open doc="footer" />.
              </Bullet>
            </Bullets>
          </Question>

          <Question title="I made a mistake. How do I undo it?">
            <Bullets>
              <Bullet>
                Not published yet: click <strong>Discard changes</strong>.
              </Bullet>
              <Bullet>
                Already published: click the clock icon (<strong>History</strong>) at the top of the
                form, pick an earlier version and restore it, then publish.
              </Bullet>
            </Bullets>
          </Question>
        </Stack>
      </Box>
    </Container>
  )
}
