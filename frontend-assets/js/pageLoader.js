function domReady(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }
  
  domReady(function() {
    // 1. Check if all resources are loaded (including images)
    window.addEventListener('load', function() {
      document.documentElement.style.opacity = 1; // Or document.body
    });
  
    // 2. Fallback in case 'load' event doesn't fire (rare, but possible)
    setTimeout(function() {
      if (document.documentElement.style.opacity === '') { // Check if opacity is still at initial value
        document.documentElement.style.opacity = 1; // Force show
        console.warn("Load event didn't fire. Forced opacity to 1.");
      }
    }, 5000); // Adjust timeout as needed (e.g., 5 seconds)
  });