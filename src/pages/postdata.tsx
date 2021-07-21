const postdata = () => {
  const postnow = () => {
    fetch("http://localhost:3000/api/session/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: "randomstringlol" }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };
  return <button onClick={() => postnow()}>Click me</button>;
};

export default postdata;
