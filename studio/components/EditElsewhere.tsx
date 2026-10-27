import {Card, Flex, Stack, Text} from '@sanity/ui'
import {defineField} from 'sanity'
import {IntentLink} from 'sanity/router'

// `path` opens the document focused on that field, e.g. 'sittings.items'.
type Target = {id: string; type: string; title: string; path?: string}

// A read-only note inside a page document saying "this part is edited somewhere else",
// with links straight to those documents. It stores nothing.
export function editElsewhere(name: string, text: string, targets: Target[] = []) {
  function EditElsewhere() {
    return (
      <Card padding={3} radius={2} tone="primary" border>
        <Stack gap={3}>
          <Text size={1}>{text}</Text>
          {targets.length > 0 && (
            <Flex gap={4} wrap="wrap">
              {targets.map((target) => (
                <Text key={`${target.id}:${target.path ?? ''}`} size={1} weight="semibold">
                  <IntentLink
                    intent="edit"
                    params={{
                      id: target.id,
                      type: target.type,
                      ...(target.path && {path: target.path}),
                    }}
                  >
                    Edit {target.title} →
                  </IntentLink>
                </Text>
              ))}
            </Flex>
          )}
        </Stack>
      </Card>
    )
  }

  return defineField({
    name,
    type: 'string',
    readOnly: true,
    components: {field: EditElsewhere},
  })
}
