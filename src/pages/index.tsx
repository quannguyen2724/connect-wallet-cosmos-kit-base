import Layout from '@/features/layout/Layout'
import { RedText } from '@/features/layout/common/SComponents'
import { useTranslation } from 'react-i18next'

declare global {
  interface Window {
    // ⚠️ notice that "Window" is capitalized here
    keplr: any
    getOfflineSigner: any
    coin98: any
    logoutTimeoutId: any
    config: any
  }
}
export default function Home() {
  const { t } = useTranslation()

  return (
    <Layout>
      <RedText>{t('homepage.welcome')}</RedText>
    </Layout>
  )
}
