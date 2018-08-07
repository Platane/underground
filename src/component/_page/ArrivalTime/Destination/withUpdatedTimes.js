import React, { Component } from 'react'

export const withUpdatedTimes = C =>
  class WithUpdatedTimes extends Component {
    _timeout = null

    componentWillUnmount() {
      clearTimeout(this._timeout)
    }

    render() {
      // trim past date
      // and sort
      const arrivalTimes = this.props.arrivalTimes
        .filter(a => new Date(a.arrivalTime).getTime() > Date.now())
        .sort((a, b) => (a.arrivalTime < b.arrivalTime ? -1 : 1))

      // plan the next update
      const next = arrivalTimes[0]

      clearTimeout(this._timeout)

      if (next) {
        const delta = new Date(next.arrivalTime).getTime() - Date.now()
        this._timeout = setTimeout(() => this.forceUpdate(), delta)
      }

      return <C {...this.props} arrivalTimes={arrivalTimes} />
    }
  }
