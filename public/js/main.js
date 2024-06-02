document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");
    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Fetch form data
        const formData = new FormData(registrationForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Send registration data to backend API
        fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    alert("Registration successful!");
                    // Redirect to login page or any other page as needed
                    window.location.href = "/login";
                } else {
                    alert("Registration failed. Please try again.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("An error occurred. Please try again later.");
            });
    });
});
