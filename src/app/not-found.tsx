'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import styles from "./NotFoundPage.module.css";

const NotFoundPage: React.FC = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      router.replace("/");
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <>
      <div className={styles["not-found"]}>
        <h1>404 - Page Not Found</h1>
        <p>The requested page does not exist.</p>
        <p>
          You will be redirected to the <Link href="/">home page</Link> in {countdown} second{countdown !== 1 ? 's' : ''}.
        </p>
      </div>
    </>
  );
};

export default NotFoundPage;
