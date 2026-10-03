// Dynamic Career Roadmap Computation Engine

/**
 * Computes an interactive, curved visual journey for any career path
 * based on user's known skills and active learning state.
 */
export function computeRoadmapState(pathConfig, userState = {}, category = 'technical') {
  if (!pathConfig || !pathConfig.stages) {
    return {
      path: null,
      stops: [],
      stats: { totalStages: 0, completedStages: 0, progressPercent: 0, totalHours: 0, totalSkills: 0 },
      svgPathString: '',
      currentStopIndex: 0
    };
  }

  const knownSkills = (userState.knownSkills || []).map(s => s.toLowerCase());
  const stages = pathConfig.stages;
  let firstIncompleteFound = false;
  let completedStagesCount = 0;
  let totalSkillsCount = 0;
  let currentStopIndex = 0;

  // Process each stage and determine status
  const stops = stages.map((stage, index) => {
    totalSkillsCount += (stage.skills || []).length;

    // Check if user already knows the skills in this stage
    const hasKnownIds = stage.skillIds && stage.skillIds.length > 0;
    const allSkillsKnown = hasKnownIds
      ? stage.skillIds.every(id => knownSkills.includes(id.toLowerCase()))
      : false;

    // Is this stage matching the user's active focus skill?
    const isFocusSkill = stage.skillIds && userState.currentFocusSkillId &&
      stage.skillIds.includes(userState.currentFocusSkillId.toLowerCase());

    let status = 'available';
    let progress = 0;

    if (allSkillsKnown) {
      status = 'completed';
      progress = 100;
      completedStagesCount++;
    } else if (!firstIncompleteFound || isFocusSkill) {
      status = 'current';
      progress = isFocusSkill ? (userState.overallProgress ? Math.min(85, userState.overallProgress) : 65) : 35;
      firstIncompleteFound = true;
      currentStopIndex = index;
    } else if (firstIncompleteFound && index === currentStopIndex + 1) {
      status = 'available';
      progress = 0;
    } else {
      status = 'locked';
      progress = 0;
    }

    // Assign alternating card layout (Left vs Right of the road)
    const cardSide = index % 2 === 0 ? 'left' : 'right';

    return {
      ...stage,
      index,
      status, // 'completed' | 'current' | 'available' | 'locked'
      progress,
      cardSide
    };
  });

  // Calculate overall path progress
  const progressPercent = stops.length > 0 
    ? Math.round((completedStagesCount / stops.length) * 100) 
    : 0;

  // Compute SVG Road Path Geometry
  // We use a standardized width coordinate system (e.g. 1000px wide viewBox)
  const VIEWBOX_WIDTH = 1000;
  const CENTER_X = VIEWBOX_WIDTH / 2;
  const START_Y = 60;
  const STOP_HEIGHT_STEP = 240; // Vertical distance between milestones

  // Generate (x, y) coordinates for each stop along a natural S-curve
  const coordinates = stops.map((stop, i) => {
    const y = START_Y + 100 + (i * STOP_HEIGHT_STEP);
    // Smooth sinusoidal / alternating wave displacement
    // Even indices curve slightly to left (e.g. CENTER_X - 70px)
    // Odd indices curve slightly to right (e.g. CENTER_X + 70px)
    const waveOffset = Math.sin((i + 1) * 1.5) * 80;
    const x = Math.round(CENTER_X + waveOffset);
    return { x, y };
  });

  // Goal position at the end
  const totalStops = stops.length;
  const goalY = START_Y + 120 + (totalStops * STOP_HEIGHT_STEP);
  const goalX = CENTER_X;
  const totalSvgHeight = goalY + 160;

  // Build continuous cubic Bezier SVG path string
  let svgPathString = `M ${CENTER_X} ${START_Y} `;
  
  if (coordinates.length > 0) {
    // Initial curve from start marker to stop 0
    const first = coordinates[0];
    const cp1x = CENTER_X;
    const cp1y = (START_Y + first.y) / 2;
    const cp2x = first.x;
    const cp2y = (START_Y + first.y) / 2;
    svgPathString += `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${first.x} ${first.y} `;

    // Intermediate curves between stops
    for (let i = 0; i < coordinates.length - 1; i++) {
      const curr = coordinates[i];
      const next = coordinates[i + 1];
      const midY = (curr.y + next.y) / 2;
      
      // S-curve control points
      const ctrl1X = curr.x;
      const ctrl1Y = midY;
      const ctrl2X = next.x;
      const ctrl2Y = midY;

      svgPathString += `C ${ctrl1X} ${ctrl1Y}, ${ctrl2X} ${ctrl2Y}, ${next.x} ${next.y} `;
    }

    // Final curve from last stop to Goal station
    const last = coordinates[coordinates.length - 1];
    const finalMidY = (last.y + goalY) / 2;
    svgPathString += `C ${last.x} ${finalMidY}, ${goalX} ${finalMidY}, ${goalX} ${goalY} `;
  } else {
    svgPathString += `L ${CENTER_X} ${goalY} `;
  }

  // Combine stop items with their calculated coordinates
  const stopsWithCoords = stops.map((stop, i) => ({
    ...stop,
    coord: coordinates[i]
  }));

  // Calculate progress ratio along the path for animated beam light (0.0 to 1.0)
  const currentRatio = stops.length > 0 
    ? Math.min(1.0, Math.max(0.1, (currentStopIndex + 0.6) / (stops.length + 1)))
    : 0.5;

  return {
    path: pathConfig,
    stops: stopsWithCoords,
    stats: {
      totalStages: stops.length,
      completedStages: completedStagesCount,
      progressPercent,
      totalHours: pathConfig.estHours || stops.length * 8,
      totalSkills: totalSkillsCount
    },
    svgPathString,
    totalSvgHeight,
    goalCoord: { x: goalX, y: goalY },
    currentStopIndex,
    currentRatio
  };
}
