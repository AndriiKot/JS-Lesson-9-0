import Link from "next/link";
import styles from "./NotFoundPage.module.css";

const NotFoundPage: React.FC = () => {
  return (
    <>
      <div className={ styles["not-found"] }>
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
