
import React from 'react'
import cls from 'classnames'
import styles from './index.less'

export default ({ text, className }) => (
  <div className={cls(styles.badge, className)} content={text} />
)
