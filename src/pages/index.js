import React, { useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { styled } from '@mui/material/styles'
import Input from '@mui/material/Input'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import Layout from 'src/components/Layout'
import logoWithText from 'src/img/logo-with-text.svg'
import Metadata from 'src/components/Metadata'
import MoneyRaisedDisplay from 'src/components/MoneyRaisedDisplay'
import Footer from 'src/components/Footer'
import { getAbsoluteURL, externalRedirect, homeURL } from 'src/utils/navigation'

const Root = styled('div')(() => ({
  height: '100vh',
  minHeight: 360, // so we don't hide the search input
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  boxSizing: 'border-box',
}))

const CenterContent = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: 140, // for visually-appealing vertical centering
  width: 500,
  maxWidth: '80%',
  minWidth: 300,
  marginTop: 'auto',
}))

const searchBoxBorderColor = '#ced4da'
const searchBoxBorderColorFocused = '#bdbdbd'
const StyledInput = styled(Input)(({ theme }) => ({
  '&.MuiInput-root': {
    borderRadius: 28,
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${searchBoxBorderColor}`,
    fontSize: 16,
    boxShadow: '0rem 0rem 0.02rem 0.02rem rgba(0, 0, 0, 0.1)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      borderColor: searchBoxBorderColorFocused,
      boxShadow: '0rem 0.05rem 0.2rem 0.05rem rgba(0, 0, 0, 0.1)',
    },
  },
  '& .MuiInput-input': {
    padding: '12px 16px',
  },
  '&.Mui-focused': {
    borderColor: searchBoxBorderColorFocused,
    boxShadow: '0rem 0.05rem 0.2rem 0.05rem rgba(0, 0, 0, 0.1)',
  },
}))

const IndexPage = ({ location }) => {
  const canonicalURL = getAbsoluteURL(homeURL)
  const searchInputRef = useRef()
  const search = useCallback(() => {
    const query = searchInputRef.current.value
    const searchURL = `https://tab.gladly.io/search?q=${encodeURIComponent(
      query
    )}&src=self`
    externalRedirect(searchURL)
  }, [])

  return (
    <Layout>
      <Metadata location={location}>
        <Helmet>
          <link rel="canonical" href={canonicalURL} />
        </Helmet>
        <Root>
          <MoneyRaisedDisplay
            style={{ position: 'absolute', top: 28, right: 40 }}
          />
          <CenterContent>
            <img src={logoWithText} style={{ height: 60, marginBottom: 26 }} />
            <div>
              <StyledInput
                autoFocus
                data-test-id={'search-input'}
                type={'text'}
                inputRef={searchInputRef}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    search()
                  }
                }}
                placeholder={'Search to raise money for charity...'}
                disableUnderline
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Search button"
                      onClick={search}
                      sx={{ p: 2 }}
                    >
                      <SearchIcon
                        style={{
                          color: searchBoxBorderColorFocused,
                        }}
                      />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
          </CenterContent>
          <Footer style={{ marginTop: 'auto' }} />
        </Root>
      </Metadata>
    </Layout>
  )
}

IndexPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
  pageContext: PropTypes.shape({
    referrer: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
}

IndexPage.defaultProps = {}

export default IndexPage
