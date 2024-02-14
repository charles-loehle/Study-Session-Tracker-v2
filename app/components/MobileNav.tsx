import Link from 'next/link';
import LogoutButton from './LogoutButton';

// export default function Navbar({ user }: any) {
//console.log(user);

export default function Navbar() {
	return (
		<nav className="navbar sticky-bottom bg-body-tertiary">
			<div className="container-fluid">
				<Link className="navbar-brand text-primary" href="/">
					<i className="bi bi-house"></i>
				</Link>
				<Link className="" href="/create">
					<i
						className="bi bi-plus-circle-fill"
						style={{ fontSize: '3rem' }}
					></i>
				</Link>
			</div>
		</nav>
	);
}
