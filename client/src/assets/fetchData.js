import axios from 'axios';
import { JSDOM } from 'jsdom';
import fs from 'fs';

const url = 'https://learningspaces.ubc.ca/classrooms/alsc-various-informal-learning-spaces';

const fetchData = async () => {
  try {
    const { data } = await axios.get(url);
    const dom = new JSDOM(data);
    const document = dom.window.document;

    const tableRows = document.querySelectorAll('tr');
    let room, address, capacity, moreInfo, link;

    tableRows.forEach(row => {
      const cells = row.querySelectorAll('td');
      if (cells.length > 1) {
        const label = cells[0].textContent.trim();
        const value = cells[1].textContent.trim();
        
        switch (label) {
          case 'ROOM:':
            room = value;
            break;
          case 'ADDRESS:':
            address = value;
            break;
          case 'CAPACITY:':
            capacity = value;
            break;
          case 'MORE INFO:':
            moreInfo = value;
            link = cells[1].querySelector('a')?.href || url;
            break;
          default:
            break;
        }
      }
    });

    const result = {
      id: room.replace(/\s+/g, '-').toLowerCase(),
      title: room,
      address: address,
      description: moreInfo,
      capacity: capacity,
      link: link.startsWith('http') ? link : `https://learningspaces.ubc.ca${link}`
    };

    fs.writeFileSync('waypoints.json', JSON.stringify(result, null, 2));
    console.log('Data has been written to waypoints.json');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();
