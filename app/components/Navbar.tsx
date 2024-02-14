import Link from 'next/link';
import LogoutButton from './LogoutButton';

// export default function Navbar({ user }: any) {
//console.log(user);

export default function Navbar() {
	return (
		<nav className="navbar bg-body-tertiary">
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
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarCollapse"
					aria-controls="navbarCollapse"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarCollapse">
					<ul className="navbar-nav me-auto mb-2 mb-md-0">
						<li className="nav-item">
							<Link className="nav-link" href="/create">
								Create New Study Session
							</Link>
						</li>

						{/* {user && (
							<li className="nav-item">
								<Link className="nav-link" href="/create">
									Create New Study Session
								</Link>
							</li>
						)}
						{!user && (
							<>
								<li className="nav-item">
									<Link className="nav-link" href="/login">
										Log in
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" href="/signup">
										Sign up
									</Link>
								</li>
							</>
						)}
					</ul>
					<div className="d-flex align-items-center">
						{user && (
							<>
								<p className="me-4 mb-0">Hello, {user.email}</p>
								<LogoutButton />
							</>
						)} */}
					</ul>
				</div>
			</div>
		</nav>
	);
}
