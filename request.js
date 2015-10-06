var request = new XMLHttpRequest();

request.addEventListener("load", function (evt) {
    console.log(this.response);
});

request.addEventListener("error", function (evt) {
    throw this.response;
});

request.open('GET', 'http://localhost:3000/sputnik', true);
request.send();
