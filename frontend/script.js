// Toggle between Login and Register Forms
document.getElementById('show-register').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.remove('hidden');
    document.getElementById('form-title').innerText = 'Register';
});

document.getElementById('show-login').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('form-title').innerText = 'Login';
});

// Add Tailwind hover styles dynamically
document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.add(
        'text-white', 'text-lg', 'transition', 'duration-300',
        'hover:bg-white', 'hover:text-gray-800', 'px-4', 'py-2', 'rounded-lg'
    );
});

document.getElementById("register-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const fullName = document.querySelector(".name").value;
    const email = document.querySelector(".email").value;
    const password = document.querySelector(".password").value;
console.log(fullName, email, password);
    try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ fullName, email, password })
        });

        const data = await response.json();
        console.log(data);
        if (response.ok) {
            alert("User registered successfully!");
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        alert("Error registering user");
    }
});

document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.querySelector(".login-email").value;
    const password = document.querySelector(".login-password").value;

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            alert("Login successful!");
            localStorage.setItem("token", data.token); // Store token for authentication
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        alert("Error logging in");
    }
});
