import { FC, ReactNode } from 'react'
import Header from './Header'
import { Box } from '@mui/system'

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <Box sx={{ mt: '10vh', mb: '2vh' }}>
      <Header />
      <Box sx={{ pl: '3vh', pr: '3vh' }}>{children}</Box>
    </Box>
  )
}

export default Layout
