import { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";

const Main = () => {
	const [data, setData] = useState({
		calc: "",
		time: "",
	});

	const [calc, setCalc] = useState('');
	const [result, setResult] = useState('');
	const ops = ['/', '*', '+', '-', '.'];
	const [error, setError] = useState("");

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};


	const updateCalc = value => {

		if(
			ops.includes(value) && calc == '' || 
			ops.includes(value) && ops.includes(calc.slice(-1))
		){
			return;
		}

		setCalc(calc + value);

		if(!ops.includes(value)){
			setResult(eval(calc + value).toString());
		}
	}
	
	const deleteLast = () => {
		if(calc == ''){
			return;
		}
		const value = calc.slice(0, -1);

		setCalc(value);
	}


	const createDigits = () => {
		const digits =[];
		for (let i = 1; i < 10; i++){
			digits.push(
				<button onClick={()=> updateCalc(i.toString())} className={styles.button} key={i}>{i}</button>
			)
		}
		return digits;
	}

	const calculateOperation = () =>{
		setCalc(eval(calc).toString());
	}

	const sendOperation = async () => {

		try{
			console.log(calc)
			data.calc = calc;
			data.time =  new Date();
			const url = "http://localhost:8080/api/operations";
			const { data: res } = await axios.post(url, data);
			setCalc(res.result.toString());
			calc = res.result;
			console.log(res.result);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
		
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
					<div>
						<input 
							className={styles.display} 
							value={calc}
							placeholder="0"
							name="operation"
							onChange={handleChange}
							required
						/>
						{/* &nbsp; 
						{ result ? <span>{result}</span> : ''}  */}
							
					</div>
					<div className={styles.operators}>
						<button onClick={()=> updateCalc('/')} className={styles.button}>/</button>
						<button onClick={()=> updateCalc('*')} className={styles.button}>*</button>
						<button onClick={()=> updateCalc('+')} className={styles.button}>+</button>
						<button onClick={()=> updateCalc('-')} className={styles.button}>-</button>
						<button onClick={()=> deleteLast()} className={styles.button}>DEL</button>
					</div>

					<div className={styles.digits}>
						{ createDigits() }
						<button onClick={()=> updateCalc('0')} className={styles.button}>0</button>
						<button onClick={()=> updateCalc('.')} className={styles.button}>.</button>
						<button onClick={()=> sendOperation()} className={styles.button}>=</button>
					
					</div>

				</div>
			</div>
		
		</div>
	);
};

export default Main;
