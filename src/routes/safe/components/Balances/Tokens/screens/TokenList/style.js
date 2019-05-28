// @flow
import {
  md, sm, xs, mediumFontSize, border,
} from '~/theme/variables'

export const styles = () => ({
  root: {
    minHeight: '48px',
  },
  search: {
    color: '#a2a8ba',
    paddingLeft: sm,
  },
  padding: {
    padding: `0 ${md}`,
  },
  add: {
    fontSize: '11px',
    fontWeight: 'normal',
    paddingRight: md,
    paddingLeft: md,
  },
  actions: {
    height: '50px',
  },
  list: {
    overflow: 'hidden',
    overflowY: 'scroll',
    padding: 0,
    height: '100%',
  },
  token: {
    minHeight: '50px',
    borderBottom: `1px solid ${border}`,
  },
  searchInput: {
    backgroundColor: 'transparent',
    lineHeight: 'initial',
    fontSize: '13px',
    padding: 0,
    '& > input::placeholder': {
      letterSpacing: '-0.5px',
      fontSize: mediumFontSize,
      color: 'black',
    },
    '& > input': {
      letterSpacing: '-0.5px',
    },
  },
  progressContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  searchContainer: {
    width: '180px',
    marginLeft: xs,
    marginRight: xs,
  },
  searchRoot: {
    letterSpacing: '-0.5px',
    fontFamily: 'Roboto Mono, monospace',
    fontSize: '13px',
    border: 'none',
    boxShadow: 'none',
    '& > button': {
      display: 'none',
    },
  },
  searchIcon: {
    '&:hover': {
      backgroundColor: 'transparent !important',
    },
  },
})