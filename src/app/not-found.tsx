'use client';

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import styles from "./NotFoundPage.module.css";

const NotFoundPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/");
    }, 3000);
  });
  return (
    <>
      <div className={styles["not-found"]}>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, but the requested page does not exist.</p>
        <p>
          Go back to the <Link href="/">home page</Link>.
        </p>
      </div>
    </>
  );
};

export default NotFoundPage;
