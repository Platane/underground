import React, { Component } from 'react'

export class TimeAgo extends Component {
  _timeout = null

  componentWillUnmount() {
    clearTimeout(this._timeout)
  }

  render() {
    const delta = new Date(this.props.date).getTime() - Date.now()
    clearTimeout(this._timeout)

    const nextMin = delta % (60 * 1000)

    if (delta > 0)
      this._timeout = setTimeout(() => this.forceUpdate(), nextMin + 1)

    const minutes = Math.floor(delta / 60 / 1000)

    const text = minutes === 0 ? 'soon' : minutes

    return <span {...this.props}>{text}</span>
  }
}
