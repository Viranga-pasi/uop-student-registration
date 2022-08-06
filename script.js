//  error_array[0] = null value in object
//  error_array[1] = stream select
//  error_array[2] = combination select
//  error_array[3] = duplicates
let error_array = [true, true, true, false];
// combination object
const combination_set = [
	{
		id: 1,
		name: 'Biology** , Chemistry',
	},
	{
		id: 2,
		name: 'Biology*, Chemistry, Statistics',
	},
	{
		id: 3,
		name: 'Biology*, Chemistry, Computer Science',
	},
	{
		id: 4,
		name: 'Biology*, Chemistry, Physics',
	},
	{
		id: 8,
		name: 'Biology*, Chemistry, Geology',
	},
	{
		id: 15,
		name: 'Chemistry, Geology, Physics',
	},
	{
		id: 18,
		name: 'Chemistry, Mathematics**',
	},
	{
		id: 19,
		name: 'Chemistry, Mathematics*, Physics',
	},
	{
		id: 21,
		name: 'Chemistry, Computer Science, Statistics',
	},
	{
		id: 22,
		name: 'Chemistry, Mathematics*, Statistics',
	},
	{
		id: 26,
		name: 'Mathematics*, Computer Science, Statistics',
	},
	{
		id: 27,
		name: 'Physics, Mathematics**',
	},
	{
		id: 28,
		name: 'Physics, Computer Science, Geology',
	},
	{
		id: 31,
		name: 'Physics, Mathematics*, Computer Science',
	},
	{
		id: 32,
		name: 'Physics, Mathematics*, Statistics',
	},
];

// student details object
let student = {
	name: '',
	gender: '',
	birthday: '',
	nic: '',
	address: '',
	phone: '',
	zscore: '',
	stream: '',
	com: [0, 0, 0, 0, 0],
};
// submit form on button click
document.getElementById('submit').addEventListener('click', function (e) {
	e.preventDefault();

	student.name = document.getElementById('name').value;
	if (document.querySelector("input[type='radio'][name=gender]:checked")) {
		student.gender = document
			.querySelector("input[type='radio'][name=gender]:checked")
			.value.replace(/^./, (str) => str.toUpperCase());
	}

	student.birthday = document.getElementById('birthday').value;
	student.nic = document.getElementById('nic').value;
	student.address = document.getElementById('address').value;
	student.phone = document.getElementById('phone').value;
	student.zscore = document.getElementById('zscore').value;
	student.stream = document.getElementById('stream').value;

	// get combination
	if (
		student.stream == 'Biology Stream' ||
		student.stream == 'Physical Stream'
	) {
		for (let i = 0; i < 5; i++) {
			student.com[i] = document.getElementById(`com${i}`).value;
		}

		error_array[1] = false;
		for (let i = 0; i < student.com.length; i++) {
			if (!student.com[i]) {
				error_array[1] = true;
			}
		}
	} else {
		error_array[1] = false;
	}

	console.log(student);

	checkComplete(student, student.com);
});

// check complete
function checkComplete(student, com) {
	const isEmpty = !Object.values(student).every((x) => x !== null && x !== '');

	error_array[0] = isEmpty;
	for (const key in student) {
		if (!student[key]) {
			document.getElementById(`error-${key}`).innerText =
				'Input field cannot empty';

			error_array[0] = true;
		}
	}

	if (
		student.stream == 'Biology Stream' ||
		student.stream == 'Physical Stream'
	) {
		error_array[3] = checkDuplicates(com);
		for (let i = 0; i < com.length; i++) {
			if (!com[i]) {
				document.getElementById(`error-com${i}`).innerText =
					'Input field cannot empty';
				error_array[1] = true;
			}
		}
	}
	if (error_array.includes(true)) {
		if (error_array[0]) {
			alert('Input fields cannot empty');
		} else if (error_array[3]) {
			alert('Duplicates are not allowed');
		}
	} else {
		// output the given details
		let output = document.querySelector('.output-section');
		let form = document.querySelector('.form-section');
		output.classList.add('display-visible');
		output.classList.remove('display-none');
		form.classList.add('display-none');
		form.classList.remove('display-visible');

		// change icon success
		let link = document.querySelector("link[rel~='icon']");
		link.href = './img/complete.png';
		// change title
		document.getElementById('title').innerHTML = 'Registration Completed';

		// add combination selected
		if (
			student.stream == 'Biology Stream' ||
			student.stream == 'Physical Stream'
		) {
			for (let i = 0; i < com.length; i++) {
				document.getElementById(
					`output-name-com${i}`
				).innerText = `Combination option ${i + 1}`;
				document.getElementById(`output-dot-com${i}`).innerText = ':';
				document.getElementById(`output-com${i}`).innerText =
					combination_set.find((c) => c.id === parseInt(com[i])).name;
			}
		}

		for (const key in student) {
			document.getElementById(`output-${key}`).innerText = student[key];
		}
	}
}

// check duiplicates
function checkDuplicates(arr) {
	let duplicate = false;
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length; j++) {
			if (i !== j) {
				if (arr[i] === arr[j]) {
					document.getElementById(`error-com${i}`).innerText =
						'Duplicates not allowed';
					duplicate = true;
				}
			}
		}
	}

	return duplicate;
}

// reset all errors
function resetError() {
	error_array = [false, false, false];
	console.log('reset : ', error_array);
	for (let i = 0; i < 5; i++) {
		document.getElementById(`combination${i + 1}`).innerHTML = '';
	}
	document.getElementById('title-comb').innerText = '';

	for (const key in student) {
		document.getElementById(`error-${key}`).innerText = '';
	}
}

// check gender
function checkGender() {
	let gender = '';
	if (document.querySelector("input[type='radio'][name=gender]:checked")) {
		gender = document.querySelector(
			"input[type='radio'][name=gender]:checked"
		).value;
	}

	if (!gender) {
		document.getElementById('error-gender').innerText = 'Please select gender';
		error_array[2] = true;
	} else {
		document.getElementById('error-gender').innerText = '';
		error_array[2] = false;
	}
}

// check on change
function onChangeValue(e) {
	let select_id = document.getElementById(e.target.id).id;
	let select_value = document.getElementById(e.target.id).value;
	// check name
	if (select_id == 'name') {
		let check = /^[a-zA-Z\s\.]+$/.test(select_value);
		if (!check) {
			document.getElementById('error-name').innerText = 'Name is not valid';
			error_array[2] = true;
		} else {
			document.getElementById('error-name').innerText = '';
			error_array[2] = false;
		}
	}
	// check birthdate | zscore | address
	else if (
		select_id == 'birthday' ||
		select_id == 'address' ||
		select_id == 'zscore'
	) {
		if (!select_value) {
			document.getElementById(`error-${select_id}`).innerText =
				'Please select your ' + select_id;
			error_array[2] = true;
		} else {
			document.getElementById(`error-${select_id}`).innerText = '';
			error_array[2] = false;
		}
	}
	// check nic
	else if (select_id == 'nic') {
		if (isNaN(select_value)) {
			document.getElementById('error-nic').innerText =
				'NIC number is not valid';
			error_array[2] = true;
		} else {
			document.getElementById('error-nic').innerText = '';
			error_array[2] = false;
		}
	}
	// check phone
	else if (select_id == 'phone') {
		if (isNaN(select_value) || select_value.length != 10) {
			document.getElementById('error-phone').innerText =
				'Contact number is not valid';
			error_array[2] = true;
		} else {
			document.getElementById('error-phone').innerText = '';
			error_array[2] = false;
		}
	}
}

//chech combination
function checkCom(e) {
	if (document.getElementById(e.target.id)) {
		document.getElementById(`error-${e.target.id}`).innerText = '';
	} else {
		document.getElementById(`error-${e.target.id}`).innerText = 'error';
	}
}

// generate combination on selected stream
function selectStream() {
	let stream = document.getElementById('stream').value;
	// console.log(stream);
	let com = 'com';

	if (stream === 'Physical Stream' || stream === 'Biology Stream') {
		document.getElementById('title-comb').innerText = 'Available Combinations';
		for (let i = 0; i < 5; i++) {
			document.getElementById(
				`combination${i + 1}`
			).innerHTML = `<label class="label" for=${com + i}>Select your choice ${
				i + 1
			}</label>
		<select
						id=${com + i}
						title=${com + i}
						class="input-field"
						onchange = "checkCom(event)"
						required
					><option value="" disabled selected>Select your option</option>

						${combination_set.map(
							(com, index) =>
								`<option value=${com.id} key=${index}>
								${com.id}  ${com.name}
							</option>`
						)}
					</select>
					<p class="error" id="error-${com + i}"></p>`;
		}
		document.getElementById('error-stream').innerText = '';
	} else {
		for (let i = 0; i < 5; i++) {
			document.getElementById(`combination${i + 1}`).innerHTML = '';
		}
		document.getElementById('title-comb').innerText = '';
		document.getElementById('error-stream').innerText = '';
	}
}
