// @flow
import * as React from 'react'
import { List } from 'immutable'
import SearchBar from 'material-ui-search-bar'
import { connect } from 'react-redux'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Drawer from '@material-ui/core/Drawer'
import SearchIcon from '@material-ui/icons/Search'
import Divider from '~/components/layout/Divider'
import Button from '~/components/layout/Button'
import Spacer from '~/components/Spacer'
import Hairline from '~/components/layout/Hairline'
import Row from '~/components/layout/Row'
import { type Safe } from '~/routes/safe/store/models/safe'
import { safesListSelector } from '~/routes/safeList/store/selectors'
import useSidebarStyles from './style'
import SafeList from './SafeList'

const { useState } = React

type TSidebarContext = {
  isOpen: boolean,
  toggleSidebar: Function,
}

export const SidebarContext = React.createContext<TSidebarContext>({
  isOpen: false,
  toggleSidebar: () => {},
})

type SidebarProps = {
  children: React.Node,
  safes: List<Safe>,
}

const filterBy = (filter: string, safes: List<Safe>): List<Safe> => safes.filter(
  (safe: Safe) => !filter
      || safe.address.toLowerCase().includes(filter.toLowerCase())
      || safe.name.toLowerCase().includes(filter.toLowerCase()),
)

const Sidebar = ({ children, safes }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [filter, setFilter] = useState<string>('')
  const classes = useSidebarStyles()

  const searchClasses = {
    input: classes.searchInput,
    root: classes.searchRoot,
    iconButton: classes.searchIconInput,
    searchContainer: classes.searchContainer,
  }

  const toggleSidebar = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  const handleFilterChange = (value: string) => {
    setFilter(value)
  }

  const handleFilterCancel = () => {
    setFilter('')
  }

  const handleEsc = (e: SyntheticKeyboardEvent<*>) => {
    if (e.keyCode === 27) {
      toggleSidebar()
    }
  }

  const filteredSafes = filterBy(filter, safes)

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      <ClickAwayListener onClickAway={toggleSidebar}>
        <Drawer
          className={classes.sidebar}
          open={isOpen}
          onKeyDown={handleEsc}
          classes={{ paper: classes.sidebarPaper }}
          ModalProps={{ onBackdropClick: toggleSidebar }}
        >
          <div className={classes.headerPlaceholder} />
          <Row align="center">
            <SearchIcon className={classes.searchIcon} />
            <SearchBar
              classes={searchClasses}
              placeholder="Search by name or address"
              searchIcon={<div />}
              onChange={handleFilterChange}
              onCancelSearch={handleFilterCancel}
            />
            <Spacer />
            <Divider />
            <Spacer />
            <Button className={classes.addSafeBtn} variant="contained" size="small" color="primary">
              + Add Safe
            </Button>
            <Spacer />
          </Row>
          <Hairline />
          <SafeList safes={filteredSafes} onSafeClick={toggleSidebar} />
        </Drawer>
      </ClickAwayListener>
      {children}
    </SidebarContext.Provider>
  )
}

export default connect<Object, Object, ?Function, ?Object>(
  // $FlowFixMe
  (state) => ({ safes: safesListSelector(state) }),
  null,
)(Sidebar)
