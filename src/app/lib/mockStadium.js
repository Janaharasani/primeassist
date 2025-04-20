export const mockStadiumData = {
  seats: [
    // Using the specific format from ticket example: B12
    {
      seatNumber: "B12",
      gateOptions: [
        { gate: "Gate 1", distance: 50, crowdLevel: 3, routeTime: 10 },
        { gate: "Gate 2", distance: 120, crowdLevel: 5, routeTime: 20 },
        { gate: "Gate 3", distance: 150, crowdLevel: 2, routeTime: 15 },
      ],
      routeOptions: [
        {
          route: "Route 1",
          description: "Through the East Wing",
          crowdLevel: 2,
          time: 10,
        },
        {
          route: "Route 2",
          description: "Through the Main Entrance",
          crowdLevel: 5,
          time: 15,
        },
        {
          route: "Route 3",
          description: "Through the VIP area",
          crowdLevel: 1,
          time: 8,
        },
      ],
      parkingZone: "A",
    },
    // Add more sections that will be used in typical tickets
    {
      seatNumber: "A10",
      gateOptions: [
        { gate: "Gate 1", distance: 80, crowdLevel: 4, routeTime: 15 },
        { gate: "Gate 2", distance: 100, crowdLevel: 3, routeTime: 12 },
        { gate: "Gate 3", distance: 160, crowdLevel: 2, routeTime: 20 },
      ],
      routeOptions: [
        {
          route: "Route 1",
          description: "Through the West Wing",
          crowdLevel: 3,
          time: 12,
        },
        {
          route: "Route 2",
          description: "Through the Main Entrance",
          crowdLevel: 4,
          time: 15,
        },
        {
          route: "Route 3",
          description: "Through the North Corridor",
          crowdLevel: 2,
          time: 10,
        },
      ],
      parkingZone: "B",
    },
    {
      seatNumber: "C15",
      gateOptions: [
        { gate: "Gate 2", distance: 40, crowdLevel: 3, routeTime: 8 },
        { gate: "Gate 3", distance: 90, crowdLevel: 2, routeTime: 14 },
        { gate: "Gate 4", distance: 120, crowdLevel: 1, routeTime: 18 },
      ],
      routeOptions: [
        {
          route: "Route 1",
          description: "Through the South Entrance",
          crowdLevel: 2,
          time: 10,
        },
        {
          route: "Route 2",
          description: "Through the Food Court",
          crowdLevel: 4,
          time: 12,
        },
        {
          route: "Route 3",
          description: "Through the Corporate Boxes",
          crowdLevel: 1,
          time: 15,
        },
      ],
      parkingZone: "C",
    },
    // Add more general patterns to catch other seats
    {
      seatNumber: "A",
      gateOptions: [
        { gate: "Gate 2", distance: 60, crowdLevel: 4, routeTime: 12 },
        { gate: "Gate 3", distance: 70, crowdLevel: 3, routeTime: 10 },
        { gate: "Gate 4", distance: 100, crowdLevel: 2, routeTime: 15 },
      ],
      routeOptions: [
        {
          route: "Route 1",
          description: "Through the North Entrance",
          crowdLevel: 3,
          time: 8,
        },
        {
          route: "Route 2",
          description: "Through the Premium Section",
          crowdLevel: 2,
          time: 12,
        },
        {
          route: "Route 3",
          description: "Through the Stadium Shop",
          crowdLevel: 4,
          time: 10,
        },
      ],
      parkingZone: "A",
    },
    {
      seatNumber: "B",
      gateOptions: [
        { gate: "Gate 1", distance: 110, crowdLevel: 5, routeTime: 22 },
        { gate: "Gate 4", distance: 50, crowdLevel: 2, routeTime: 10 },
        { gate: "Gate 5", distance: 80, crowdLevel: 1, routeTime: 15 },
      ],
      routeOptions: [
        {
          route: "Route 1",
          description: "Through the East Concourse",
          crowdLevel: 1,
          time: 8,
        },
        {
          route: "Route 2",
          description: "Through the Main Concourse",
          crowdLevel: 5,
          time: 15,
        },
        {
          route: "Route 3",
          description: "Through the Family Section",
          crowdLevel: 3,
          time: 12,
        },
      ],
      parkingZone: "B",
    },
    {
      seatNumber: "C",
      gateOptions: [
        { gate: "Gate 1", distance: 110, crowdLevel: 5, routeTime: 22 },
        { gate: "Gate 4", distance: 50, crowdLevel: 2, routeTime: 10 },
        { gate: "Gate 5", distance: 80, crowdLevel: 1, routeTime: 15 },
      ],
      routeOptions: [
        {
          route: "Route 1",
          description: "Through the East Concourse",
          crowdLevel: 1,
          time: 8,
        },
        {
          route: "Route 2",
          description: "Through the Main Concourse",
          crowdLevel: 5,
          time: 15,
        },
        {
          route: "Route 3",
          description: "Through the Family Section",
          crowdLevel: 3,
          time: 12,
        },
      ],
      parkingZone: "B",
    },
  ],

  parkingZones: {
    A: { description: "Closest to Main Entrance", availableSpots: 10 },
    B: { description: "Near Gate 3", availableSpots: 3 },
    C: { description: "Farther from Entrance", availableSpots: 15 },
  },
};

export const getSeatInfo = (seatNumber) => {
  console.log("Searching for seat:", seatNumber);

  // Try exact match first
  let seatData = mockStadiumData.seats.find(
    (seat) => seat.seatNumber === seatNumber
  );

  // If not found, try to match just the first character (section)
  if (!seatData) {
    const sectionLetter = seatNumber.charAt(0);
    seatData = mockStadiumData.seats.find(
      (seat) => seat.seatNumber === sectionLetter
    );
  }

  if (!seatData) {
    // Return default data if the exact seat is not found
    console.log("Seat not found, returning default data");
    return {
      seatNumber: seatNumber || "B12",
      gates: [
        { gate: "Gate 1", distance: 50, crowdLevel: 3, routeTime: 10 },
        { gate: "Gate 2", distance: 100, crowdLevel: 4, routeTime: 15 },
      ],
      bestGate: { gate: "Gate 1", distance: 50, crowdLevel: 3, routeTime: 10 },
      routes: [
        {
          route: "Route 1",
          description: "Through the Main Entrance",
          crowdLevel: 2,
          time: 10,
        },
        {
          route: "Route 2",
          description: "Through the VIP area",
          crowdLevel: 1,
          time: 8,
        },
      ],
      bestRoute: {
        route: "Route 2",
        description: "Through the VIP area",
        crowdLevel: 1,
        time: 8,
      },
      parkingZone: mockStadiumData.parkingZones.A,
      usedFallbackData: true,
    };
  }

  // Randomize crowd and route times (mocking)
  const randomizedGateOptions = seatData.gateOptions.map((gate) => ({
    ...gate,
    crowdLevel: Math.floor(Math.random() * 6),
    routeTime: Math.floor(Math.random() * 15) + 5,
  }));

  const randomizedRouteOptions = seatData.routeOptions.map((route) => ({
    ...route,
    crowdLevel: Math.floor(Math.random() * 6),
    time: Math.floor(Math.random() * 10) + 5,
  }));

  // Find best gate (lowest crowd level & shortest route time)
  const bestGate = randomizedGateOptions.sort((a, b) => {
    const aScore = a.crowdLevel * 2 + a.routeTime;
    const bScore = b.crowdLevel * 2 + b.routeTime;
    return aScore - bScore;
  })[0];

  // Find best route (lowest crowd level & shortest time)
  const bestRoute = randomizedRouteOptions.sort((a, b) => {
    const aScore = a.crowdLevel * 2 + a.time;
    const bScore = b.crowdLevel * 2 + b.time;
    return aScore - bScore;
  })[0];

  return {
    seatNumber: seatData.seatNumber,
    gates: randomizedGateOptions,
    bestGate,
    routes: randomizedRouteOptions,
    bestRoute,
    parkingZone: mockStadiumData.parkingZones[seatData.parkingZone],
    usedFallbackData: false,
  };
};
