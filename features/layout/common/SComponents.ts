import { Button, ButtonProps, styled } from '@mui/material'

interface RowProps {
  readonly $justifyContent?: string
  readonly $alignItems?: string
  readonly $alignSelf?: string
}

export const Row = styled('div', {
  shouldForwardProp: (prop) =>
    prop !== '$justifyContent' &&
    prop !== '$alignItems' &&
    prop !== '$alignSelf',
})<RowProps>`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: ${(props) => props.$justifyContent || 'flex-start'};
  align-items: ${(props) => props.$alignItems || 'center'};
  align-self: ${(props) => props.$alignSelf || 'auto'};
`

export const RowFull = styled(Row)`
  align-self: stretch;
`

interface ColumnProps {
  readonly $justifyContent?: string
  readonly $alignItems?: string
}

export const Column = styled('div', {
  shouldForwardProp: (prop) =>
    prop !== '$justifyContent' && prop !== '$alignItems',
})<ColumnProps>`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: ${(props) => props.$justifyContent || 'flex-start'};
  align-items: ${(props) => props.$alignItems || 'center'};
`

export const SButton = styled(Button)``

export const RedText = styled('span')(({ theme }) => ({
  color: theme.custom.red1,
}))
