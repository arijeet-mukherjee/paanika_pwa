import axios from "axios";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, child, get } from "firebase/database";
var crypto = require("crypto");

const characters =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length) {
	let result = " ";
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}
const util = {
	baseUrl: "http://admin.paanika.com/api/client/",

	imageUrl: "http://admin.paanika.com/gallary/",

	clientsecret: "sk_1234",

	clientid: "1234",

	getCurrentDateTime: () => {
		const now = new Date();

		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, "0");
		const day = String(now.getDate()).padStart(2, "0");

		const hours = String(now.getHours()).padStart(2, "0");
		const minutes = String(now.getMinutes()).padStart(2, "0");
		const seconds = String(now.getSeconds()).padStart(2, "0");

		return `${year}${month}${day}${hours}${minutes}${seconds}`;
	},

	generateString: (length) => {
		let result = " ";
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}

		return result;
	},

	header: {
		clientsecret: "sk_1234",
		clientid: "1234",
		"Access-Control-Allow-Origin": "*",
	},

	pillNames: ["CATEGORIES", "SAREE", "DRESS", "DUPATTA"],

	apiCall: async (method, baseUrl, endurl, header, key, value) => {
		var formdata = new FormData();
		if (key && value) {
			formdata.append(key, value);
		}
		var config = {
			method: method,
			url: baseUrl + endurl,
			headers: header,
			data: formdata ? formdata : "",
		};
		return new Promise((resolve, reject) => {
			axios(config)
				.then((response) => response.data)
				.then((data) => {
					resolve(data);
					//setIsLoading(false);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
};

//https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction  http://localhost:3000/#/

function getAlgorithm(keyBase64) {
	var key = Buffer.from(keyBase64, "base64");
	switch (key.length) {
		case 16:
			return "aes-128-cbc";
		case 32:
			return "aes-256-cbc";
	}
	throw new Error("Invalid key length: " + key.length);
}

export const encrypt = function(plainText, keyBase64, ivBase64) {
	const key = Buffer.from(keyBase64, "base64");
	const iv = Buffer.from(ivBase64, "base64");

	const cipher = crypto.createCipheriv(getAlgorithm(keyBase64), key, iv);
	let encrypted = cipher.update(plainText, "utf8", "hex");
	encrypted += cipher.final("hex");
	return encrypted;
};

export const decrypt = function(messagebase64, keyBase64, ivBase64) {
	const key = Buffer.from(keyBase64, "base64");
	const iv = Buffer.from(ivBase64, "base64");

	const decipher = crypto.createDecipheriv(getAlgorithm(keyBase64), key, iv);
	let decrypted = decipher.update(messagebase64, "hex");
	decrypted += decipher.final();
	return decrypted;
};

export const initiatePayment = function(amount = 0, orderId) {
	const workingKey = "919F32B22451315A4AFD28056870B0ED"; //Put in the 32-Bit key shared by CCAvenues.
	const accessCode = "AVDZ74KF39AL75ZDLA"; //Put in the Access Code shared by CCAvenues.
	let md5 = crypto
		.createHash("md5")
		.update(workingKey)
		.digest();
	let keyBase64 = Buffer.from(md5).toString("base64"); //Initializing Vector and then convert in base64 string
	var ivBase64 = Buffer.from([
		0x00,
		0x01,
		0x02,
		0x03,
		0x04,
		0x05,
		0x06,
		0x07,
		0x08,
		0x09,
		0x0a,
		0x0b,
		0x0c,
		0x0d,
		0x0e,
		0x0f,
	]).toString("base64");

	let data = {};
	data.merchant_id = "2531097";
	data.order_id = orderId ? orderId : generateString(5);
	data.currency = "INR";
	data.amount = amount;
	data.redirect_url = "http://localhost:3000/#/";
	data.cancel_url = "http://localhost:3000/#/";
	data.language = "en";

	const encRequest = encrypt(data.toString(), keyBase64, ivBase64); //data after hashing
	let formData = new FormData();
	formData.append("encRequest", encRequest);
	formData.append("accessCode", accessCode);

	const header = {
		"Access-Control-Allow-Origin": "*",
	};

	var config = {
		method: "POST",
		url:
			"https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction",
		headers: header,
		data: formData ? formData : "",
	};

	return new Promise((resolve, reject) => {
		axios(config)
			.then((response) => response.data)
			.then((data) => {
				resolve(data);
				//setIsLoading(false);
			})
			.catch(function(error) {
				reject(error);
			});
	});
};

export const initializeFirebase = function(){
	// TODO: Add SDKs for Firebase products that you want to use
	// https://firebase.google.com/docs/web/setup#available-libraries

	// Your web app's Firebase configuration
	// For Firebase JS SDK v7.20.0 and later, measurementId is optional
	const firebaseConfig = {
		apiKey: "AIzaSyDjXORsevzHU62WZs-ZJ64ErolRv_EYQCs",
		authDomain: "paanika.firebaseapp.com",
		projectId: "paanika",
		storageBucket: "paanika.appspot.com",
		messagingSenderId: "409235311412",
		appId: "1:409235311412:web:98b1b9dc696d6f9b2b3361",
		measurementId: "G-7H99DJH2MY"
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	const analytics = getAnalytics(app);
	return app;
};

export const getOrderStatus = (order_no) => {

	return new Promise( async (resolve, reject) => {
		try {
			const response = await axios.get(
				`http://payment.paanika.com:4000/payment/getOrderStatus?order_no=${order_no.toString()}`
			);

			// Check if the response is empty
			if (response.data !== null && Object.keys(response.data).length > 0) {
					resolve(response.data)
			}
		} catch (error) {
			console.error(error);
			reject(error);
			// Handle the error here
		}
	});
	
};

export const readFirebaseDatabase = (path = '/') => {
	const dbRef = ref(getDatabase());
	get(child(dbRef, path)).then((snapshot) => {
		if (snapshot.exists()) {
			console.log("Firebase Data : ",snapshot.val());
			return snapshot.val();
		} else {
			return {};
			console.log("No data available");
		}
	}).catch((error) => {
		console.error(error);
	});
};

export default util;
