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
});

document.addEventListener("DOMContentLoaded", function () {
	// FAQ Accordion
	const faqQuestions = document.querySelectorAll(".faq-question");
	faqQuestions.forEach((question) => {
		question.addEventListener("click", () => {
			const answer = question.nextElementSibling;
			const icon = question.querySelector("i");
			answer.style.display =
				answer.style.display === "block" ? "none" : "block";
			icon.classList.toggle("fa-chevron-down");
			icon.classList.toggle("fa-chevron-up");
		});
	});

	// Dark Mode Toggle
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
});
