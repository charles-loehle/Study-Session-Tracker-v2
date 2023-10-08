'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormEvent } from 'react';
import AuthForm from '../AuthForm';

export default function Signup() {
	const router = useRouter();
	const [formError, setFormError] = useState('');

	const handleSubmit = async (
		e: FormEvent<HTMLFormElement>,
		email: string,
		password: string
	) => {
		e.preventDefault();
		//console.log(email, password);
		const supabase = createClientComponentClient();
		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: { emailRedirectTo: `${location.origin}/api/auth/callback` },
		});
		if (error) {
			setFormError(error.message);
		}
		if (!error) {
			// redirect to 'verify your email' page
			router.push('/verify');
		}
	};

	return (
		<div>
			<h1 className="text-primary">Sign up</h1>
			<AuthForm handleSubmit={handleSubmit} />
			{formError && <div className="text-danger">{formError}</div>}
		</div>
	);
}
