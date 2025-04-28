"use client";

import Flex from "@/app/containers/Flex";
import styles from "./Content.module.css";
import Image from "next/image";
import Logo from "@/app/components/logo";
import SearchBar from "@/app/components/SearchBar";
import Link from "next/link";
import clsx from "clsx";
import { useUserAgent } from "@/app/utilsClient";
import { useEffect, useRef, useState } from "react";

interface HomePageTextInterface {
  className?: string;
  style?: React.CSSProperties;
}

function HomePageText({ className, style }: HomePageTextInterface) {
  return (
    <div className={className} style={style}>
      <div
        dangerouslySetInnerHTML={{
          __html:
            'Direct <span style="color: var(--button-color-one); font-weight: 500;">science-based </span>answers to medical&nbsp;questions',
        }}
      />
    </div>
  );
}

interface FloatingLinkInterface {
  query: string;
  href: string;
}

function FloatingLink({ query, href }: FloatingLinkInterface) {
  return (
    <Link href={href} prefetch={true} passHref>
      <div
        className={styles.floatingLink}
        id={`link-${query.replace(/\s+/g, "-").toLowerCase()}`}
        role="link"
        tabIndex={0}
      >
        <Flex direction="row" align="center" gap={4}>
          <Image
            width={20}
            height={20}
            src="../icon.svg" // Replace with the correct path to your image
            alt="Logo"
            className={styles.littleLinkLogo}
          />
          {query}
        </Flex>
      </div>
    </Link>
  );
}

class LinkData {
  constructor(public query: string, public href: string) { }
}

interface LinkCloudProps {
  links: LinkData[];
  className?: string;
}

const LinkCloud = ({ links, className }: LinkCloudProps) => {
  // Duplicate links to ensure continuous scrolling without gaps
  const duplicationCount = 4; // Number of times to duplicate the links
  const duplicatedLinks = Array(duplicationCount).fill(links).flat();
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Measure the width of the scroll content
  useEffect(() => {
    // Re-measure on window resize
    const handleResize = () => {
      if (scrollContentRef.current) {
        const width = scrollContentRef.current.scrollWidth;

        document.documentElement.style.setProperty('--scroll-distance', `-${width / duplicationCount}px`);
      }
    };

    setTimeout(handleResize, 100); // Delay to ensure the DOM is fully loaded

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [links]);


  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContentRef.current) return;

    setStartX(e.touches[0].pageX - scrollContentRef.current.offsetLeft);
    setScrollLeft(scrollContentRef.current.scrollLeft);

    scrollContentRef.current.classList.add(styles.manualScrolling);
  };

  const handleTouchEnd = () => {
    if (!scrollContentRef.current) return;
    
    scrollContentRef.current.classList.remove(styles.manualScrolling);
  };


  const handleTouchMove = (e: React.TouchEvent) => {
    if (!scrollContentRef.current) return;

    const x = e.touches[0].pageX - scrollContentRef.current.offsetLeft;
    const walk = (x - startX);
    scrollContentRef.current.scrollTo({ left: scrollLeft - walk });
  };


  return (
    <Flex
      direction="column"
      gap={20}
      className={`${className} ${styles.linkCloudWrapper}`}
      width="70%"
    >
      <span
        style={{
          fontWeight: "300",
        }}
      >
        {"Try it out"}
      </span>
      <div className={styles.scrollContainer}>
        <div
          className={styles.scrollContent}
          ref={scrollContentRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
        >
          {duplicatedLinks.map((link, index) => (
            <FloatingLink key={index} query={link.query} href={link.href} />
          ))}
        </div>
      </div>
    </Flex>
  );
};

export default function Content() {
  const client = useUserAgent();

  return (
    <div
      className={clsx(
        styles.content,
        client.isStandalone && styles.noPaddingTop
      )}
    >
      <Flex
        direction="column"
        justify="center"
        align="center"
        className={styles.logoWrapper}
      >
        <Logo />
        <HomePageText className={styles.homePageText} />
      </Flex>
      <SearchBar
        // Do not remove this, we use these inside of the search bar.
        style={{
          paddingLeft: "10px",
          paddingRight: "10px",
          maxWidth: "600px",
        }}
        className={styles.searchBar}
        handleSubmit={() => { }}
        placeholderText={"Ask a health or bioscience question"}
        shouldReanchor={true}
      />
      <LinkCloud
        links={[
          {
            query: "Is coffee beneficial or harmful for health?",
            href: "share/bP1js2g2jUHyhrBZgGtKpk",
          },
          {
            query: "How does stress affect the immune system?",
            href: "share/sNqUY46BqFs6GJxShpCjCR",
          },
        ]}
      />
    </div>
  );
}
