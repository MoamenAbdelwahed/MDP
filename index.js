function generateTimeLabels() {
    const timeContainer = document.getElementById('timeLabels');
    timeContainer.innerHTML = '';
  
    for (let i = 0; i <= 720; i += 30) {
        const timeElement = document.createElement('div');
        timeElement.style.height = '30px';
        timeElement.style.lineHeight = '30px';
        timeElement.style.textAlign = 'right';
        timeElement.style.fontSize = '12px';
        timeElement.style.color = '#666';
    
        const hours = Math.floor(i / 60) + 9;
        const mins = i % 60;
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHour = hours > 12 ? hours - 12 : hours;
        timeElement.textContent = `${formattedHour}:${mins.toString().padStart(2, '0')} ${period}`;
    
        timeContainer.appendChild(timeElement);
    }
}
  
function layOutDay(events) {
    const container = document.getElementById('calendar');
    container.innerHTML = '';
  
    const containerWidth = 600;
    const containerHeight = 720;
  
    events.sort((a, b) => a.start - b.start);
  
    function isOverlapping(event1, event2) {
      return event1.end > event2.start && event1.start < event2.end;
    }
  
    const eventGroups = [];
    events.forEach((event) => {
      let added = false;
      for (const group of eventGroups) {
        if (group.some((e) => isOverlapping(e, event))) {
          group.push(event);
          added = true;
          break;
        }
      }
      if (!added) {
        eventGroups.push([event]);
      }
    });
  
    eventGroups.forEach((group) => {
      const groupSize = group.length;
      const columnWidth = containerWidth / groupSize;
  
      group.forEach((event, index) => {
        const eventElement = document.createElement('div');
        eventElement.className = 'event';
  
        eventElement.style.position = 'absolute';
        eventElement.style.left = `${index * columnWidth}px`;
        eventElement.style.top = `${(event.start / 720) * containerHeight}px`;
        eventElement.style.width = `${columnWidth - 10}px`; 
        eventElement.style.height = `${((event.end - event.start) / 720) * containerHeight}px`;
  
        eventElement.style.backgroundColor = '#69c';
        eventElement.style.border = '1px solid white';
        eventElement.style.color = 'white';
        eventElement.style.padding = '5px';
        eventElement.style.boxSizing = 'border-box';
        eventElement.textContent = `Event (${formatTime(event.start)} - ${formatTime(event.end)})`;
  
        container.appendChild(eventElement);
      });
    });
  
    function formatTime(minutes) {
      const hours = Math.floor(minutes / 60) + 9;
      const mins = minutes % 60;
      const period = hours >= 12 ? 'PM' : 'AM';
      const formattedHour = hours > 12 ? hours - 12 : hours;
      return `${formattedHour}:${mins.toString().padStart(2, '0')} ${period}`;
    }
}

generateTimeLabels();

// Test with the provided input
layOutDay([
    { start: 30, end: 150 }, // 9:30 AM - 11:30 AM
    { start: 540, end: 600 }, // 6:00 PM - 7:00 PM
    { start: 560, end: 620 }, // 6:20 PM - 7:20 PM
    { start: 610, end: 670 } // 7:10 PM - 8:10 PM
]);
  