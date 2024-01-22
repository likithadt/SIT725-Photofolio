async function adduser() {
    const newUser = {
        id: 2,
        name: "test",
        role: "client",
        age: 25,
    }
    try {
        const resp = await fetch('/userRegistration/adduser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });
        const data = await resp.json();

        console.log("Data from server ::", data);
    } catch(error) {
        console.log("Error creating User", error);
    }
}