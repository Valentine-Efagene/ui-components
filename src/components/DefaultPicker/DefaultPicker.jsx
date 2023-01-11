import React from 'react';
import styles from './DefaultPicker.module.css';
import {
  any,
  arrayOf,
  func,
  number,
  oneOfType,
  shape,
  string,
} from 'prop-types';
import { useEffect } from 'react';
import { useRef } from 'react';
import {
  canScrollLeft,
  canScrollRight,
  scrollPickerLeft,
  scrollPickerRight,
  scrollToChild,
  transformScroll,
} from '@/Helpers/domPhysics';
import { ChevronDown } from '@/Components/Common/Icons';
import { useState } from 'react';

DefaultPicker.propTypes = {
  items: arrayOf(
    shape({
      id: oneOfType([string, number]),
      item: any,
    }),
  ),
  className: string,
  onChoose: func,
  active: string,
};

/**
 *
 * @param {(categoryId) => void} onChange Action function
 * @param {string} active ID of the active item
 * @returns
 */

export default function DefaultPicker({ items, onChoose, active }) {
  if (items?.length < 1) return null;
  const activeRef = useRef();
  const containerRef = useRef();
  const [canGoLeft, setCanGoLeft] = useState(false);
  const [canGoRight, setCanGoRight] = useState(false);

  const handleScroll = e => {
    setCanGoLeft(canScrollLeft(e.currentTarget));
    setCanGoRight(canScrollRight(e.currentTarget));
  };

  useEffect(() => {
    scrollToChild(containerRef?.current, activeRef?.current);

    // Using the element's onWheel has glitches
    containerRef?.current?.addEventListener('wheel', transformScroll);
    containerRef?.current?.addEventListener('scroll', handleScroll);

    return () => {
      containerRef?.current?.removeEventListener('wheel', transformScroll);
      containerRef?.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const goLeft = () => {
    if (containerRef == null) return;

    scrollPickerLeft(containerRef?.current);
  };

  const goRight = () => {
    if (containerRef == null) return;

    scrollPickerRight(containerRef?.current);
  };

  return (
    <div className={styles.container}>
      <button
        disabled={!canGoLeft}
        className={`${styles.left} ${styles.move}`}
        onClick={goLeft}>
        <ChevronDown fill="#ffffff" className={styles.chevron} />
      </button>
      <div className={styles.list} ref={containerRef}>
        {items.map(item => {
          const { id, title } = item;

          return (
            <button
              key={id}
              ref={active == id ? activeRef : null}
              className={`${styles.pill} ${
                active == id ? styles.active : null
              }`}
              onClick={() => {
                onChoose(id);
              }}>
              {title}
            </button>
          );
        })}
      </div>
      <button
        disabled={!canGoRight}
        className={`${styles.right} ${styles.move}`}
        onClick={goRight}>
        <ChevronDown fill="#ffffff" className={styles.chevron} />
      </button>
    </div>
  );
}
