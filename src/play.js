function Play (render, routes) {
    for (var player in pm.players) {
        if (routes[player]) {
            pm.players[player].route = new Route(routes[player], pm.players[player]);
            
            if (render) {
                pm.players[player].route.render();
            }
        }
    }
}