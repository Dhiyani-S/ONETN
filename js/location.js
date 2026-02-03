window.onload = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      successLocation,
      errorLocation
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};

function successLocation(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  console.log("Latitude:", latitude);
  console.log("Longitude:", longitude);

  // You can store this for later use
  localStorage.setItem("userLat", latitude);
  localStorage.setItem("userLng", longitude);
}

function errorLocation(error) {
  alert("Location access denied. Some features may not work.");
}
