import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

interface SEOProps {
  title: string
  description: string
  url: string
  image: string
  keywords?: string
  structuredData?: Record<string, unknown>
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  url,
  image,
  keywords,
  structuredData,
}) => {
  const { i18n } = useTranslation()

  return (
    <Helmet prioritizeSeoTags>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name='title' content={title} />
      <meta name='description' content={description} />

      {/* Open Graph / Facebook */}
      <meta property='og:type' content='website' />
      <meta property='og:url' content={url} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />

      {/* Twitter */}
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={url} />
      <meta property='twitter:title' content={title} />
      <meta property='twitter:description' content={description} />
      <meta property='twitter:image' content={image} />

      {/* Additional SEO Meta Tags */}
      {keywords && <meta name='keywords' content={keywords} />}
      <link rel='canonical' href={url} />
      <meta name='robots' content='index, follow' />
      <meta
        name='language'
        content={i18n.language === 'en' ? 'English' : 'French'}
      />

      {/* Structured Data */}
      {structuredData && (
        <script type='application/ld+json'>
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  )
}

export default SEO
