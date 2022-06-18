import { getCurrentTab } from './utils.js';

const title = document.querySelector('.title');
// const downloadBtn = document.querySelector('.btn');

let currentProfile;

function downloadData(data) {
  const name = data[0].name?.trim();
  const pic = data[0]?.picture;
  const url = data[0]?.url;
  const location = data[0].location?.trim();
  const about = data[0].about?.trim();

  const downloadedAbleData = JSON.stringify({ name, pic, url, location, about });

  const blob = new Blob([downloadedAbleData], { type: 'octet-stream' });
  console.log(blob);
  const href = URL.createObjectURL(blob);

  document.querySelector('a').download = `${name}Data.json`;

  document.querySelector('a').href = href;

  // window.close();
}

function getDataFromStorage(e) {
  // e.preventDefault();
  chrome.storage.sync.get([currentProfile], (data) => {
    const fetchedData = JSON.parse(data[currentProfile]);
    downloadData(fetchedData);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const activeTab = await getCurrentTab();
  const regexLinkedIn = new RegExp('^(http(s)?://)?([w]+.)?linkedin.com/(pub|in|profile)');

  console.log('POPUP JS');

  currentProfile = activeTab.url;

  if (!regexLinkedIn.test(activeTab.url)) {
    console.log(activeTab);
    title.innerHTML = 'Not a linkedin profile page.';
  } else {
    //downloadBtn.classList.remove('hide');
    title.innerHTML = 'Welcome! Click the button below to fetch the data.';

    const a = document.createElement('a');

    a.innerHTML = 'Download';

    document.querySelector('.flex').insertAdjacentElement('beforeend', a);

    a.addEventListener('click', () => {
      getDataFromStorage();
    });
  }
});
