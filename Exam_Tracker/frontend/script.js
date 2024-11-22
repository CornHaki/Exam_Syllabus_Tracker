document.addEventListener('DOMContentLoaded', () => {
    const subjectContainer = document.getElementById('subjects-container');
    const addSubjectBtn = document.getElementById('add-subject-btn');
    const subjectInput = document.getElementById('subject-input');
  
    let subjectCount = 0;
  
    // Add a new subject
    addSubjectBtn.addEventListener('click', () => {
      const subjectName = subjectInput.value.trim();
      if (subjectName === '') return;
      
      subjectCount++;
      
      const subjectDiv = document.createElement('div');
      subjectDiv.classList.add('subject');
      subjectDiv.id = `subject-${subjectCount}`;
      subjectDiv.innerHTML = `
        <h2>${subjectName}</h2>
        <ul class="topic-list"></ul>
        <input type="text" class="topic-input" placeholder="Enter topic">
        <button class="add-topic-btn">Add Topic</button>
        <progress id="progress-${subjectCount}" value="0" max="100"></progress>
        <p id="status-${subjectCount}">0% completed</p>
        <button class="delete-subject-btn">Delete Subject</button>
      `;
  
      subjectContainer.appendChild(subjectDiv);
      
      const addTopicBtn = subjectDiv.querySelector('.add-topic-btn');
      const topicInput = subjectDiv.querySelector('.topic-input');
      const topicList = subjectDiv.querySelector('.topic-list');
      const deleteSubjectBtn = subjectDiv.querySelector('.delete-subject-btn');
      
      let topicCount = 0;
  
      // Add a new topic to the subject
      addTopicBtn.addEventListener('click', () => {
        const newTopic = topicInput.value.trim();
        if (!newTopic) return;
  
        // Count the current number of topics
        const topicCount = topicList.getElementsByTagName('li').length + 1;
        
        const li = document.createElement('li');
        const label = document.createTextNode(` Topic ${topicCount}: ${newTopic}`);
  
        li.innerHTML = `
          <input type="checkbox" id="topic-${subjectCount}-${topicCount}" onclick="updateProgress('${subjectCount}')">
        `;
  
        li.appendChild(label);
  
        li.innerHTML += `<button class="delete-topic-btn">Delete</button>`;
        
        topicList.appendChild(li);
  
        // Clear the input after adding the topic
        topicInput.value = '';
  
        // Delete topic button functionality
        const deleteTopicBtn = li.querySelector('.delete-topic-btn');
        deleteTopicBtn.addEventListener('click', () => {
          li.remove();
          updateProgress(subjectCount);
        });
      });
  
      // Delete subject button functionality
      deleteSubjectBtn.addEventListener('click', () => {
        subjectDiv.remove();
      });
  
      subjectInput.value = ''; // Clear the subject input field
    });
  });
  
  // Update progress for each subject
  function updateProgress(subjectId) {
    const subjectDiv = document.getElementById(`subject-${subjectId}`);
    const checkboxes = subjectDiv.querySelectorAll('input[type="checkbox"]');
    const totalTopics = checkboxes.length;
    const completedTopics = [...checkboxes].filter(checkbox => checkbox.checked).length;
    const progressPercent = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;
    
    const progressBar = subjectDiv.querySelector(`#progress-${subjectId}`);
    const statusText = subjectDiv.querySelector(`#status-${subjectId}`);
  
    progressBar.value = progressPercent;
    statusText.textContent = `${progressPercent.toFixed(0)}% completed`;
  }
  