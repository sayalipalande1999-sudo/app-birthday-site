export const ROUTES = {
  home: '/',
  envelope: '/envelope',
  gallery: '/gallery',
  secret: '/secret',
}

const knownRoutes = new Set(Object.values(ROUTES))

export function getCurrentRoute() {
  const route = window.location.hash.replace(/^#/, '') || ROUTES.home
  return knownRoutes.has(route) ? route : ROUTES.home
}

export function navigate(route) {
  if (!knownRoutes.has(route)) {
    throw new Error(`Unknown birthday-site route: ${route}`)
  }

  window.location.hash = route
}
