
import React from 'react'
import cls from 'classnames'
import PropTypes from 'prop-types'
import styles from './index.less'

const SvgIcon = ({ name, className }) => {
  const clsName = className ? cls(styles['icon-svg'], className) : styles['icon-svg'];
  return (
    <svg className={clsName} aria-hidden="true">
      <use xlinkHref={name} />
    </svg>
  );
};

SvgIcon.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
};

export default SvgIcon
