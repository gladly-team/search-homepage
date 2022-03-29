import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import MoneyRaised from 'src/components/MoneyRaised'

class MoneyRaisedDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
    }
  }

  show() {
    this.setState({
      show: true,
    })
  }

  render() {
    const { style } = this.props
    return (
      <span
        style={Object.assign(
          {
            textAlign: 'center',
          },
          style,
          {
            visibility: this.state.show ? 'visible' : 'hidden',
          }
        )}
      >
        <Typography variant={'h6'}>
          <MoneyRaised onLoaded={this.show.bind(this)} />
        </Typography>
        <Typography variant={'body2'}>raised for charity</Typography>
      </span>
    )
  }
}

MoneyRaisedDisplay.propTypes = {
  style: PropTypes.object.isRequired,
}

MoneyRaisedDisplay.defaultProps = {
  style: {},
}

export default MoneyRaisedDisplay
