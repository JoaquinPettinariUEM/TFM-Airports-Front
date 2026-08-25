export type Language = "en" | "es";

export const translations = {
  en: {
    header: {
      howItWorks: "How it works",
      createRoute: "Create your route",
      editRoute: "Edit your route",
      language: "Language",
    },
    home: {
      heroEyebrow: "YOUR JOURNEY, YOUR WAY",
      heroTitleLine1: "One trip,",
      heroTitleLine2: "multiple cities",
      heroSubtitle:
        "Discover the best routes, combine amazing destinations and create unforgettable memories along the way.",
      planTrip: "Plan your trip",
      seeRecommendations: "See recommendations",
      featureSmartRoutesTitle: "Smart routes",
      featureSmartRoutesDescription: "Optimized routes with the best connections",
      featureMultipleCitiesTitle: "Multiple cities",
      featureMultipleCitiesDescription: "Visit more places in one incredible trip",
      featureBudgetTitle: "Budget friendly",
      featureBudgetDescription: "Find the best options within your budget",
      featureFlexibleTitle: "Flexible planning",
      featureFlexibleDescription: "Adapt your trip to your time and preferences",
      popularTitle: "Popular multi-city trips",
      popularSubtitle: "Discover real routes planned by travelers like you",
      popularEmptyTitle: "No popular routes yet",
      popularEmptySubtitle: "We are preparing popular trip combinations.",
      howPreviewEyebrow: "How it works",
      howPreviewTitle: "How RouteWise chooses better routes",
      howPreviewSubtitle:
        "We use your cities, dates, stay days and budget to explore route combinations, filter weak options and surface the most useful alternatives.",
      seeHowItWorks: "See how it works",
      legendOrigin: "Origin",
      legendBestPath: "Best path",
      legendExplored: "Explored",
    },
    createRoute: {
      title: "Create your own route",
      subtitle: "Plan your multi-city adventure in just a few steps",
      travelDates: "Travel Dates",
      tripDays: "trip days",
      budget: "Budget",
      pathPreview: "Path preview:",
      upToFiveCities: "Up to 5 cities total",
      invalidStayDays:
        "Total trip days: {{tripDays}} | Assigned stay days: {{totalStayDays}} (assigned days cannot exceed total trip days).",
      addCity: "Add city",
      search: "Search",
      selectCity: "Select a city",
      selectOptionalCity: "Select a city (optional)",
      days: "Days",
      dragHandle: "Drag handle",
      removeCity: "Remove city",
    },
    searchedRoutes: {
      noRoutesTitle: "No routes found",
      noRoutesSubtitle: "Try increasing budget, dates or max stops to discover more combinations.",
      backToSearch: "Back to search",
      bestRouteTitle: "Best route for you",
      bestRouteSubtitle:
        "Our algorithm found the best balance between price, distance and experience.",
      greatChoice:
        "Great choice! This route offers the best balance of price, time and interesting cities.",
      notFoundCities:
        "We could not find these cities: {{cities}}. We searched alternatives for those stops.",
      otherAlternatives: "Other smart alternatives",
      viewAllRoutes: "View all routes ({{count}})",
      moreExpensiveTitle: "If you want to spend a little more, these routes may fit you",
    },
    routeCard: {
      via: "Via {{cities}}",
      directFlight: "Direct flight",
      flights: "{{count}} flights",
      viewDetails: "View details",
    },
    bestRouteCard: {
      description:
        "Our algorithm found the smartest route balancing price, travel time and interesting stopovers.",
      viewFullDetails: "View full details",
    },
    routeMainTitle: {
      budget: "Budget: {{value}}",
      stops: "Stops: {{count}}",
    },
    routeHeader: {
      title: "Full Route Details",
      share: "Share",
      backToResults: "Back to results",
      subtitle: "Every stop. Every detail. Your complete journey.",
      totalPrice: "Total Price",
      stops: "{{count}} stops",
      cities: "{{count}} cities",
      totalDistance: "Total Distance",
      routeScore: "Route Score",
      totalTravelTime: "Total Travel Time",
    },
    howItWorks: {
      eyebrow: "How it works",
      title: "How RouteWise builds a smarter multi-city trip",
      subtitle:
        "We combine your route template, dates, stay days and budget to surface the travel paths that make the most sense.",
      createRoute: "Create your route",
      backToHome: "Back to home",
      exampleSearch: "Example search",
      mockExample: "Mock example",
      budget: "Budget",
      tripWindow: "Trip window",
      maxStops: "Max stops",
      processChooseTitle: "Choose your cities",
      processChooseDescription:
        "Start with origin and destination, then add the places you definitely want in between.",
      processDatesTitle: "Set dates and budget",
      processDatesDescription:
        "Pick your travel window, total budget and how many days you want to stay in each stop.",
      processExploreTitle: "We explore combinations",
      processExploreDescription:
        "RouteWise generates and evaluates multi-city paths that match your trip constraints.",
      processCompareTitle: "Compare the best options",
      processCompareDescription:
        "You get a best overall route plus alternatives optimized for price, convenience or fewer stops.",
      insideEyebrow: "Inside the search",
      insideTitle: "What the algorithm actually does",
      insideSubtitle:
        "RouteWise does not just list flights. It explores possible city sequences, filters weak candidates, then ranks the remaining routes according to the trip criteria.",
      noteBudgetTitle: "Budget aware",
      noteBudgetDescription:
        "Routes that clearly exceed the target budget are deprioritized early.",
      noteStopTitle: "Stop limit respected",
      noteStopDescription: "The search stays inside your allowed number of intermediate cities.",
      noteDurationTitle: "Duration matters",
      noteDurationDescription:
        "Travel time and stay distribution are considered together with total price.",
      graphOrigin: "Origin",
      graphBestRoute: "Best route",
      graphExploredCity: "Explored city",
      graphDestination: "Destination",
      statCities: "Cities considered",
      statCandidates: "Valid route candidates",
      statSelected: "Best route selected",
      resultsTitle: "How to read the results",
      resultsSubtitle:
        "The app highlights different winners so you can choose what matters most for this trip.",
      badgeBestBalance: "Best Balance",
      badgeBestPrice: "Best Price",
      badgeFewerStops: "Fewer Stops",
      resultBestBalanceSubtitle: "The strongest mix of price, route quality and practical timing.",
      resultBestPriceSubtitle:
        "The lowest total cost among the routes that still fit the trip template.",
      resultFewerStopsSubtitle:
        "A simpler route when reducing stops matters more than visiting more cities.",
      resultMetaFlights3: "3 flights",
      resultMetaStops2: "2 stops",
      resultMetaWithinBudget: "Within budget",
      resultMetaLowestCost: "Lowest cost",
      resultMetaFlights2: "2 flights",
      resultMetaStops1: "1 stop",
      resultMetaLessMoving: "Less moving",
      infoAlert:
        "This page currently uses mocked explanatory examples so the product flow is easy to understand. We can later swap parts of it with live route examples from the backend.",
    },
  },
  es: {
    header: {
      howItWorks: "Como funciona",
      createRoute: "Crear tu ruta",
      editRoute: "Editar tu ruta",
      language: "Idioma",
    },
    home: {
      heroEyebrow: "TU VIAJE, A TU MANERA",
      heroTitleLine1: "Un viaje,",
      heroTitleLine2: "multiples ciudades",
      heroSubtitle:
        "Descubri las mejores rutas, combina destinos increibles y crea recuerdos inolvidables en el camino.",
      planTrip: "Planifica tu viaje",
      seeRecommendations: "Ver recomendaciones",
      featureSmartRoutesTitle: "Rutas inteligentes",
      featureSmartRoutesDescription: "Rutas optimizadas con las mejores conexiones",
      featureMultipleCitiesTitle: "Multiples ciudades",
      featureMultipleCitiesDescription: "Visita mas lugares en un viaje increible",
      featureBudgetTitle: "Amigable con tu presupuesto",
      featureBudgetDescription: "Encuentra las mejores opciones dentro de tu presupuesto",
      featureFlexibleTitle: "Planificacion flexible",
      featureFlexibleDescription: "Adapta tu viaje a tu tiempo y preferencias",
      popularTitle: "Viajes multi-ciudad populares",
      popularSubtitle: "Descubre rutas reales planeadas por viajeros como vos",
      popularEmptyTitle: "Todavia no hay rutas populares",
      popularEmptySubtitle: "Estamos preparando combinaciones populares de viaje.",
      howPreviewEyebrow: "Como funciona",
      howPreviewTitle: "Como RouteWise elige mejores rutas",
      howPreviewSubtitle:
        "Usamos tus ciudades, fechas, dias de estadia y presupuesto para explorar combinaciones, filtrar opciones debiles y mostrar las alternativas mas utiles.",
      seeHowItWorks: "Ver como funciona",
      legendOrigin: "Origen",
      legendBestPath: "Mejor camino",
      legendExplored: "Explorado",
    },
    createRoute: {
      title: "Crea tu propia ruta",
      subtitle: "Planifica tu aventura multi-ciudad en solo unos pasos",
      travelDates: "Fechas del viaje",
      tripDays: "dias de viaje",
      budget: "Presupuesto",
      pathPreview: "Vista previa del recorrido:",
      upToFiveCities: "Hasta 5 ciudades en total",
      invalidStayDays:
        "Dias totales del viaje: {{tripDays}} | Dias asignados de estadia: {{totalStayDays}} (los dias asignados no pueden superar los dias totales del viaje).",
      addCity: "Agregar ciudad",
      search: "Buscar",
      selectCity: "Selecciona una ciudad",
      selectOptionalCity: "Selecciona una ciudad (opcional)",
      days: "Dias",
      dragHandle: "Control para arrastrar",
      removeCity: "Eliminar ciudad",
    },
    searchedRoutes: {
      noRoutesTitle: "No se encontraron rutas",
      noRoutesSubtitle:
        "Prueba aumentar el presupuesto, las fechas o la cantidad maxima de escalas para descubrir mas combinaciones.",
      backToSearch: "Volver a buscar",
      bestRouteTitle: "La mejor ruta para vos",
      bestRouteSubtitle:
        "Nuestro algoritmo encontro el mejor equilibrio entre precio, distancia y experiencia.",
      greatChoice:
        "Gran eleccion! Esta ruta ofrece el mejor equilibrio entre precio, tiempo y ciudades interesantes.",
      notFoundCities:
        "No pudimos encontrar estas ciudades: {{cities}}. Buscamos alternativas para esas paradas.",
      otherAlternatives: "Otras alternativas inteligentes",
      viewAllRoutes: "Ver todas las rutas ({{count}})",
      moreExpensiveTitle: "Si quieres gastar un poco mas, estas rutas pueden servirte",
    },
    routeCard: {
      via: "Via {{cities}}",
      directFlight: "Vuelo directo",
      flights: "{{count}} vuelos",
      viewDetails: "Ver detalles",
    },
    bestRouteCard: {
      description:
        "Nuestro algoritmo encontro la ruta mas inteligente equilibrando precio, tiempo de viaje y escalas interesantes.",
      viewFullDetails: "Ver detalles completos",
    },
    routeMainTitle: {
      budget: "Presupuesto: {{value}}",
      stops: "Escalas: {{count}}",
    },
    routeHeader: {
      title: "Detalles completos de la ruta",
      share: "Compartir",
      backToResults: "Volver a resultados",
      subtitle: "Cada parada. Cada detalle. Tu viaje completo.",
      totalPrice: "Precio total",
      stops: "{{count}} escalas",
      cities: "{{count}} ciudades",
      totalDistance: "Distancia total",
      routeScore: "Puntuacion de la ruta",
      totalTravelTime: "Tiempo total de viaje",
    },
    howItWorks: {
      eyebrow: "Como funciona",
      title: "Como RouteWise construye un viaje multi-ciudad mas inteligente",
      subtitle:
        "Combinamos tu plantilla de ruta, fechas, dias de estadia y presupuesto para mostrar los recorridos que mas sentido tienen.",
      createRoute: "Crear tu ruta",
      backToHome: "Volver al inicio",
      exampleSearch: "Busqueda de ejemplo",
      mockExample: "Ejemplo mock",
      budget: "Presupuesto",
      tripWindow: "Ventana del viaje",
      maxStops: "Escalas maximas",
      processChooseTitle: "Elige tus ciudades",
      processChooseDescription:
        "Comienza con origen y destino, y agrega los lugares que si o si quieres visitar en el medio.",
      processDatesTitle: "Define fechas y presupuesto",
      processDatesDescription:
        "Elige tu ventana de viaje, presupuesto total y cuantos dias quieres quedarte en cada parada.",
      processExploreTitle: "Exploramos combinaciones",
      processExploreDescription:
        "RouteWise genera y evalua rutas multi-ciudad que respetan las condiciones de tu viaje.",
      processCompareTitle: "Compara las mejores opciones",
      processCompareDescription:
        "Obtienes una mejor ruta general y alternativas optimizadas por precio, conveniencia o menos escalas.",
      insideEyebrow: "Dentro de la busqueda",
      insideTitle: "Que hace realmente el algoritmo",
      insideSubtitle:
        "RouteWise no solo lista vuelos. Explora posibles secuencias de ciudades, filtra candidatos debiles y luego ordena las rutas restantes segun los criterios del viaje.",
      noteBudgetTitle: "Consciente del presupuesto",
      noteBudgetDescription:
        "Las rutas que claramente superan el presupuesto objetivo se priorizan menos desde el inicio.",
      noteStopTitle: "Respeta el limite de escalas",
      noteStopDescription:
        "La busqueda se mantiene dentro de la cantidad de ciudades intermedias permitidas.",
      noteDurationTitle: "La duracion importa",
      noteDurationDescription:
        "El tiempo de viaje y la distribucion de estadias se consideran junto con el precio total.",
      graphOrigin: "Origen",
      graphBestRoute: "Mejor ruta",
      graphExploredCity: "Ciudad explorada",
      graphDestination: "Destino",
      statCities: "Ciudades consideradas",
      statCandidates: "Candidatos validos",
      statSelected: "Mejor ruta elegida",
      resultsTitle: "Como leer los resultados",
      resultsSubtitle:
        "La app resalta distintos ganadores para que elijas lo que mas importa en este viaje.",
      badgeBestBalance: "Mejor equilibrio",
      badgeBestPrice: "Mejor precio",
      badgeFewerStops: "Menos escalas",
      resultBestBalanceSubtitle:
        "La mejor combinacion entre precio, calidad de ruta y horarios practicos.",
      resultBestPriceSubtitle:
        "El costo total mas bajo entre las rutas que siguen encajando con la plantilla del viaje.",
      resultFewerStopsSubtitle:
        "Una ruta mas simple cuando reducir escalas importa mas que visitar mas ciudades.",
      resultMetaFlights3: "3 vuelos",
      resultMetaStops2: "2 escalas",
      resultMetaWithinBudget: "Dentro del presupuesto",
      resultMetaLowestCost: "Menor costo",
      resultMetaFlights2: "2 vuelos",
      resultMetaStops1: "1 escala",
      resultMetaLessMoving: "Menos movimiento",
      infoAlert:
        "Esta pagina usa ejemplos mock para que el flujo del producto sea facil de entender. Mas adelante podemos reemplazar partes por ejemplos reales desde el backend.",
    },
  },
} as const;
