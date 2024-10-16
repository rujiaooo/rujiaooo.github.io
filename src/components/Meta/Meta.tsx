import * as React from "react"
import {
  Helmet, HelmetProvider,
  MetaProps as HelmetMetaProps,
  Attributes as HelmetAttributes,
} from "react-helmet-async"

type MetaProps = {
  children?: MetaChildrenAttribute
  disableTemplate?: boolean
}

type MetaChildrenAttribute = {
  title?: string
  description?: string
  type?: string
  url?: string
  image?: string
  keywords?: string
  markupSchema?: MarkupSchema
  twitterSchema?: Record<string, string>
}

type MetaContextAttribute = {
  titleTemplate?: string
  titleFallback?: string
  descriptionFallback?: string
  typeFallback?: string
  urlFallback?: string
  imageFallback?: string
  keywordsFallback?: string
  markupSchemaFallback?: MarkupSchema
  twitterSchemaFallback?: Record<string, string>
}

type MarkupSchema = Record<string, MarkupSchemaValue>

type MarkupSchemaValue = string | string[]

const MetaContext = React.createContext<MetaContextAttribute>({})

export function Meta(props: MetaProps): React.JSX.Element {
  const {
    disableTemplate = false
  } = props
  const {
    title
  } = props.children || {}

  return (
    <>
      <MetaContext.Consumer>
        {
          ctx => (
            <Helmet
              prioritizeSeoTags
              titleTemplate={!disableTemplate ? ctx.titleTemplate : undefined}
              defaultTitle={ctx.titleFallback}
              title={title}
              meta={
                generateMetas({
                  disableTemplate,
                  ...ctx,
                  ...props.children,
                })
              }
              script={
                generateScripts({
                  disableTemplate,
                  ...ctx,
                  ...props.children,
                })
              }>
            </Helmet>
          )
        }
      </MetaContext.Consumer>
    </>
  )
}

type MetaProviderProps = {
  children?: React.ReactNode
  meta: MetaContextAttribute
}

export function MetaProvider(props: MetaProviderProps): React.JSX.Element {
  return (
    <HelmetProvider>
      <MetaContext.Provider value={props.meta}>
        {props.children}
      </MetaContext.Provider>
    </HelmetProvider>
  )
}

type GenerateAttributeProps = MetaChildrenAttribute & MetaContextAttribute & {
  disableTemplate: boolean
}

function generateMetas(props: GenerateAttributeProps): HelmetMetaProps[] {
  const {
    disableTemplate,
    title, titleFallback, titleTemplate,
    description, descriptionFallback,
    type, typeFallback,
    url, urlFallback,
    image, imageFallback,
    keywords, keywordsFallback,
    twitterSchema, twitterSchemaFallback,
  } = props

  const metas: HelmetMetaProps[] = []

  const titleValue = !disableTemplate && titleTemplate && title ?
    titleTemplate.replace("%s", title)
    : (title || titleFallback)
  if (titleValue) {
    metas.push({
      name: "title",
      content: titleValue
    })
    metas.push({
      property: "og:title",
      content: titleValue
    })
    metas.push({
      property: "twitter:title",
      content: titleValue
    })
  }

  const descriptionValue = description || descriptionFallback
  if (descriptionValue) {
    metas.push({
      name: "description",
      content: descriptionValue
    })
    metas.push({
      property: "og:description",
      content: descriptionValue
    })
    metas.push({
      property: "twitter:description",
      content: descriptionValue
    })
  }

  const keywordsValue = keywords || keywordsFallback
  if (keywordsValue) {
    metas.push({
      name: "keywords",
      content: keywordsValue
    })
  }

  const typeValue = type || typeFallback
  if (typeValue) {
    metas.push({
      property: "og:type",
      content: typeValue
    })
  }

  const urlValue = url || urlFallback
  if (urlValue) {
    metas.push({
      property: "og:url",
      content: urlValue
    })
    metas.push({
      property: "twitter:url",
      content: urlValue
    })
  }

  const imageValue = image || imageFallback
  if (imageValue) {
    metas.push({
      property: "og:image",
      content: imageValue
    })
    metas.push({
      property: "twitter:image",
      content: imageValue
    })
  }

  const twitterSchemaValue = twitterSchema || twitterSchemaFallback
  if (twitterSchemaValue) {
    for (const key in twitterSchemaValue) {
      metas.push({
        property: `twitter:${key}`,
        content: twitterSchemaValue[key]
      })
    }
  }

  return metas
}

function generateScripts(props: GenerateAttributeProps): HelmetAttributes[] {
  const {
    markupSchema, markupSchemaFallback,
  } = props

  const attributes: HelmetAttributes[] = []

  const markupSchemaValue = markupSchema || markupSchemaFallback
  if (markupSchemaValue) {
    attributes.push({
      type: "application/ld+json",
      innerHTML: JSON.stringify(markupSchemaValue),
    })
  }

  return attributes
}
