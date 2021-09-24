const script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
script.type = "text/javascript";
script.onreadystatechange = handler;
script.onload = handler;
document.getElementsByTagName("head")[0].appendChild(script);

console.log("success!!")
function handler() {
    const header = $('#shopify-section-announcement-bar');
    header.prepend('<div>Great Stuff Here!</div>').css({'background-color': 'orange', 'text-align': 'center'})
}