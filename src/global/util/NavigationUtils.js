
export function getRouteObjFrom(navigationState, routeName) {
    const index = navigationState.routeNames.indexOf(routeName);
    return navigationState.routes[index];
}