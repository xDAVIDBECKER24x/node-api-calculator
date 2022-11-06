import styles from "./styles.module.css";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const createDigits = () => {
		const digits =[];
		for (let i = 1; i < 10; i++){
			digits.push(
				<button className={styles.button} key={i}>{i}</button>
			)
		}
		return digits;
	}

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Calculator API</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<div className={styles.calculator_container}>
				<div className={styles.calculator}>
					<div className={styles.display}>
						<span>(0)</span> 0

					</div>
					<div className={styles.operators}>
						<button className={styles.button}>/</button>
						<button className={styles.button}>*</button>
						<button className={styles.button}>+</button>
						<button className={styles.button}>-</button>
						<button className={styles.button}>DEL</button>
					</div>

					<div className={styles.digits}>
						{ createDigits() }
						<button className={styles.button}>0</button>
						<button className={styles.button}>.</button>
						<button className={styles.button}>=</button>
					
					</div>

				</div>
			</div>
		
		</div>
	);
};

export default Main;
