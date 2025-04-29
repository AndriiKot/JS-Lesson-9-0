'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import styles from "./NotFoundPage.module.css";

const NotFoundPage: React.FC = () => {
  const timer = 5;
  const timerSeconds = timer * 1000;
  const router = useRouter();
  const [countdown, setCountdown] = useState(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      router.replace("/");
    }, timerSeconds);

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
