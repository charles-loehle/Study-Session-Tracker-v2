import './globals.scss';
import type { Metadata } from 'next';
import { Inter, Rubik } from 'next/font/google';
//import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
//import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';
import Navbar from './components/Navbar';
import 'bootstrap-icons/font/bootstrap-icons.css';

const inter = Inter({ subsets: ['latin'] });
const rubik = Rubik({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Study Session Tracker',
	description: 'Track your study time',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	//const supabase = createServerComponentClient({ cookies });
	//const { data } = await supabase.auth.getSession();
	return (
		<html lang="en">
			<head>
				<script
					src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
					integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
					crossOrigin="anonymous"
					async
				></script>
			</head>
			<body
				className={`RootLayout bg-secondary container px-2 py-5 ${rubik.className}`}
			>
				{/* <Navbar user={data.session?.user} /> */}
				<Navbar />
				{children}
			</body>
		</html>
	);
}

