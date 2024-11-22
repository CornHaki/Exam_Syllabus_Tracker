const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/examTracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const syllabusSchema = new mongoose.Schema({
  subject: String,
  topics: [{ name: String, completed: Boolean }]
});

const Syllabus = mongoose.model('Syllabus', syllabusSchema);

// Get syllabus for a subject
app.get('/syllabus/:subject', async (req, res) => {
  const subject = req.params.subject;
  const syllabus = await Syllabus.findOne({ subject });
  res.send(syllabus);
});

// Update topic completion
app.post('/syllabus/:subject/topic', async (req, res) => {
  const subject = req.params.subject;
  const { topicName, completed } = req.body;
  
  const syllabus = await Syllabus.findOne({ subject });
  const topic = syllabus.topics.find(t => t.name === topicName);
  if (topic) {
    topic.completed = completed;
    await syllabus.save();
    res.send({ message: 'Topic updated' });
  } else {
    res.status(404).send({ message: 'Topic not found' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
document.getElementById('add-subject-btn').addEventListener('click', function() {
    const subjectInput = document.getElementById('subject-input');
    const subjectName = subjectInput.value.trim();
  
    if (subjectName === "") return; // Don't add empty subjects
  
    // Create a new subject container
    const subjectDiv = document.createElement('div');
    subjectDiv.classList.add('subject');
    subjectDiv.innerHTML = `
      <h2>${subjectName}</h2>
      <ul>
        <li><input type="checkbox" onclick="updateProgress(this)"> Topic 1: Topic Name</li>
      </ul>
      <progress value="0" max="100"></progress>
      <p>0% completed</p>
    `;
  
    document.getElementById('subjects-container').appendChild(subjectDiv);
    subjectInput.value = ''; // Clear the input field after adding the subject
  });
  
  function updateProgress(checkbox) {
    const progressBar = checkbox.parentElement.nextElementSibling;
    const progressText = checkbox.parentElement.nextElementSibling.nextElementSibling;
    const totalTopics = checkbox.closest('.subject').querySelectorAll('input[type="checkbox"]').length;
    const completedTopics = checkbox.closest('.subject').querySelectorAll('input[type="checkbox"]:checked').length;
    const progress = (completedTopics / totalTopics) * 100;
  
    progressBar.value = progress;
    progressText.innerText = `${Math.round(progress)}% completed`;
  }
  