import { getActiveSection } from '@/Helpers/domPhysics';
import { any, arrayOf, func, shape, string } from 'prop-types';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './PageNav.module.css';

PageNav.propTypes = {
  handlePageNav: func,
  sections: arrayOf(
    shape({
      key: string,
      displayName: string,
      ref: shape({
        current: any,
      }),
    }),
  ),
};

function PageNav({ sections }) {
  const [activePageLink, setActivePageLink] = useState();
  const PADDING = 100;

  const onScroll = e => {
    setActivePageLink(getActiveSection(e.currentTarget, sections, PADDING));
  };

  useEffect(() => {
    if (document == null) return;

    setActivePageLink(getActiveSection(document, sections, PADDING));

    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handlePageNav = (sectionKey, sectionRef) => {
    setActivePageLink(sectionKey);
    sectionRef.current?.scrollIntoView(true);
  };

  return (
    <nav className={styles.nav}>
      {sections?.map(({ key, displayName, ref }) => (
        <a
          key={key}
          className={`${styles.pageLink} ${
            activePageLink === key ? styles.activePageLink : ''
          }`}
          onClick={() => handlePageNav(key, ref)}>
          {displayName}
        </a>
      ))}
    </nav>
  );
}

export default PageNav;
