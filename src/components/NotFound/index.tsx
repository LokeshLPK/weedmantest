import { QueryParams } from 'next-sanity';
import Link from 'next/link';

import Header from '@/components/Header';
import { Button } from '@/components/ui/button'; // Import the Button component
import Footer from '@/components/Footer';

export default function NotFound({ params }: {
    params: Promise<QueryParams>;
}) {
    return (
        <>
            <Header params={params} />

            <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-50 dark:bg-gray-900">
                <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                    404
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                    Oops! The page you’re looking for doesn’t exist.
                </p>
                <Link href={"/"}>
                    <Button className="mt-6">Go Back Home</Button>
                </Link>
            </div>
            <Footer/>
        </>
    );
}
