
import React from 'react'
import styles from './index.less'

export default class AddressRow extends React.PureComponent {
  render() {
    const { data } = this.props
    return (
      <div className={styles.row}>
        <h1 className={styles.title}>{data.name}</h1>
        <p className={styles.desc}>{data.address}</p>
        <div className={`${styles.line} hairline-h`} />
      </div>
    )
  }
}
