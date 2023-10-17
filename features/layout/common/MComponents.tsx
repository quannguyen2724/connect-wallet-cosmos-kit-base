import { Box, BoxProps, Button, ButtonProps, styled } from '@mui/material'

export const CButton = (props: ButtonProps) => (
  <Button variant="contained" {...props} />
)

interface ColumnProps {
  readonly $justifyContent?: string
  readonly $alignItems?: string
}
export const MColumn = styled(Box)<ColumnProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.$justifyContent || 'flex-start'};
  align-items: ${(props) => props.$alignItems || 'center'};
`
