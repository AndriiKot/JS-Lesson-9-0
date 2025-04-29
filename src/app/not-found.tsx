import Link from 'next/link';


const NotFoundPage = () => {
  return (
    <div className='not-found'>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, but the requested page does not exist.</p>
      <p>
        Go back to the <Link href="/">home page</Link>.
      </p>
    </div>
  );
};

export default NotFoundPage;
