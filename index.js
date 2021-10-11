// Add Security Headers
let addHeaders = {
  "Content-Security-Policy": "upgrade-insecure-requests",
  "Strict-Transport-Security": "max-age=2592000",
  "X-XSS-Protection": "1; mode=block",
  "X-Frame-Options": "SAMEORIGIN",
  "X-Content-Type-Options": "nosniff",
}

// You can remove Header for hiding header in public
let removeHeaders = [
  "X-Powered-By",
  "via"
]

//
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})
async function handleRequest(request) {
  // Fetch the original page from the origin
  let response = await fetch(request)

  // Make response headers mutable
  response = new Response(response.body, response)

  // Set header in (addHeaders)
  Object.keys(addHeaders).map(function(name, index) {
    response.headers.set(name, addHeaders[name])
  })

  // Delete header in (removeHeaders)
  removeHeaders.forEach(function(name){
    response.headers.delete(name)
  })

  // Return
  return response
}