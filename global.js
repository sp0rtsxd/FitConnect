document.addEventListener("DOMContentLoaded", function () {
	// Dark mode toggle
	const darkModeToggle = document.getElementById("darkModeToggle");
	const body = document.body;

	darkModeToggle.addEventListener("click", () => {
		body.classList.toggle("dark-mode");
		localStorage.setItem("darkMode", body.classList.contains("dark-mode"));
		updateDarkModeIcon();
	});

	// Check for saved dark mode preference
	if (localStorage.getItem("darkMode") === "true") {
		body.classList.add("dark-mode");
		updateDarkModeIcon();
	}

	function updateDarkModeIcon() {
		const icon = darkModeToggle.querySelector("i");
		if (body.classList.contains("dark-mode")) {
			icon.classList.remove("fa-moon");
			icon.classList.add("fa-sun");
		} else {
			icon.classList.remove("fa-sun");
			icon.classList.add("fa-moon");
		}
	}

	// Chat widget
	const chatWidget = document.getElementById("chatWidget");
	const closeChat = document.getElementById("closeChat");
	const chatInput = document.getElementById("chatInput");
	const chatMessages = document.getElementById("chatMessages");

	// Add a chat toggle button
	const chatToggle = document.createElement("button");
	chatToggle.id = "chatToggle";
	chatToggle.innerHTML = '<i class="fas fa-comments"></i>';
	chatToggle.classList.add("btn", "btn-primary", "rounded-circle");
	chatToggle.style.position = "fixed";
	chatToggle.style.bottom = "20px";
	chatToggle.style.right = "20px";
	document.body.appendChild(chatToggle);

	chatToggle.addEventListener("click", () => {
		chatWidget.classList.add("active");
		chatToggle.style.display = "none";
	});

	closeChat.addEventListener("click", () => {
		chatWidget.classList.remove("active");
		chatToggle.style.display = "block";
	});

	chatInput.addEventListener("keypress", (e) => {
		if (e.key === "Enter") {
			const message = chatInput.value.trim();
			if (message) {
				addMessage("You", message);
				chatInput.value = "";

				// Simulate a response (replace with actual chatbot integration)
				setTimeout(() => {
					addMessage(
						"Support",
						"Thank you for your message! How can I help you?"
					);
				}, 1000);
			}
		}
	});

	function addMessage(sender, text) {
		const messageElement = document.createElement("div");
		messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
		chatMessages.appendChild(messageElement);
		chatMessages.scrollTop = chatMessages.scrollHeight;
	}

	// Smooth scrolling for navigation
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();
			document.querySelector(this.getAttribute("href")).scrollIntoView({
				behavior: "smooth",
			});
		});
	});

	// Form validation
	const form = document.getElementById("registrationForm");
	if (form) {
		form.addEventListener(
			"submit",
			function (event) {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();
				}
				form.classList.add("was-validated");
			},
			false
		);
	}

	// Animate on scroll initialization
	AOS.init({
		duration: 1000,
		once: true,
	});

	// Add AOS attributes to elements
	document
		.querySelectorAll(".feature-card, .coach-card, .blog-card")
		.forEach((el, index) => {
			el.setAttribute("data-aos", "fade-up");
			el.setAttribute("data-aos-delay", index * 100);
		});

	// Testimonial carousel auto-play
	const testimonialCarousel = new bootstrap.Carousel(
		document.getElementById("testimonialCarousel"),
		{
			interval: 5000,
			wrap: true,
		}
	);

	// Fitness Goal Calculator
	document
		.getElementById("goalForm")
		.addEventListener("submit", function (e) {
			e.preventDefault();
			const weight = parseFloat(document.getElementById("weight").value);
			const height = parseFloat(document.getElementById("height").value);
			const age = parseFloat(document.getElementById("age").value);
			const goal = document.getElementById("goal").value;

			if (isNaN(weight) || isNaN(height) || isNaN(age)) {
				alert("Please enter valid numbers for weight, height, and age.");
				return;
			}
			const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
			let recommendation = "";

			switch (goal) {
				case "lose":
					recommendation = `To lose weight, aim for a daily calorie intake of ${Math.round(
						bmr * 0.85
					)} calories.`;
					break;
				case "gain":
					recommendation = `To gain muscle, aim for a daily calorie intake of ${Math.round(
						bmr * 1.15
					)} calories.`;
					break;
				case "maintain":
					recommendation = `To maintain your weight, aim for a daily calorie intake of ${Math.round(
						bmr
					)} calories.`;
					break;
				default:
					recommendation = "Please select a valid goal.";
			}

			document.getElementById(
				"result"
			).innerHTML = `<p class="alert alert-success">${recommendation}</p>`;
		});
	const map = L.map("gymMap").setView([51.505, -0.09], 13);
	let tileLayer = L.tileLayer(
		"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
		{
			attribution:
				'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}
	).addTo(map);

	// Function to update the map tile layer
	function updateMapStyle() {
		if (body.classList.contains("dark-mode")) {
			// Dark Mode map style
			map.removeLayer(tileLayer); // Remove the previous layer

			tileLayer = L.tileLayer(
				"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
				{
					attribution:
						'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
					subdomains: "abcd",
					maxZoom: 19,
				}
			).addTo(map);
		} else {
			// Light Mode (default) map style
			map.removeLayer(tileLayer);

			tileLayer = L.tileLayer(
				"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
				{
					attribution:
						'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
				}
			).addTo(map);
		}
	}

	// Initial map style setup
	updateMapStyle();

	// Event listener for dark mode toggle to update map
	darkModeToggle.addEventListener("click", updateMapStyle);

	const gymMarker = L.icon({
		iconUrl: "https://via.placeholder.com/32",
		iconSize: [32, 32],
		iconAnchor: [16, 32],
		popupAnchor: [0, -32],
	});
	L.marker([51.5, -0.09], { icon: gymMarker })
		.addTo(map)
		.bindPopup("<strong>FitZone Gym</strong><br>Open 24/7")
		.openPopup();
	L.marker([51.51, -0.1], { icon: gymMarker })
		.addTo(map)
		.bindPopup("<strong>PowerLift Center</strong><br>5AM - 11PM");

	const ctx = document.getElementById("progressChart").getContext("2d");
	const progressChart = new Chart(ctx, {
		type: "line",
		data: {
			labels: [
				"Week 1",
				"Week 2",
				"Week 3",
				"Week 4",
				"Week 5",
				"Week 6",
			],
			datasets: [
				{
					label: "Weight (kg)",
					data: [80, 79, 78, 77.5, 76.8, 76],
					backgroundColor: "rgba(75, 192, 192, 0.2)",
					borderColor: "rgb(75, 192, 192)",
					borderWidth: 2,
					tension: 0.4,
				},
			],
		},
		options: {
			scales: {
				y: {
					beginAtZero: false,
				},
			},
		},
	});
	function updateChartStyle() {
		const chartData = progressChart.data.datasets[0];
		if (body.classList.contains("dark-mode")) {
			chartData.backgroundColor = "rgba(30, 136, 229, 0.5)"; // Example dark mode color
			chartData.borderColor = "rgb(30, 136, 229)"; // Example dark mode color
			progressChart.options.scales.y.grid = {
				color: "rgba(255, 255, 255, 0.1)", // Adjust grid color for dark mode
			};
		} else {
			chartData.backgroundColor = "rgba(75, 192, 192, 0.2)";
			chartData.borderColor = "rgb(75, 192, 192)";
			progressChart.options.scales.y.grid = {
				color: "rgba(0, 0, 0, 0.1)", // Default grid color
			};
		}
		progressChart.update();
	}
	darkModeToggle.addEventListener("click", updateChartStyle);
});